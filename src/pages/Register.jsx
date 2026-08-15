import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext.jsx";
import FormField from "../components/FormField.jsx";
import { registerFormSchema } from "../validators/authSchemas.js";

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (data) => {
    setApiError("");
    try {
      await registerUser(data.name, data.email, data.password);
      navigate("/");
    } catch (err) {
      setApiError(err.response?.data?.message || "Unable to create account. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-[--color-brand] text-sm font-bold text-white">
            CR
          </div>
          <h1 className="text-xl font-semibold text-slate-900">Create your account</h1>
          <p className="mt-1 text-sm text-slate-500">Start managing your customers</p>
        </div>

        {apiError && (
          <div className="mb-4 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-600 ring-1 ring-rose-200">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormField
            label="Full name"
            name="name"
            registration={register("name")}
            error={errors.name}
            placeholder="Jane Doe"
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            registration={register("email")}
            error={errors.email}
            placeholder="you@company.com"
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            registration={register("password")}
            error={errors.password}
            placeholder="At least 6 characters"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-green-400 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-[--color-brand] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
