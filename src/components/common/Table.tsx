import React from 'react';

interface TableProps {
  headers: string[];
  data: any[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  rowClassName?: string;
  headerClassName?: string;
  cellClassName?: string;
  actionClassName?: string;
}

const Table: React.FC<TableProps> = ({ 
  headers, 
  data, 
  onEdit, 
  onDelete,
  rowClassName = "hover:bg-gray-50",
  headerClassName = "text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
  cellClassName = "whitespace-nowrap text-sm text-gray-900",
  actionClassName = "text-sm font-medium"
}) => {
  // Función para obtener el valor de una celda
  const getCellValue = (item: any, header: string) => {
    // Intentar obtener el valor directamente
    if (item[header] !== undefined) {
      return item[header];
    }
    
    // Si no existe, intentar con la primera letra en minúscula
    const lowerFirst = header.charAt(0).toLowerCase() + header.slice(1);
    if (item[lowerFirst] !== undefined) {
      return item[lowerFirst];
    }
    
    // Si no existe, intentar todo en minúsculas
    const lowerCase = header.toLowerCase();
    if (item[lowerCase] !== undefined) {
      return item[lowerCase];
    }
    
    // Si no se encuentra, devolver vacío
    return '';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className={`px-6 py-3 bg-gray-50 ${headerClassName}`}
              >
                {header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className={`px-6 py-3 bg-gray-50 text-right ${headerClassName}`}>
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length + (onEdit || onDelete ? 1 : 0)}
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                No hay datos disponibles
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => {
              console.log('Renderizando fila:', item);
              return (
                <tr
                  key={rowIndex}
                  className={`${rowClassName} transition-colors duration-150`}
                >
                  {headers.map((header, colIndex) => {
                    const value = getCellValue(item, header);
                    console.log(`Valor para ${header}:`, value);
                    return (
                      <td key={colIndex} className={`px-6 py-4 ${cellClassName}`}>
                        {value}
                      </td>
                    );
                  })}
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className={`${actionClassName} text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-md hover:bg-blue-100 transition-colors duration-150`}
                          >
                            Editar
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className={`${actionClassName} text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md hover:bg-red-100 transition-colors duration-150`}
                          >
                            Eliminar
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
