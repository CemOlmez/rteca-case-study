"use client";

import { useState } from "react";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

import { DetailsModalProps } from "./types";
import OfficeDetails from "./OfficeDetails";
import FranchiseDetails from "./FranchiseDetails";

export default function DetailsModal<T extends "office" | "franchise">({
  open,
  onClose,
  type,
  data,
  onUpdated,
}: DetailsModalProps<T>) {
  const [isEditing, setIsEditing] = useState(false);

  if (!data) return null;

  function handleClose() {
    setIsEditing(false);
    onClose();
  }

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      title={type === "office" ? "Office Details" : "Franchise Details"}
    >
      <div className="space-y-6">
        {/* Entity-specific content */}
        {type === "office" && (
          <OfficeDetails
            office={data as any}
            isEditing={isEditing}
            onCancelEdit={() => setIsEditing(false)}
            onSaved={async () => {
              setIsEditing(false);
              await onUpdated?.();
            }}
          />
        )}

        {type === "franchise" && (
          <FranchiseDetails
            franchise={data as any}
            isEditing={isEditing}
            onCancelEdit={() => setIsEditing(false)}
            onSaved={async () => {
              setIsEditing(false);
              await onUpdated?.();
            }}
          />
        )}

        {/* Footer actions (view mode only) */}
        {!isEditing && (
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
