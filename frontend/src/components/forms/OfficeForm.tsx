"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import {
  getFranchises,
  createOffice,
  updateOffice,
} from "@/api/api";
import type { Franchise } from "@/api/api";

/* =========================
   Types
========================= */

type OfficeFormValues = {
  id?: number;
  franchiseId: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  consultants_count: number;
  isActive: boolean;
};

type OfficeFormProps = {
  defaultValues?: Partial<OfficeFormValues>;
  readOnly?: boolean;
  onSubmitSuccess?: () => void;
  onCancel?: () => void;
};

/* =========================
   Component
========================= */

export default function OfficeForm({
  defaultValues,
  readOnly = false,
  onSubmitSuccess,
  onCancel,
}: OfficeFormProps) {
  const [franchises, setFranchises] = useState<Franchise[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<OfficeFormValues>({
    defaultValues: {
      isActive: true,
      ...defaultValues,
    },
  });

  /* Reset form when defaultValues change (Details → Edit safety) */
  useEffect(() => {
    if (defaultValues) {
      reset({
        isActive: true,
        ...defaultValues,
      });
    }
  }, [defaultValues, reset]);

  const selectedFranchise = watch("franchiseId");

  /* Load franchises */
  useEffect(() => {
    async function loadFranchises() {
      try {
        const data = await getFranchises();
        setFranchises(data);
      } catch (err) {
        console.error("Failed to load franchises", err);
      } finally {
        setLoading(false);
      }
    }

    loadFranchises();
  }, []);

  const franchiseOptions = franchises.map((f) => ({
    label: f.name,
    value: f.id,
  }));

  /* Submit (create only for now) */
  const onSubmit = async (data: OfficeFormValues) => {
  const payload = {
    franchise_id: data.franchiseId,
    name: data.name,
    phone: data.phone,
    email: data.email,
    city: data.city,
    consultants_count: data.consultants_count,
    is_active: data.isActive,
  };

  if (data.id) {
    // ✅ EDIT MODE
    await updateOffice(data.id, payload);
  } else {
    // ✅ CREATE MODE
    await createOffice(payload);
  }

  onSubmitSuccess?.();
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Franchise */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Franchise *
        </label>

        <Select
          disabled={readOnly}
          value={selectedFranchise ?? ""}
          placeholder="Choose franchise"
          options={franchiseOptions}
          onChange={(value) =>
            setValue("franchiseId", Number(value), {
              shouldValidate: true,
            })
          }
        />

        {errors.franchiseId && (
          <p className="text-sm text-red-500">Required</p>
        )}
      </div>

      {/* Office Name */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Office Name *
        </label>
        <input
          {...register("name", { required: true })}
          readOnly={readOnly}
          className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
        />
      </div>

      {/* Phone + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          {...register("phone", { required: true })}
          readOnly={readOnly}
          placeholder="Phone"
          className="border rounded px-3 py-2 disabled:bg-gray-100"
        />
        <input
          type="email"
          {...register("email", { required: true })}
          readOnly={readOnly}
          placeholder="Email"
          className="border rounded px-3 py-2 disabled:bg-gray-100"
        />
      </div>

      {/* Consultant Count */}
      <input
        type="number"
        {...register("consultants_count", {
          required: true,
          valueAsNumber: true,
        })}
        readOnly={readOnly}
        placeholder="Consultant Count"
        className="border rounded px-3 py-2 w-full disabled:bg-gray-100"
      />

      {/* City */}
      <div>
        <label className="block text-sm font-medium mb-1">
          City *
        </label>
        <input
          {...register("city", { required: true })}
          readOnly={readOnly}
          className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
        />
        {errors.city && (
          <p className="text-sm text-red-500">Required</p>
        )}
      </div>

      {/* Status */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("isActive")}
          disabled={readOnly}
        />
        Active Office
      </label>

      {/* Actions */}
      {!readOnly && (
        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" disabled={loading}>
            Save
          </Button>

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
