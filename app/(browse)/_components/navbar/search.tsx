"use client";
import React from "react";

import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import qs from "query-string";

export const Search = () => {
  const router = useRouter();
  const [search, setSearch] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: search },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  const onClear = () => {
    setSearch("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full lg:w-[400px] flex items-center"
    >
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />

      {search && (
        <X
          className=" absolute h-5 w-5 right-16 text-muted-foreground cursor-pointer transition hover:opacity-80"
          onClick={onClear}
        />
      )}
      <Button variant="secondary" type="submit" className="rounded-l-none h-10">
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
};
