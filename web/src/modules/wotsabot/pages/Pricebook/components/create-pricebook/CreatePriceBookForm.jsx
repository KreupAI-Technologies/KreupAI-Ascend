import { useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { priceBookSchema } from './priceBookSchema'; // Adjust the import path
import PropTypes from 'prop-types';
import { MinusCircleIcon } from '@heroicons/react/24/solid';
import { PriceBookContext } from './Create'; // Import the context
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  TextInputField,
  NumberInputField,
  DateInputField,
  SelectField
} from './FormFields'; // Adjust the import path according to your project structure

const CreatePriceBookForm = ({ row = {}, handleCloseModal }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { register, handleSubmit, control, formState: { errors }, reset, watch, setValue } = useForm({
    resolver: zodResolver(priceBookSchema),
  });

  const { setPriceBookData } = useContext(PriceBookContext);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rows',
  });

  const rows = watch('rows', []); // Watch for changes in rows

  const handlePriceChange = (index, value) => {
    const newRows = [...rows];
    newRows[index].price = Number(value);
    setValue('rows', newRows); // Update the form value
  };

  const handleDiscountChange = (index, value) => {
    const newRows = [...rows];
    newRows[index].discount = Number(value);
    setValue('rows', newRows); // Update the form value
  };

  const calculateNetPrice = (price, discount) => price * (1 - discount / 100);

  const onSubmit = (data, event) => {
    data.rows = data.rows.map(row => ({
      ...row,
      fromQty: Number(row.fromQty),
      toQty: Number(row.toQty),
      price: Number(row.price),
      discount: Number(row.discount),
      netPrice: calculateNetPrice(row.price, row.discount),
    }));

    console.log(data);

    const { id } = event.nativeEvent.submitter; // Identify the clicked button by its id
    setPriceBookData(data); // Set the form data in context

    if (id === 'save-and-new') {
      alert('Price Book Created and Ready for a New Entry!');
      reset(); // Reset form
    } else {
      alert('Price Book Created!');
      handleCloseModal();
    }
  };

  const addRow = () => {
    append({ id: Date.now(), price: '', discount: '', fromQty: '', toQty: '' });
  };

  const removeRow = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="bg-white text-gray-700 rounded-lg w-full max-w-7xl h-full">
      <div className="bg-white rounded-lg p-8 w-full max-w-7xl mx-auto">
        <div className="flex justify-between border-b border-blue-500 items-center mb-6 p-2">
          <h2 className="text-2xl text-gray-800 font-semibold">Create Price Book</h2>
          <div>
            <button
              className="bg-gray-200 text-black p-2 rounded-md mr-4"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              id="save-and-new"
              type="submit"
              form="priceBookForm"
              className="bg-blue-500 text-white p-2 rounded-md mr-4"
            >
              Save and New
            </button>
            <button
              id="save"
              type="submit"
              form="priceBookForm"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>

        <form id="priceBookForm" onSubmit={handleSubmit(onSubmit)}>
          {/* Price Book Information Section */}
          <div className='border-b'>
            <div className="mb-6 mt-16">
              <h3 className="text-lg text-gray-800 font-semibold mb-8">Price Book Information</h3>
              <div className="grid grid-cols-2 gap-x-24 gap-y-4">
                <TextInputField
                  name="priceBookOwner"
                  label="Price Book Owner"
                  placeholder="Sabu John Bosco"
                  register={register}
                  errors={errors}
                />
                <TextInputField
                  name="priceBookName"
                  label="Price Book Name"
                  placeholder="Test Price Book"
                  register={register}
                  errors={errors}
                />
                <SelectField
                  name="item"
                  label="Item"
                  options={['Item 1', 'Item 2', 'Item 3']} // Replace with actual options
                  register={register}
                  errors={errors}
                />
                <DateInputField
                  name="fromDate"
                  label="From Date"
                  placeholder="YYYY-MM-DD"
                  register={register}
                  errors={errors}
                />
                <DateInputField
                  name="toDate"
                  label="To Date"
                  placeholder="YYYY-MM-DD"
                  register={register}
                  errors={errors}
                />
              </div>
            </div>

            {/* Pricing Details Section */}
            <div className="mb-6 mt-16">
              <h3 className="text-lg text-gray-800 font-semibold mb-8">Pricing Details</h3>
              <div>
                <table className="w-full text-gray-700 text-left border border-gray-100">
                  <thead>
                    <tr>
                      <th className="border-b py-2 px-4">From Qty</th>
                      <th className="border-b py-2 px-4">To Qty</th>
                      <th className="border-b py-2 px-4">Price</th>
                      <th className="border-b py-2 px-4">Discount (%)</th>
                      <th className="border-b py-2 px-4">Net Price</th>
                      <th className="border-b py-2 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field, index) => (
                      <tr key={field.id}>
                        <td className="border-b py-2 px-4">
                          <NumberInputField
                            name={`rows[${index}].fromQty`}
                            label=""
                            placeholder="0"
                            register={register}
                            errors={errors}
                          />
                        </td>
                        <td className="border-b py-2 px-4">
                          <NumberInputField
                            name={`rows[${index}].toQty`}
                            label=""
                            placeholder="0"
                            register={register}
                            errors={errors}
                          />
                        </td>
                        <td className="border-b py-2 px-4">
                          <NumberInputField
                            name={`rows[${index}].price`}
                            label=""
                            placeholder="0"
                            onChange={(e) => handlePriceChange(index, e.target.value)}
                            register={register}
                            errors={errors}
                          />
                        </td>
                        <td className="border-b py-2 px-4">
                          <NumberInputField
                            name={`rows[${index}].discount`}
                            label=""
                            placeholder="0"
                            onChange={(e) => handleDiscountChange(index, e.target.value)}
                            register={register}
                            errors={errors}
                          />
                        </td>
                        <td className="border-b py-2 px-4">
                          <NumberInputField
                            name={`rows[${index}].netPrice`}
                            label=""
                            placeholder="0"
                            register={register}
                            errors={errors}
                            readOnly
                          />
                        </td>
                        <td className="border-b py-2 px-4 text-center">
                          {fields.length > 1 && (
                            <MinusCircleIcon
                              onClick={() => removeRow(index)}
                              className="h-6 w-6 text-red-500 mx-auto cursor-pointer"
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {errors?.rows && <p className="text-red-500">{errors.rows.message}</p>}

              </div>
              <button
                type="button"
                onClick={addRow}
                className="mt-4 bg-blue-500 text-white p-2 rounded-md"
              >
                Add Row
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

CreatePriceBookForm.propTypes = {
  row: PropTypes.object,
  handleCloseModal: PropTypes.func.isRequired,
};

export default CreatePriceBookForm;
