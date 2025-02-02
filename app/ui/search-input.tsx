'use client';

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput({ placeholder } : { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
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
        defaultValue={searchParams.get('query')?.toString()}
        className="w-full text-sm pl-10 pr-4 py-2 bg-zinc-800 rounded-xl placeholder:text-gray-300 placeholder:text-sm placeholder:truncate"
      />
    </div>
  );
}