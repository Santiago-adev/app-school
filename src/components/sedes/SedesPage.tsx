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
    id_colegio: 'default'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSedes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3001/api/sedes');
      if (!response.ok) {
        throw new Error('Error al cargar las sedes');
      }
      const data = await response.json();
      setSedes(data);
    } catch (error) {
      console.error('Error al cargar sedes:', error);
      setError('Error al cargar las sedes. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const fetchColegios = async () => {
    try {
      setError(null);
      const response = await fetch('http://localhost:3001/api/colegios');
      if (!response.ok) {
        throw new Error('Error al cargar los colegios');
      }
      const data = await response.json();
      setColegios(data);
    } catch (error) {
      console.error('Error al cargar colegios:', error);
      setError('Error al cargar los colegios. Por favor, intente nuevamente.');
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
      setFormValues({ nombre_sede: '', codigo_sede: '', id_colegio: 'default' });
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
      options: [
        { value: 'default', label: 'Seleccione un colegio' },
        ...colegios
          .filter(c => c && c.id_colegio && c.nombre_colegio)
          .map(c => ({
            value: c.id_colegio.toString(),
            label: c.nombre_colegio
          }))
      ]
    }
  ];

  const tableHeaders = ['ID', 'Nombre', 'Código', 'Colegio'];

  const getColegioNombre = (id_colegio: number) => {
    const colegio = colegios.find(c => c.id_colegio === id_colegio);
    return colegio ? colegio.nombre_colegio : 'No encontrado';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Encabezado */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-blue-100">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">Gestión de Sedes</h1>
          <p className="text-gray-600">Administra las sedes y su relación con los colegios</p>
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
            {editingSede ? 'Editar Sede' : 'Agregar Nueva Sede'}
          </h2>
          <Form
            fields={formFields}
            values={formValues}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
            submitLabel={editingSede ? 'Actualizar' : 'Agregar'}
          />
        </div>

        {/* Tabla/Lista de Sedes */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-blue-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-blue-900">Lista de Sedes</h2>
            <button 
              onClick={() => fetchSedes()}
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
              data={sedes.map(s => ({
                ID: s.id_sede,
                Nombre: s.nombre_sede,
                Código: s.codigo_sede,
                Colegio: getColegioNombre(s.id_colegio)
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

export default SedesPage;
