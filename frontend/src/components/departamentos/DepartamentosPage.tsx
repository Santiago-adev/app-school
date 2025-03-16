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
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen p-6">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-red-700">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-blue-100">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            {editingDepartamento ? 'Editar Departamento' : 'Nuevo Departamento'}
          </h2>
          <Form
            fields={formFields}
            values={formValues}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
            submitLabel={editingDepartamento ? 'Actualizar' : 'Crear'}
            submitClassName="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-800">Lista de Departamentos</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => fetchDepartamentos()}
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
                data={departamentos.map(d => {
                  console.log('Mapeando departamento:', d);
                  return {
                    ID: d.id_departamento,
                    Nombre: d.nombre_departamento,
                    Código: d.codigo_departamento
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

export default DepartamentosPage;
