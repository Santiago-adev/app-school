import React, { useState } from 'react';

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
  cellClassName = "text-sm text-gray-900",
  actionClassName = "text-sm font-medium"
}) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const getCellValue = (item: any, header: string) => {
    if (item[header] !== undefined) {
      return item[header];
    }
    
    const lowerFirst = header.charAt(0).toLowerCase() + header.slice(1);
    if (item[lowerFirst] !== undefined) {
      return item[lowerFirst];
    }
    
    const lowerCase = header.toLowerCase();
    if (item[lowerCase] !== undefined) {
      return item[lowerCase];
    }
    
    return '';
  };

  // Vista móvil: Renderiza una tarjeta por cada fila
  const renderMobileRow = (item: any, index: number) => (
    <div key={index} className="bg-white rounded-lg shadow-sm mb-4 p-4 border border-gray-200">
      <div className="space-y-2">
        {headers.map((header, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 uppercase">{header}</span>
            <span className="text-sm text-gray-900">{getCellValue(item, header)}</span>
          </div>
        ))}
      </div>
      {(onEdit || onDelete) && (
        <div className="mt-4 flex justify-end space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(item)}
              className={`${actionClassName} text-blue-600 hover:text-blue-900 bg-blue-50 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors duration-150`}
            >
              Editar
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(item)}
              className={`${actionClassName} text-red-600 hover:text-red-900 bg-red-50 px-4 py-2 rounded-md hover:bg-red-100 transition-colors duration-150`}
            >
              Eliminar
            </button>
          )}
        </div>
      )}
    </div>
  );

  // Vista desktop: Tabla tradicional
  const renderDesktopTable = () => (
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
          data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${rowClassName} transition-colors duration-150`}
            >
              {headers.map((header, colIndex) => (
                <td key={colIndex} className={`px-6 py-4 ${cellClassName}`}>
                  {getCellValue(item, header)}
                </td>
              ))}
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
          ))
        )}
      </tbody>
    </table>
  );

  return (
    <div>
      {/* Vista móvil */}
      <div className="sm:hidden">
        <div className="space-y-2">
          {data.length === 0 ? (
            <div className="text-center text-sm text-gray-500 py-4">
              No hay datos disponibles
            </div>
          ) : (
            data.map((item, index) => renderMobileRow(item, index))
          )}
        </div>
      </div>

      {/* Vista desktop */}
      <div className="hidden sm:block overflow-x-auto">
        {renderDesktopTable()}
      </div>
    </div>
  );
};

export default Table;
