"use client";

import { useState, useEffect } from "react";

import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import DataTable from "@/components/ui/Datatable";
import Modal from "@/components/ui/Modal";
import FranchiseForm from "@/components/forms/FranchiseForm";
import DetailsModal from "@/components/details/DetailsModal";

import { getFranchises } from "@/api/api";
import type { Franchise } from "@/api/api";

export default function FranchisesPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedFranchise, setSelectedFranchise] =
    useState<Franchise | null>(null);

  const [franchises, setFranchises] = useState<Franchise[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getFranchises();
      setFranchises(data);
    } catch (error) {
      console.error("Failed to fetch franchises", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">
            Franchise Information
          </h1>
          <p className="text-sm text-gray-500">
            Manage franchise information registered in the system.
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)}>
          + Add New Franchise
        </Button>

        {/* Create Franchise Modal */}
        <Modal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          title="Add New Franchise"
        >
          <FranchiseForm
            onSubmitSuccess={async () => {
              await fetchData();
              setIsCreateOpen(false);
            }}
          />
        </Modal>
      </div>

      {loading && (
        <div className="text-sm text-gray-500">
          Loading franchises...
        </div>
      )}

      {!loading && franchises.length === 0 && (
        <div className="text-sm text-gray-500">
          No franchises found.
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded shadow p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-md font-medium">
            Franchise List
          </h2>
          <SearchBar placeholder="Search franchise..." />
        </div>

        <DataTable
          data={franchises}
          columns={[
            { header: "Franchise Name", accessor: "name" },
            { header: "Tax No", accessor: "tax_number" },
            { header: "Phone Number", accessor: "phone" },
            { header: "E-mail", accessor: "email" },
            { header: "Address", accessor: "address" },
            {
              header: "Actions",
              render: (row) => (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSelectedFranchise(row);
                    setDetailsOpen(true);
                  }}
                >
                  Details
                </Button>
              ),
            },
          ]}
        />
      </div>

      {/* Details Modal */}
      <DetailsModal
        open={detailsOpen}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedFranchise(null);
        }}
        type="franchise"
        data={selectedFranchise}
        onUpdated={async () => {
          await fetchData();
          setDetailsOpen(false);
        }}
      />
    </div>
  );
}
