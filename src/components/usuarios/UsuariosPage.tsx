import React, { useState, useEffect } from 'react';
import Table from '../common/Table';
import Form from '../common/Form';

interface Usuario {
  id: number;
  nombre: string;
  rol: string;
}

const UsuariosPage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null);
  const [formValues, setFormValues] = useState({
    nombre: '',
    rol: 'default'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3001/api/usuarios');
      if (!response.ok) {
        throw new Error('Error al cargar los usuarios');
      }
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      setError('Error al cargar los usuarios. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleFormChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formValues.rol || formValues.rol === 'default') {
      setError('Por favor seleccione un rol');
      return;
    }

    try {
      setError(null);
      const url = editingUsuario
        ? `http://localhost:3001/api/usuarios/${editingUsuario.id}`
        : 'http://localhost:3001/api/usuarios';
      
      const method = editingUsuario ? 'PUT' : 'POST';
      
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

      await fetchUsuarios();
      setFormValues({ nombre: '', rol: 'default' });
      setEditingUsuario(null);
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      setError('Error al guardar el usuario. Por favor, intente nuevamente.');
    }
  };

  const handleEdit = (usuario: Usuario) => {
    setEditingUsuario(usuario);
    setFormValues({
      nombre: usuario.nombre,
      rol: usuario.rol,
    });
  };

  const handleDelete = async (usuario: Usuario) => {
    if (!window.confirm('¿Está seguro de eliminar este usuario?')) {
      return;
    }

    try {
      setError(null);
      const response = await fetch(`http://localhost:3001/api/usuarios/${usuario.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar');
      }

      await fetchUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      setError('Error al eliminar el usuario. Por favor, intente nuevamente.');
    }
  };

  const formFields = [
    {
      name: 'nombre',
      label: 'Nombre del Usuario',
      type: 'text' as const,
    },
    {
      name: 'rol',
      label: 'Rol',
      type: 'select' as const,
      options: [
        { value: 'default', label: 'Seleccione un rol' },
        { value: 'admin', label: 'Administrador' },
        { value: 'profesor', label: 'Profesor' },
        { value: 'estudiante', label: 'Estudiante' }
      ]
    }
  ];

  const tableHeaders = ['ID', 'Nombre', 'Rol'];

  const capitalizeRol = (rol: string) => {
    const roles = {
      'admin': 'Administrador',
      'profesor': 'Profesor',
      'estudiante': 'Estudiante'
    };
    return roles[rol as keyof typeof roles] || rol;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Encabezado */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-blue-100">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra los usuarios y sus roles en el sistema</p>
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
            {editingUsuario ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
          </h2>
          <Form
            fields={formFields}
            values={formValues}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
            submitLabel={editingUsuario ? 'Actualizar' : 'Agregar'}
          />
        </div>

        {/* Tabla/Lista de Usuarios */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-blue-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-blue-900">Lista de Usuarios</h2>
            <button 
              onClick={() => fetchUsuarios()}
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
              data={usuarios.map(u => ({
                ID: u.id,
                Nombre: u.nombre,
                Rol: capitalizeRol(u.rol)
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

export default UsuariosPage;
