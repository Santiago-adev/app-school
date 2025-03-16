import React from 'react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select';
  options?: { value: string | number; label: string }[];
}

interface FormProps {
  fields: FormField[];
  values: { [key: string]: any };
  onChange: (name: string, value: string) => void;
  onSubmit: () => void;
  submitLabel?: string;
  submitClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  selectClassName?: string;
}

const Form: React.FC<FormProps> = ({
  fields,
  values,
  onChange,
  onSubmit,
  submitLabel = 'Guardar',
  submitClassName = "w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200",
  labelClassName = "block text-sm font-medium text-gray-700",
  inputClassName = "block w-full rounded-lg border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200",
  selectClassName = "block w-full rounded-lg border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label
              htmlFor={field.name}
              className={labelClassName}
            >
              {field.label}
            </label>
            {field.type === 'select' ? (
              <select
                id={field.name}
                value={values[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                className={selectClassName}
              >
                <option value="" key={`${field.name}-empty`}>Seleccione una opción</option>
                {field.options?.map((option) => (
                  <option key={`${field.name}-${option.value}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                id={field.name}
                value={values[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                className={inputClassName}
                placeholder={`Ingrese ${field.label.toLowerCase()}`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className={submitClassName}
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default Form;
