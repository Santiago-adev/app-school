import React, { useState, useEffect } from 'react';
import Table from '../common/Table';
import Form from '../common/Form';

interface Municipio {
  id_municipio: number;
  nombre_municipio: string;
  codigo_municipio: string;
  id_departamento: number;
}

interface Departamento {
  id_departamento: number;
  nombre_departamento: string;
  codigo_departamento: string;
}

const MunicipiosPage: React.FC = () => {
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [editingMunicipio, setEditingMunicipio] = useState<Municipio | null>(null);
  const [formValues, setFormValues] = useState({
    nombre_municipio: '',
    codigo_municipio: '',
    id_departamento: 'default'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMunicipios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3001/api/municipios');
      if (!response.ok) {
        throw new Error('Error al cargar los municipios');
      }
      const data = await response.json();
      console.log('Municipios cargados:', data);
      setMunicipios(data);
    } catch (error) {
      console.error('Error al cargar municipios:', error);
      setError('Error al cargar los municipios. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartamentos = async () => {
    try {
      setError(null);
      const response = await fetch('http://localhost:3001/api/departamentos');
      if (!response.ok) {
        throw new Error('Error al cargar los departamentos');
      }
      const data = await response.json();
      setDepartamentos(data);
    } catch (error) {
      console.error('Error al cargar departamentos:', error);
      setError('Error al cargar los departamentos. Por favor, intente nuevamente.');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchDepartamentos();
        await fetchMunicipios();
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
    if (!formValues.id_departamento || formValues.id_departamento === 'default') {
      setError('Por favor seleccione un departamento');
      return;
    }

    try {
      setError(null);
      const url = editingMunicipio
        ? `http://localhost:3001/api/municipios/${editingMunicipio.id_municipio}`
        : 'http://localhost:3001/api/municipios';
      
      const method = editingMunicipio ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_municipio: formValues.nombre_municipio,
          codigo_municipio: formValues.codigo_municipio,
          id_departamento: parseInt(formValues.id_departamento)
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la operación');
      }

      await fetchMunicipios();
      setFormValues({ nombre_municipio: '', codigo_municipio: '', id_departamento: 'default' });
      setEditingMunicipio(null);
    } catch (error) {
      console.error('Error al guardar municipio:', error);
      setError('Error al guardar el municipio. Por favor, intente nuevamente.');
    }
  };

  const handleEdit = (municipio: any) => {
    console.log('Editando municipio:', municipio);
    const municipioOriginal = municipios.find(m => m.id_municipio === municipio.ID);
    if (!municipioOriginal) {
      console.error('No se encontró el municipio original');
      return;
    }
    setEditingMunicipio(municipioOriginal);
    setFormValues({
      nombre_municipio: municipioOriginal.nombre_municipio || '',
      codigo_municipio: municipioOriginal.codigo_municipio || '',
      id_departamento: municipioOriginal.id_departamento ? municipioOriginal.id_departamento.toString() : 'default'
    });
  };

  const handleDelete = async (municipio: any) => {
    if (!window.confirm('¿Está seguro de eliminar este municipio?')) {
      return;
    }

    try {
      setError(null);
      const response = await fetch(`http://localhost:3001/api/municipios/${municipio.ID}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar');
      }

      await fetchMunicipios();
    } catch (error) {
      console.error('Error al eliminar municipio:', error);
      setError('Error al eliminar el municipio. Por favor, intente nuevamente.');
    }
  };

  const formFields = [
    {
      name: 'nombre_municipio',
      label: 'Nombre del Municipio',
      type: 'text' as const,
    },
    {
      name: 'codigo_municipio',
      label: 'Código del Municipio',
      type: 'text' as const,
    },
    {
      name: 'id_departamento',
      label: 'Departamento',
      type: 'select' as const,
      options: [
        { value: 'default', label: 'Seleccione un departamento' },
        ...departamentos
          .filter(d => d && d.id_departamento && d.nombre_departamento)
          .map(d => ({
            value: d.id_departamento.toString(),
            label: d.nombre_departamento
          }))
      ]
    }
  ];

  const tableHeaders = ['ID', 'Nombre', 'Código', 'Departamento'];

  const getDepartamentoNombre = (id_departamento: number) => {
    const departamento = departamentos.find(d => d.id_departamento === id_departamento);
    return departamento ? departamento.nombre_departamento : 'No encontrado';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Encabezado */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-blue-100">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">Gestión de Municipios</h1>
          <p className="text-gray-600">Administra los municipios y su relación con los departamentos</p>
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
            {editingMunicipio ? 'Editar Municipio' : 'Agregar Nuevo Municipio'}
          </h2>
          <Form
            fields={formFields}
            values={formValues}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
            submitLabel={editingMunicipio ? 'Actualizar' : 'Agregar'}
          />
        </div>

        {/* Tabla/Lista de Municipios */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-blue-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-blue-900">Lista de Municipios</h2>
            <button 
              onClick={() => fetchMunicipios()}
              className="w-full sm:w-auto px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Actualizar
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
            </div>
          ) : (
            <Table
              headers={tableHeaders}
              data={municipios.map(m => ({
                ID: m.id_municipio,
                Nombre: m.nombre_municipio,
                Código: m.codigo_municipio,
                Departamento: getDepartamentoNombre(m.id_departamento)
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

export default MunicipiosPage;
