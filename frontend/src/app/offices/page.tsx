"use client";

import { useState, useEffect } from "react";

import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import Select from "@/components/ui/Select";
import DataTable from "@/components/ui/Datatable";
import Modal from "@/components/ui/Modal";
import OfficeForm from "@/components/forms/OfficeForm";
import DetailsModal from "@/components/details/DetailsModal";
import { getAllOffices, getFranchises } from "@/api/api";
import type { Office, Franchise } from "@/api/api";



export default function OfficesPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFranchise, setSelectedFranchise] = useState("");

  const [offices, setOffices] = useState<Office[]>([]);
const [franchises, setFranchises] = useState<Franchise[]>([]);

const [detailsOpen, setDetailsOpen] = useState(false);
const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);

const [loading, setLoading] = useState(true);

  async function loadData() {
  try {
    const [officesData, franchisesData] = await Promise.all([
      getAllOffices(),
      getFranchises(),
    ]);

    setOffices(officesData);
    setFranchises(franchisesData);
  } catch (err) {
    console.error("Failed to load offices", err);
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  loadData();
}, []);


const franchiseOptions = franchises.map((f) => ({
  label: f.name,
  value: f.id.toString(),
}));

const filteredOffices = selectedFranchise
  ? offices.filter(
      (o) => o.franchise_id === Number(selectedFranchise)
    )
  : offices;


  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Franchise Offices</h1>
          <p className="text-sm text-gray-500">
            Manage offices under the franchises.
          </p>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>
  + Add New Office
</Button>

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Add New Office"
>
  <OfficeForm
    onSubmitSuccess={async () => {
      await loadData();  
      setIsModalOpen(false);
    }}
  />
</Modal>


      </div>

      {loading && (
  <div className="text-sm text-gray-500">
    Loading offices...
  </div>
)}

{!loading && filteredOffices.length === 0 && (
  <div className="text-sm text-gray-500">
    No offices found.
  </div>
)}

      {/* Table card */}
      <div className="bg-white rounded shadow p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Office List</h2>
           <Select
    value={selectedFranchise}
    onChange={setSelectedFranchise}
    options={franchiseOptions}
  />
          <SearchBar placeholder="Search Offfice..." />
          
        </div>
        <div className="flex gap-4 items-center">
 
</div>


        <DataTable
          data={filteredOffices}
          columns={[
            { header: "Office Name", accessor: "name" },
            { header: "Phone Number", accessor: "phone" },
            { header: "E-mail", accessor: "email" },
            {
              header: "Consultants",
              render: (row) => (
                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-xs">
                  {row.consultants_count}
                </span>
              ),
            },
            {
              header: "Status",
              render: (row) => (
                <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs">
                  {row.is_active ? "Active" : "Out"}
                </span>
              ),
            },
            {
  header: "Actions",
  render: (row) => (
    <Button
      variant="secondary"
      onClick={() => {
        setSelectedOffice(row);
        setDetailsOpen(true);
      }}
    >
      
      Details
    </Button>
  ),
}
          ]}
        />
        <DetailsModal
  open={detailsOpen}
  onClose={() => {
    setDetailsOpen(false);
    setSelectedOffice(null);
  }}
  type="office"
  data={selectedOffice}
  onUpdated={async () => {
    await loadData();
  }}
/>
      </div>
    </div>
  );
}
