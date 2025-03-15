import React, { useState, useEffect } from 'react';
import Table from '../common/Table';
import Form from '../common/Form';

interface Colegio {
  id_colegio: number;
  nombre_colegio: string;
  codigo_colegio: string;
  id_municipio: number;
}

interface Municipio {
  id_municipio: number;
  nombre_municipio: string;
  codigo_municipio: string;
  id_departamento: number;
}

const ColegiosPage: React.FC = () => {
  const [colegios, setColegios] = useState<Colegio[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [editingColegio, setEditingColegio] = useState<Colegio | null>(null);
  const [formValues, setFormValues] = useState({
    nombre_colegio: '',
    codigo_colegio: '',
    id_municipio: 'default'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchColegios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3001/api/colegios');
      if (!response.ok) {
        throw new Error('Error al cargar los colegios');
      }
      const data = await response.json();
      console.log('Colegios cargados:', data);
      setColegios(data);
    } catch (error) {
      console.error('Error al cargar colegios:', error);
      setError('Error al cargar los colegios. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMunicipios = async () => {
    try {
      setError(null);
      const response = await fetch('http://localhost:3001/api/municipios');
      if (!response.ok) {
        throw new Error('Error al cargar los municipios');
      }
      const data = await response.json();
      setMunicipios(data);
    } catch (error) {
      console.error('Error al cargar municipios:', error);
      setError('Error al cargar los municipios. Por favor, intente nuevamente.');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchMunicipios();
        await fetchColegios();
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setError('Error al cargar los datos. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleFormChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formValues.id_municipio || formValues.id_municipio === 'default') {
      setError('Por favor seleccione un municipio');
      return;
    }

    try {
      setError(null);
      const url = editingColegio
        ? `http://localhost:3001/api/colegios/${editingColegio.id_colegio}`
        : 'http://localhost:3001/api/colegios';
      
      const method = editingColegio ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_colegio: formValues.nombre_colegio,
          codigo_colegio: formValues.codigo_colegio,
          id_municipio: parseInt(formValues.id_municipio)
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la operación');
      }

      await fetchColegios();
      setFormValues({ nombre_colegio: '', codigo_colegio: '', id_municipio: 'default' });
      setEditingColegio(null);
    } catch (error) {
      console.error('Error al guardar colegio:', error);
      setError('Error al guardar el colegio. Por favor, intente nuevamente.');
    }
  };

  const handleEdit = (colegio: any) => {
    console.log('Editando colegio:', colegio);
    const colegioOriginal = colegios.find(c => c.id_colegio === colegio.ID);
    if (!colegioOriginal) {
      console.error('No se encontró el colegio original');
      return;
    }
    setEditingColegio(colegioOriginal);
    setFormValues({
      nombre_colegio: colegioOriginal.nombre_colegio || '',
      codigo_colegio: colegioOriginal.codigo_colegio || '',
      id_municipio: colegioOriginal.id_municipio ? colegioOriginal.id_municipio.toString() : 'default'
    });
  };

  const handleDelete = async (colegio: any) => {
    if (!window.confirm('¿Está seguro de eliminar este colegio?')) {
      return;
    }

    try {
      setError(null);
      const response = await fetch(`http://localhost:3001/api/colegios/${colegio.ID}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar');
      }

      await fetchColegios();
    } catch (error) {
      console.error('Error al eliminar colegio:', error);
      setError('Error al eliminar el colegio. Por favor, intente nuevamente.');
    }
  };

  const formFields = [
    {
      name: 'nombre_colegio',
      label: 'Nombre del Colegio',
      type: 'text' as const,
    },
    {
      name: 'codigo_colegio',
      label: 'Código del Colegio',
      type: 'text' as const,
    },
    {
      name: 'id_municipio',
      label: 'Municipio',
      type: 'select' as const,
      options: [
        { value: 'default', label: 'Seleccione un municipio' },
        ...municipios
          .filter(m => m && m.id_municipio && m.nombre_municipio)
          .map(m => ({
            value: m.id_municipio.toString(),
            label: m.nombre_municipio
          }))
      ]
    }
  ];

  const tableHeaders = ['ID', 'Nombre', 'Código', 'Municipio'];

  const getMunicipioNombre = (id_municipio: number) => {
    const municipio = municipios.find(m => m.id_municipio === id_municipio);
    return municipio ? municipio.nombre_municipio : 'No encontrado';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Encabezado */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-blue-100">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">Gestión de Colegios</h1>
          <p className="text-gray-600">Administra la información de los colegios en el sistema</p>
        </div>

        {/* Mensajes de error */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700">
            <p>{error}</p>
          </div>
        )}

        {/* Formulario */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            {editingColegio ? 'Editar Colegio' : 'Agregar Nuevo Colegio'}
          </h2>
          <Form
            fields={formFields}
            values={formValues}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
            submitLabel={editingColegio ? 'Actualizar' : 'Agregar'}
            className="grid gap-4 sm:gap-6"
          />
        </div>

        {/* Tabla/Lista de Colegios */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Lista de Colegios</h2>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
            </div>
          ) : (
            <Table
              headers={tableHeaders}
              data={colegios.map(colegio => ({
                ID: colegio.id_colegio,
                Nombre: colegio.nombre_colegio,
                Código: colegio.codigo_colegio,
                Municipio: getMunicipioNombre(colegio.id_municipio)
              }))}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ColegiosPage;
