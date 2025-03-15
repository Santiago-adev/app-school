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
    rol: ''
  });

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/usuarios');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      alert('Error al cargar los usuarios');
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleFormChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
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
      setFormValues({ nombre: '', rol: '' });
      setEditingUsuario(null);
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      alert('Error al guardar el usuario');
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
      const response = await fetch(`http://localhost:3001/api/usuarios/${usuario.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar');
      }

      await fetchUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar el usuario');
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
        { value: 'admin', label: 'Administrador' },
        { value: 'profesor', label: 'Profesor' },
        { value: 'estudiante', label: 'Estudiante' }
      ]
    }
  ];

  const tableHeaders = ['ID', 'Nombre', 'Rol'];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gestión de Usuarios</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingUsuario ? 'Editar Usuario' : 'Nuevo Usuario'}
        </h2>
        <Form
          fields={formFields}
          values={formValues}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          submitLabel={editingUsuario ? 'Actualizar' : 'Crear'}
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Lista de Usuarios</h2>
          <Table
            headers={tableHeaders}
            data={usuarios.map(u => ({
              id: u.id,
              nombre: u.nombre,
              rol: u.rol.charAt(0).toUpperCase() + u.rol.slice(1) // Capitalizar el rol
            }))}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default UsuariosPage;
