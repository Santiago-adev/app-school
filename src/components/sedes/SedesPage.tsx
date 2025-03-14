import React, { useState, useEffect } from 'react';
import Table from '../common/Table';
import Form from '../common/Form';

interface Sede {
  id_sede: number;
  nombre_sede: string;
  codigo_sede: string;
  id_colegio: number;
}

interface Colegio {
  id_colegio: number;
  nombre_colegio: string;
  codigo_colegio: string;
  id_municipio: number;
}

const SedesPage: React.FC = () => {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [colegios, setColegios] = useState<Colegio[]>([]);
  const [editingSede, setEditingSede] = useState<Sede | null>(null);
  const [formValues, setFormValues] = useState({
    nombre_sede: '',
    codigo_sede: '',
    id_colegio: ''
  });

  const fetchSedes = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/sedes');
      const data = await response.json();
      setSedes(data);
    } catch (error) {
      console.error('Error al cargar sedes:', error);
      alert('Error al cargar las sedes');
    }
  };

  const fetchColegios = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/colegios');
      const data = await response.json();
      setColegios(data);
    } catch (error) {
      console.error('Error al cargar colegios:', error);
      alert('Error al cargar los colegios');
    }
  };

  useEffect(() => {
    fetchSedes();
    fetchColegios();
  }, []);

  const handleFormChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const url = editingSede
        ? `http://localhost:3001/api/sedes/${editingSede.id_sede}`
        : 'http://localhost:3001/api/sedes';
      
      const method = editingSede ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formValues,
          id_colegio: parseInt(formValues.id_colegio)
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la operación');
      }

      await fetchSedes();
      setFormValues({ nombre_sede: '', codigo_sede: '', id_colegio: '' });
      setEditingSede(null);
    } catch (error) {
      console.error('Error al guardar sede:', error);
      alert('Error al guardar la sede');
    }
  };

  const handleEdit = (sede: Sede) => {
    setEditingSede(sede);
    setFormValues({
      nombre_sede: sede.nombre_sede,
      codigo_sede: sede.codigo_sede,
      id_colegio: sede.id_colegio.toString(),
    });
  };

  const handleDelete = async (sede: Sede) => {
    if (!window.confirm('¿Está seguro de eliminar esta sede?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/sedes/${sede.id_sede}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar');
      }

      await fetchSedes();
    } catch (error) {
      console.error('Error al eliminar sede:', error);
      alert('Error al eliminar la sede');
    }
  };

  const formFields = [
    {
      name: 'nombre_sede',
      label: 'Nombre de la Sede',
      type: 'text' as const,
    },
    {
      name: 'codigo_sede',
      label: 'Código de la Sede',
      type: 'text' as const,
    },
    {
      name: 'id_colegio',
      label: 'Colegio',
      type: 'select' as const,
      options: colegios.map(c => ({
        value: c.id_colegio,
        label: c.nombre_colegio
      }))
    }
  ];

  const tableHeaders = ['ID', 'Nombre', 'Código', 'Colegio'];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gestión de Sedes</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingSede ? 'Editar Sede' : 'Nueva Sede'}
        </h2>
        <Form
          fields={formFields}
          values={formValues}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          submitLabel={editingSede ? 'Actualizar' : 'Crear'}
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Lista de Sedes</h2>
          <Table
            headers={tableHeaders}
            data={sedes.map(s => ({
              id: s.id_sede,
              nombre: s.nombre_sede,
              codigo: s.codigo_sede,
              colegio: colegios.find(c => c.id_colegio === s.id_colegio)?.nombre_colegio || 'No encontrado'
            }))}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default SedesPage;
