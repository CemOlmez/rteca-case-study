"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { getFranchises, createOffice, updateOffice } from "@/api";
import type { Franchise } from "@/types";

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

export default function OfficeForm({
  defaultValues,
  readOnly = false,
  onSubmitSuccess,
  onCancel,
}: OfficeFormProps) {
  const [franchises, setFranchises] = useState<Franchise[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OfficeFormValues>({
    defaultValues: {
      isActive: true,
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        isActive: true,
        ...defaultValues,
      });
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    getFranchises().then(setFranchises).catch(console.error);
  }, []);

  const franchiseOptions = franchises.map((f) => ({
    label: f.name,
    value: f.id,
  }));

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100";

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

    data.id
      ? await updateOffice(data.id, payload)
      : await createOffice(payload);

    onSubmitSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="border-t border-gray-200" />

      {/* Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Franchise *
        </label>
        <Select
          disabled={readOnly}
          options={franchiseOptions}
          placeholder="Select franchise"
          onChange={(e) =>
            setValue("franchiseId", Number(e.target.value), {
              shouldValidate: true,
            })
          }
        />
        <input type="hidden" {...register("franchiseId", { required: true })} />
      </div>

      {/* Office Name */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Office Name *
        </label>
        <input
          {...register("name", { required: true })}
          readOnly={readOnly}
          placeholder=" Istanbul Head Office"
          className={inputClass}
        />
      </div>

      {/* Phone & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone *
          </label>
          <input
            {...register("phone", { required: true })}
            readOnly={readOnly}
            placeholder="+90 555 123 45 67"
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
            placeholder="office@email.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Consultants */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Number of Consultants *
        </label>
        <input
          type="number"
          {...register("consultants_count", {
            required: true,
            valueAsNumber: true,
          })}
          readOnly={readOnly}
          placeholder="12"
          className={inputClass}
        />
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          City *
        </label>
        <input
          {...register("city", { required: true })}
          readOnly={readOnly}
          placeholder="Istanbul"
          className={inputClass}
        />
      </div>

      {/* Status */}
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" {...register("isActive")} disabled={readOnly} />
        Active Office
      </label>

      {/* Actions */}
      {!readOnly && (
        <div className="flex justify-end gap-2 pt-4 ">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <i className="fa-solid fa-floppy-disk text-sm"></i>
            Save
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
