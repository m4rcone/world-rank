"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { sortByOption as options } from "../lib/placeholders";

export default function SortSelect() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSelect(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("sortBy", value);
    } else {
      params.delete("sortBy");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative">
      <select
        defaultValue={searchParams?.get("sortBy")}
        onChange={(e) => handleSelect(e.target.value)}
        className="w-full appearance-none rounded-xl border border-zinc-800 px-4 py-2 text-sm"
      >
        {options.map((option) => (
          <option
            key={option.id}
            value={option.value}
            className="rounded-xl bg-zinc-900 px-4 py-4"
          >
            {option.label}
          </option>
        ))}
      </select>
      <Image
        width={24}
        height={24}
        src="expand_down.svg"
        alt="expand down icon"
        className="pointer-events-none absolute right-2 bottom-2"
      />
    </div>
  );
}
