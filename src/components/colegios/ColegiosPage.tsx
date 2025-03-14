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
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen p-6">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-red-700">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-blue-100">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            {editingColegio ? 'Editar Colegio' : 'Nuevo Colegio'}
          </h2>
          <Form
            fields={formFields}
            values={formValues}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
            submitLabel={editingColegio ? 'Actualizar' : 'Crear'}
            submitClassName="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-800">Lista de Colegios</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => fetchColegios()}
                className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Actualizar Lista
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table
                headers={tableHeaders}
                data={colegios.map(c => {
                  console.log('Mapeando colegio:', c);
                  return {
                    ID: c.id_colegio,
                    Nombre: c.nombre_colegio,
                    Código: c.codigo_colegio,
                    Municipio: getMunicipioNombre(c.id_municipio)
                  };
                })}
                onEdit={handleEdit}
                onDelete={handleDelete}
                rowClassName="hover:bg-blue-50 transition-colors"
                headerClassName="bg-blue-50 text-left text-xs font-medium text-blue-800 uppercase tracking-wider"
                cellClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                actionClassName="text-sm text-blue-600 hover:text-blue-800 font-medium"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColegiosPage;
