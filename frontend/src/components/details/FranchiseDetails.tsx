"use client";

import type { Franchise } from "@/api/api";
import { deleteFranchise } from "@/api/api";
import FranchiseForm from "@/components/forms/FranchiseForm";
import Button from "@/components/ui/Button";

type FranchiseDetailsProps = {
  franchise: Franchise;
  isEditing: boolean;
  onCancelEdit: () => void;
  onSaved: () => Promise<void> | void;
};

export default function FranchiseDetails({
  franchise,
  isEditing,
  onCancelEdit,
  onSaved,
}: FranchiseDetailsProps) {
  async function handleDelete() {
    await deleteFranchise(franchise.id);
    await onSaved();
  }

  return (
    <div className="space-y-4">
      {/* Always render the form */}
      <FranchiseForm
        defaultValues={{
          id: franchise.id,
          name: franchise.name,
          tax_number: franchise.tax_number,
          phone: franchise.phone,
          email: franchise.email,
          address: franchise.address,
          about: franchise.about,
        }}
        readOnly={!isEditing}
        onCancel={onCancelEdit}
        onSubmitSuccess={async () => {
          await onSaved();
        }}
      />

      {/* Delete button only in view mode */}
      {!isEditing && (
        <div className="flex justify-end pt-2 border-t">
          <Button
            variant="secondary"
            onClick={handleDelete}
          >
            Delete Franchise
          </Button>
        </div>
      )}
    </div>
  );
}
