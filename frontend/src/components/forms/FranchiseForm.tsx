"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import { createFranchise, updateFranchise } from "@/api";

type FranchiseFormValues = {
  id?: number;
  name: string;
  tax_number: string;
  phone: string;
  email: string;
  address: string;
  about?: string;
};

type FranchiseFormProps = {
  defaultValues?: Partial<FranchiseFormValues>;
  readOnly?: boolean;
  onSubmitSuccess?: () => void;
  onCancel?: () => void;
};

export default function FranchiseForm({
  defaultValues,
  readOnly = false,
  onSubmitSuccess,
  onCancel,
}: FranchiseFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FranchiseFormValues>({ defaultValues });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100";

  const onSubmit = async (data: FranchiseFormValues) => {
    const payload = { ...data };
    delete payload.id;

    data.id
      ? await updateFranchise(data.id, payload)
      : await createFranchise(payload);

    onSubmitSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="border-t border-gray-200" />

      {/* Franchise Name */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Franchise Name *
        </label>
        <input
          {...register("name", { required: true })}
          readOnly={readOnly}
          placeholder="JokerSoft Istanbul"
          className={inputClass}
        />
      </div>

      {/* TAX Number */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Tax Number *
        </label>
        <input
          {...register("tax_number", { required: true })}
          readOnly={readOnly}
          placeholder="1234567890"
          className={inputClass}
        />
      </div>

      {/* Phone and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone *
          </label>
          <input
            {...register("phone", { required: true })}
            readOnly={readOnly}
            placeholder="+90 555 000 00 00"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email *
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            readOnly={readOnly}
            placeholder="info@franchise.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Adress */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Address *
        </label>
        <textarea
          {...register("address", { required: true })}
          readOnly={readOnly}
          placeholder="Full company address"
          rows={3}
          className={inputClass}
        />
      </div>

      {/* About */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          About Franchise
        </label>
        <textarea
          {...register("about")}
          readOnly={readOnly}
          placeholder="Short description about the franchise"
          rows={3}
          className={inputClass}
        />
      </div>

      {!readOnly && (
        <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
          <Button type="submit">
            {" "}
            <i className="fa-solid fa-floppy-disk text-sm"></i> Save
          </Button>
          {onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      )}
    </form>
  );
}
