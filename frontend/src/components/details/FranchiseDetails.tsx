"use client";

import type { Franchise } from "@/types";

import FranchiseForm from "@/components/forms/FranchiseForm";

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
  return (
    <div className="space-y-4">
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
    </div>
  );
}
