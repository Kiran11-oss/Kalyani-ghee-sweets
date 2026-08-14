import DataTable, { Column } from "@/components/tables/DataTable";

interface Sub { id: number; email: string; subscribed_at: string; }
const seed: Sub[] = [
  { id: 1, email: "ramesh@example.com", subscribed_at: "2024-04-10" },
  { id: 2, email: "sunita@example.com", subscribed_at: "2024-05-02" },
];

export default function Subscribers() {
  const columns: Column<Sub>[] = [
    { header: "Email", accessor: (s) => s.email },
    { header: "Subscribed On", accessor: (s) => s.subscribed_at },
  ];
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-gray-800">Newsletter Subscribers <span className="text-gray-400 font-normal text-sm">({seed.length})</span></h1>
      <DataTable columns={columns} data={seed} keyField={(s) => s.id} />
    </div>
  );
}
