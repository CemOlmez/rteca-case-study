"use client";

import { useState } from "react";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

import type { Office, Franchise } from "@/types";
import type { DetailsModalProps } from "./types";

import { deleteOffice, deleteFranchise } from "@/api";

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

  async function handleDelete() {
    if (type === "office") {
      await deleteOffice((data as Office).id);
    }

    if (type === "franchise") {
      await deleteFranchise((data as Franchise).id);
    }

    await onUpdated?.();
    handleClose();
  }

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      title={type === "office" ? "Office Details" : "Franchise Details"}
    >
      <p>Edit or Delete Information</p>
      <div className="space-y-6">
        {type === "office" && (
          <OfficeDetails
            office={data as Office}
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
            franchise={data as Franchise}
            isEditing={isEditing}
            onCancelEdit={() => setIsEditing(false)}
            onSaved={async () => {
              setIsEditing(false);
              await onUpdated?.();
            }}
          />
        )}

        {!isEditing && (
          <div className="flex justify-between items-center pt-4">
            <div className="flex gap-2">
              <Button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
              >
                <i className="fa-solid fa-pen-to-square text-sm"></i>
                Edit
              </Button>

              <Button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-600 text-white hover:bg-red-700"
              >
                <i className="fa-solid fa-trash text-sm"></i>
                Delete
              </Button>
            </div>

            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
