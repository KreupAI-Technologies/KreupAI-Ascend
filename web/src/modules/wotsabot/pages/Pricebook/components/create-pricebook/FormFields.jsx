import PropTypes from "prop-types";

export const TextInputField = ({
  name,
  register,
  label,
  placeholder,
  errors,
}) => (
  <div className="mb-4">
    <label
      className="block text-sm text-gray-700 font-medium mb-1"
      htmlFor={name}
    >
      {label}
    </label>
    <input
      type="text"
      id={name}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-blue-400 outline-blue-500"
      {...register(name)}
    />
    {errors[name] && (
      <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
    )}
  </div>
);

export const SelectField = ({
  name,
  register,
  label,
  placeholder,
  options,
  errors,
}) => (
  <div className="mb-4">
    <label
      className="block text-sm text-gray-700 font-medium mb-1"
      htmlFor={name}
    >
      {label}
    </label>
    <select
      id={name}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-blue-400 focus:ring-1 focus:ring-blue-500 outline-none"
      {...register(name)}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {errors[name] && (
      <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
    )}
  </div>
);

export const NumberInputField = ({ name, label, placeholder, register, errors }) => (
  <div className="mb-4">
    <label className="block text-sm text-gray-700 font-medium mb-1" htmlFor={name}>
      {label}
    </label>
    <input
      id={name}
      type="number"
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-blue-400 outline-blue-500"
      {...register(name, {
        setValueAs: (value) => Number(value) || 0,  // Convert string to number or default to 0
      })}
    />
    {errors[name] && (
      <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
    )}
  </div>
);

export const TextAreaField = ({
  name,
  register,
  label,
  placeholder,
  errors,
}) => (
  <div className="mb-4">
    <label
      className="block text-sm text-gray-700 font-medium mb-1"
      htmlFor={name}
    >
      {label}
    </label>
    <textarea
      id={name}
      rows={5}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-blue-400 outline-blue-500"
      {...register(name)}
    />
    {errors[name] && (
      <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
    )}
  </div>
);

export const CheckBoxField = ({
  name,
  register,
  label,
  errors,
}) => (
  <div className="mb-4">
    <label className="flex items-center block text-sm text-gray-700 font-medium mb-1">
      <input
        type="checkbox"
        id={name}
        className="h-4 w-4 text-blue-600"
        {...register(name)}
      />
      <span className="ml-2">{label}</span>
    </label>
    {errors[name] && (
      <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
    )}
  </div>
);

// New DateInputField
export const DateInputField = ({
  name,
  register,
  label,
  placeholder,
  errors,
}) => (
  <div className="mb-4">
    <label
      className="block text-sm text-gray-700 font-medium mb-1"
      htmlFor={name}
    >
      {label}
    </label>
    <input
      type="date"
      id={name}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-blue-400 outline-blue-500"
      {...register(name)}
    />
    {errors[name] && (
      <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
    )}
  </div>
);

TextInputField.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  errors: PropTypes.object,
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  errors: PropTypes.object,
};

NumberInputField.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  errors: PropTypes.object,
};

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  errors: PropTypes.object,
};

CheckBoxField.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  errors: PropTypes.object,
};

DateInputField.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  errors: PropTypes.object,
};
