import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./taskSchema";
import PropTypes from "prop-types";
import {
  CheckBoxField,
  SelectField,
  TextAreaField,
  TextInputField,
} from "../../../../components/FormFields";
import ClapSpinner from "../../../../components/ui/ClapSpinner";

const TasksForm = ({ closeModal, onSubmit }) => {
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
            <h2 className="text-xl font-semibold">Create Task</h2>
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

          <h3 className="text-lg font-semibold mb-6">Task Information</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <TextInputField
              name="task_name"
              register={register}
              label="Subject"
              placeholder="Subject"
              errors={errors}
            />
            <TextInputField
              name="due_date"
              register={register}
              label="Due Date"
              placeholder="DD/MM/YYYY"
              errors={errors}
            />
            <SelectField
              name="priority"
              register={register}
              label="Priority"
              placeholder="Select Priority"
              options={["Low", "Medium", "High"]}
            />

            <SelectField
              name="task_owner"
              register={register}
              label="Owner"
              placeholder="Select Owner"
              options={["Sabu John Bosco"]}
            />
            <TextInputField
              name="related_entity"
              register={register}
              label="Related To"
              placeholder="Related To"
              errors={errors}
            />
            <SelectField
              name="status"
              register={register}
              label="Status"
              placeholder="Select Status"
              options={[
                "Not Started",
                "Deferred",
                "In Progress",
                "Completed",
                "Waiting for input",
              ]}
            />
            <CheckBoxField
              name="reminder"
              register={register}
              label="Reminder"
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

TasksForm.propTypes = {
  closeModal: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default TasksForm;
