import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField.jsx";
import { customerFormSchema } from "../validators/customerSchemas.js";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "lead",
  notes: "",
};

export default function CustomerFormModal({ open, initialData, onClose, onSubmit }) {
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(customerFormSchema),
    defaultValues: EMPTY_FORM,
  });


  useEffect(() => {
    if (open) {
      reset(initialData ? { ...EMPTY_FORM, ...initialData } : EMPTY_FORM);
      setApiError("");
    }
  }, [open, initialData, reset]);

  if (!open) return null;

  const submitHandler = async (data) => {
    setApiError("");
    try {
      await onSubmit(data);
    } catch (err) {
      setApiError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900">
          {initialData ? "Edit customer" : "Add customer"}
        </h3>

        {apiError && (
          <div className="mt-3 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-600 ring-1 ring-rose-200">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(submitHandler)} className="mt-4 space-y-4" noValidate>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Full name" name="name" registration={register("name")} error={errors.name} />
            <FormField label="Email" name="email" type="email" registration={register("email")} error={errors.email} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Phone" name="phone" registration={register("phone")} error={errors.phone} placeholder="Optional" />
            <FormField label="Company" name="company" registration={register("company")} error={errors.company} placeholder="Optional" />
          </div>

          <FormField label="Status" name="status" as="select" registration={register("status")} error={errors.status}>
            <option value="lead">Lead</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </FormField>

          <FormField label="Notes" name="notes" as="textarea" registration={register("notes")} error={errors.notes} placeholder="Optional" />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-color-brand-light disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : initialData ? "Save changes" : "Add customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
