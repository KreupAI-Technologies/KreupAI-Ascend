import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  TextAreaField,
  TextInputField,
} from "@/modules/wotsabot/components/FormFields";
import PropTypes from "prop-types";

const RolesForm = ({ closeModal, onSubmit }) => {
  const [isSaving, setIsSaving] = useState(false);

  const roleSchema = z.object({
    name: z.string(),
    description: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(roleSchema),
  });

  const handleFormSubmit = async (data, event) => {
    event.preventDefault();
    console.log(data);
    const actionType = event.nativeEvent.submitter.name;

    if (actionType === "save") {
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit(data);
      closeModal();
    }
    console.log("Data successfully saved:", data);
    setIsSaving(false);
  };
  return (
    <div>
      <div className="relative">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="pt-20">
          <div className="overflow-y-auto max-h-[540px] max w-[400px] p-4">
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Add Role</h2>
              <div className="w-[15%] flex items-center justify-center gap-4">
                <Button type="submit" name="save" disabled={isSaving}>
                  {isSaving ? <Loader /> : "Save"}
                </Button>
                <Button
                  variant="outline"
                  onClick={closeModal}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
              </div>
            </div>
            <div className="">
              <TextInputField
                name="name"
                register={register}
                label="Name"
                placeholder="Name"
                errors={errors}
              />
              <TextAreaField
                name="description"
                register={register}
                label="Description"
                placeholder="Description"
                errors={errors}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

RolesForm.propTypes = {
  closeModal: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default RolesForm;
