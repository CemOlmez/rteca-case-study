"use client";

import type { Office } from "@/types";

import OfficeForm from "@/components/forms/OfficeForm";

type OfficeDetailsProps = {
  office: Office;
  isEditing: boolean;
  onCancelEdit: () => void;
  onSaved: () => Promise<void> | void;
};

export default function OfficeDetails({
  office,
  isEditing,
  onCancelEdit,
  onSaved,
}: OfficeDetailsProps) {
  return (
    <div className="space-y-4">
      <OfficeForm
        defaultValues={{
          id: office.id,
          franchiseId: office.franchise_id,
          name: office.name,
          phone: office.phone,
          email: office.email,
          city: office.city,
          consultants_count: office.consultants_count,
          isActive: office.is_active,
        }}
        readOnly={!isEditing}
        onCancel={onCancelEdit}
        onSubmitSuccess={async () => {
          await onSaved();
        }}
      />
    </div>
  );
}
