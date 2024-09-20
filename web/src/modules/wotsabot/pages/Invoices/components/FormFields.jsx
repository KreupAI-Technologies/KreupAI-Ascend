import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

export const TextInputField = ({
  name,
  control,
  label,
  placeholder,
  errors,
  icon: Icon,
  inputClassName,
}) => (
  <div className="flex items-center space-x-2"> {/* Flexbox container */}
    <label className="text-sm text-gray-500 font-medium w-28">{label}</label> {/* Adjust width */}
    <div className="relative flex-grow">
      {Icon && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <Icon className="text-gray-500" />
        </div>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type="text"
            placeholder={placeholder}
            className={`w-full my-2 border rounded px-3 py-2 ${inputClassName}`}
            {...field}
          />
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  </div>
);

export const SelectField = ({
  name,
  control,
  label,
  placeholder,
  options,
  errors,
  icon: Icon,
  inputClassName,
}) => (
  <div className="flex items-center space-x-2"> {/* Flexbox container */}
    <label htmlFor={name} className="text-sm text-gray-500 font-medium w-28">{label}</label> {/* Adjust width */}
    <div className="relative flex-grow">
      {Icon && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <Icon className="text-gray-500" />
        </div>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          
          <select
            placeholder={placeholder}
            className={`w-full my-2 border rounded px-3 py-2 ${inputClassName}`}
            {...field}
            onChange={(e) => field.onChange(e.target.value)}
          >
            <option value="">
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  </div>
);


TextInputField.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  errors: PropTypes.object,
  icon:PropTypes.elementType,
  inputClassName: PropTypes.string,
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  errors: PropTypes.object,
  icon:PropTypes.elementType,
  inputClassName: PropTypes.string,
};
