import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./callSchema";
import PropTypes from "prop-types";
import {
  TextAreaField,
  TextInputField,
} from "../../../../components/FormFields";
import ClapSpinner from "../../../../components/ui/ClapSpinner";

const CallsForm = ({ closeModal, onSubmit }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingNew, setIsSavingNew] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (data, event) => {
    event.preventDefault();
    const actionType = event.nativeEvent.submitter.name;

    if (actionType === "save") {
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit(data);
    } else if (actionType === "saveAndNew") {
      setIsSavingNew(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit(data);
    }

    console.log("Data successfully saved:", data);

    setIsSaving(false);
    setIsSavingNew(false);

    if (actionType === "saveAndNew") {
      reset();
    } else {
      closeModal();
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="pt-20">
        <div className="overflow-y-auto max-h-[540px] p-4">
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Create Call</h2>
            <div className="w-[30%] flex items-center justify-center gap-4">
              <button
                type="submit"
                name="save"
                className="w-1/2 flex items-center justify-center text-sm bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 disabled"
                disabled={isSaving || isSavingNew}
              >
                {isSaving ? <ClapSpinner /> : "Save"}
              </button>
              <button
                type="submit"
                name="saveAndNew"
                className="w-full flex items-center justify-center text-sm bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600"
                disabled={isSaving || isSavingNew}
              >
                {isSavingNew ? <ClapSpinner /> : "Save and New"}
              </button>
              <button
                type="button"
                className="w-1/2 text-sm bg-white py-2 px-3 rounded-lg border border-gray-300 hover:border-blue-400 disabled:opacity-80"
                onClick={closeModal}
                disabled={isSaving || isSavingNew}
              >
                Cancel
              </button>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-6">Call Information</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <TextInputField
              name="call_type"
              register={register}
              label="Call Type"
              placeholder="Call Type"
              errors={errors}
            />
            <TextInputField
              name="call_time"
              register={register}
              label="Call Time"
              placeholder="Call Time"
              errors={errors}
            />
            <TextInputField
              name="duration"
              register={register}
              label="Duration"
              placeholder="Duration"
              errors={errors}
            />
            <TextInputField
              name="subject"
              register={register}
              label="Subject"
              placeholder="Subject"
              errors={errors}
            />
            <TextInputField
              name="participants"
              register={register}
              label="Participants"
              placeholder="Participants"
              errors={errors}
            />
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-6">
              Description Information
            </h3>
            <TextAreaField
              name="description"
              register={register}
              label="Description"
              placeholder="Description"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

CallsForm.propTypes = {
  closeModal: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default CallsForm;
