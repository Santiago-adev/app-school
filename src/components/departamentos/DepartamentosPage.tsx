import React, { useState, useEffect } from 'react';
import Table from '../common/Table';
import Form from '../common/Form';

interface Departamento {
  id_departamento: number;
  nombre_departamento: string;
  codigo_departamento: string;
}

const DepartamentosPage: React.FC = () => {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [editingDepartamento, setEditingDepartamento] = useState<Departamento | null>(null);
  const [formValues, setFormValues] = useState({
    nombre_departamento: '',
    codigo_departamento: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDepartamentos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3001/api/departamentos');
      if (!response.ok) {
        throw new Error('Error al cargar los departamentos');
      }
      const data = await response.json();
      console.log('Departamentos cargados:', data);
      setDepartamentos(data);
    } catch (error) {
      console.error('Error al cargar departamentos:', error);
      setError('Error al cargar los departamentos. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartamentos();
  }, []);

  const handleFormChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      const url = editingDepartamento
        ? `http://localhost:3001/api/departamentos/${editingDepartamento.id_departamento}`
        : 'http://localhost:3001/api/departamentos';
      
      const method = editingDepartamento ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error('Error en la operación');
      }

      await fetchDepartamentos();
      setFormValues({ nombre_departamento: '', codigo_departamento: '' });
      setEditingDepartamento(null);
    } catch (error) {
      console.error('Error al guardar departamento:', error);
      setError('Error al guardar el departamento. Por favor, intente nuevamente.');
    }
  };

  const handleEdit = (departamento: any) => {
    console.log('Editando departamento:', departamento);
    const departamentoOriginal = departamentos.find(d => d.id_departamento === departamento.ID);
    if (!departamentoOriginal) {
      console.error('No se encontró el departamento original');
      return;
    }
    setEditingDepartamento(departamentoOriginal);
    setFormValues({
      nombre_departamento: departamentoOriginal.nombre_departamento || '',
      codigo_departamento: departamentoOriginal.codigo_departamento || ''
    });
  };

  const handleDelete = async (departamento: any) => {
    if (!window.confirm('¿Está seguro de eliminar este departamento?')) {
      return;
    }

    try {
      setError(null);
      const response = await fetch(`http://localhost:3001/api/departamentos/${departamento.ID}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar');
      }

      await fetchDepartamentos();
    } catch (error) {
      console.error('Error al eliminar departamento:', error);
      setError('Error al eliminar el departamento. Por favor, intente nuevamente.');
    }
  };

  const formFields = [
    {
      name: 'nombre_departamento',
      label: 'Nombre del Departamento',
      type: 'text' as const,
    },
    {
      name: 'codigo_departamento',
      label: 'Código del Departamento',
      type: 'text' as const,
    }
  ];

  const tableHeaders = ['ID', 'Nombre', 'Código'];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Encabezado */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-blue-100">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">Gestión de Departamentos</h1>
          <p className="text-gray-600">Administra los departamentos y sus códigos en el sistema</p>
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
            {editingDepartamento ? 'Editar Departamento' : 'Agregar Nuevo Departamento'}
          </h2>
          <Form
            fields={formFields}
            values={formValues}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
            submitLabel={editingDepartamento ? 'Actualizar' : 'Agregar'}
          />
        </div>

        {/* Tabla/Lista de Departamentos */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-blue-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-blue-900">Lista de Departamentos</h2>
            <button 
              onClick={() => fetchDepartamentos()}
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
              data={departamentos.map(d => ({
                ID: d.id_departamento,
                Nombre: d.nombre_departamento,
                Código: d.codigo_departamento
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

export default DepartamentosPage;
