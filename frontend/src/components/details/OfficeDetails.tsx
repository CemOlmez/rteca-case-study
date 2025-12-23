"use client";

import type { Office } from "@/api/api";
import { deleteOffice } from "@/api/api";
import OfficeForm from "@/components/forms/OfficeForm";
import Button from "@/components/ui/Button";

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
  async function handleDelete() {
    await deleteOffice(office.id);
    await onSaved();
  }

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
          consultants_count: office.consultant_count,
          isActive: office.is_active,
        }}
        readOnly={!isEditing}
        onCancel={onCancelEdit}
        onSubmitSuccess={async () => {
          await onSaved();
        }}
      />

      {/* Delete (view mode only) */}
      {!isEditing && (
        <div className="flex justify-end pt-2 border-t">
          <Button
            variant="secondary"
            onClick={handleDelete}
          >
            Delete Office
          </Button>
        </div>
      )}
    </div>
  );
}
