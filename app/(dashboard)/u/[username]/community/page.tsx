import React from "react";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { allBlockUsers } from "@/actions/block-service";
import { format } from "date-fns";
DataTable;

export default async function CommunityPage() {
  const data = await allBlockUsers();

  const formattedData = data.map(({ id, blocked }) => ({
    id: id,
    username: blocked.username,
    userId: blocked.id,
    imageUrl: blocked.imageUrl,
    createAt: format(new Date(blocked.createdAt), "dd/MM/yyyy"),
  }));
  return (
    <div className="p-6">
      <div className=" mb-4">
        <div className=" text-2xl font-bold">Community settings</div>
      </div>
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
}
