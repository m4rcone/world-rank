"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative">
      <Image
        width={24}
        height={24}
        src="search.svg"
        alt="magnifying glass"
        className="absolute top-2 left-2 text-gray-300"
      />
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("search")?.toString()}
        className="w-full rounded-xl bg-zinc-800 py-2 pr-4 pl-10 text-sm placeholder:truncate placeholder:text-sm placeholder:text-gray-300 md:w-sm"
      />
    </div>
  );
}
