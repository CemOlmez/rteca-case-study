import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import DataTable from "@/components/ui/Datatable";

type Franchise = {
  name: string;
  taxNumber: string;
  phone: string;
  email: string;
  address: string;
};

const franchises: Franchise[] = [
  {
    name: "Joker Gayrimenkul",
    taxNumber: "1234567890",
    phone: "+90 212 555 0101",
    email: "info@joker.com",
    address: "İstanbul, Türkiye",
  },
  {
    name: "ABC Emlak",
    taxNumber: "9876543210",
    phone: "+90 312 555 0202",
    email: "info@abcemlak.com",
    address: "Ankara, Türkiye",
  },
];

export default function FranchisesPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Franchise Information</h1>
          <p className="text-sm text-gray-500">
            Manage franchise information registered in the system.
          </p>
        </div>

        <Button>+ Add New Franchise</Button>
      </div>

      {/* Table card */}
      <div className="bg-white rounded shadow p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-md font-medium">Franchise Listesi</h2>
          <SearchBar placeholder="Franchise ara..." />
        </div>

        <DataTable
          data={franchises}
          columns={[
            { header: "Franchise Name", accessor: "name" },
            { header: "Tax No", accessor: "taxNumber" },
            { header: "Phone Number", accessor: "phone" },
            { header: "E-mail", accessor: "email" },
            { header: "Address", accessor: "address" },
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
