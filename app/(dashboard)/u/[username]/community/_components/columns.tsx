"use client";

import { UserAvatar } from "@/components/shared/userAvatar";
import { Button } from "@/components/ui/button";
import { Block, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { UnblockButton } from "./unblock-button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BlockedUsers = {
  id: string;
  username: string;
  userId: string;
  imageUrl: string | null;
  createAt: string;
};

export const columns: ColumnDef<BlockedUsers>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-4">
          <UserAvatar
            username={row.original.username}
            imageUrl={row.original.imageUrl!}
          />
          <span>{row.original.username}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date blocked
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => <UnblockButton userId={row.original.userId} />,
  },
];
