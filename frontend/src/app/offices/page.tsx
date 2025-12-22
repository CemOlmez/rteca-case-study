import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import DataTable from "@/components/ui/Datatable";

type Office = {
  name: string;
  phone: string;
  email: string;
  consultants: number;
  isActive: boolean;
};

const offices: Office[] = [
  {
    name: "Ataşehir Ofisi",
    phone: "+90 216 555 0101",
    email: "atasehir@jokersoft.com",
    consultants: 4,
    isActive: true,
  },
  {
    name: "Kadıköy Ofisi",
    phone: "+90 216 555 0102",
    email: "kadikoy@jokersoft.com",
    consultants: 5,
    isActive: true,
  },
];

export default function OfficesPage() {
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

        <Button>+ Add New Office</Button>
      </div>

      {/* Table card */}
      <div className="bg-white rounded shadow p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Office List</h2>
          <SearchBar placeholder="Search Offfice..." />
        </div>

        <DataTable
          data={offices}
          columns={[
            { header: "Office Name", accessor: "name" },
            { header: "Phone Number", accessor: "phone" },
            { header: "E-mail", accessor: "email" },
            {
              header: "Consultants",
              render: (row) => (
                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-xs">
                  {row.consultants}
                </span>
              ),
            },
            {
              header: "Status",
              render: (row) => (
                <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs">
                  {row.isActive ? "Aktif" : "Pasif"}
                </span>
              ),
            },
            {
              header: "Actions",
              render: () => (
                <Button variant="secondary">Detay</Button>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
