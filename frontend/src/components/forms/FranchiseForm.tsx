"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import {
  createFranchise,
  updateFranchise,
} from "@/api/api";

/* =========================
   Types
========================= */

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

/* =========================
   Component
========================= */

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
  } = useForm<FranchiseFormValues>({
    defaultValues,
  });

  /* Reset when switching franchise / cancel edit */
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  /* Create or Update */
  const onSubmit = async (data: FranchiseFormValues) => {
    const payload = {
      name: data.name,
      tax_number: data.tax_number,
      phone: data.phone,
      email: data.email,
      address: data.address,
      about: data.about,
    };

    if (data.id) {
      // ✅ UPDATE
      await updateFranchise(data.id, payload);
    } else {
      // ✅ CREATE
      await createFranchise(payload);
    }

    onSubmitSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Franchise Name */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Franchise Name *
        </label>
        <input
          {...register("name", { required: true })}
          readOnly={readOnly}
          className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
        />
        {errors.name && (
          <p className="text-sm text-red-500">Required</p>
        )}
      </div>

      {/* Tax Number */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Tax Number *
        </label>
        <input
          {...register("tax_number", { required: true })}
          readOnly={readOnly}
          className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
        />
        {errors.tax_number && (
          <p className="text-sm text-red-500">Required</p>
        )}
      </div>

      {/* Phone + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Phone *
          </label>
          <input
            {...register("phone", { required: true })}
            readOnly={readOnly}
            className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">Required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Email *
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            readOnly={readOnly}
            className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
          />
          {errors.email && (
            <p className="text-sm text-red-500">Required</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Address *
        </label>
        <textarea
          {...register("address", { required: true })}
          readOnly={readOnly}
          className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
          rows={3}
        />
        {errors.address && (
          <p className="text-sm text-red-500">Required</p>
        )}
      </div>

      {/* About */}
      <div>
        <label className="block text-sm font-medium mb-1">
          About Franchise
        </label>
        <textarea
          {...register("about")}
          readOnly={readOnly}
          className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
          rows={3}
        />
      </div>

      {/* Actions */}
      {!readOnly && (
        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit">Save</Button>

          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                reset(defaultValues);
                onCancel();
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      )}
    </form>
  );
}
