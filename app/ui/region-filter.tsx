"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { regions } from "../lib/placeholders";

export default function RegionFilter() {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectedRegions = searchParams.get("region")?.split(",") || [];

  function toggleRegion(value: string) {
    const params = new URLSearchParams(searchParams);
    let newSelectRegions = [...selectedRegions];

    if (newSelectRegions.includes(value)) {
      newSelectRegions = newSelectRegions.filter((region) => region !== value);
    } else {
      newSelectRegions.push(value);
    }

    if (newSelectRegions.length > 0) {
      params.set("region", newSelectRegions.join(","));
    } else {
      params.delete("region");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {regions.map((region) => (
        <button
          key={region.id}
          onClick={() => toggleRegion(region.value)}
          className={`px-4 py-2 text-sm rounded-2xl font-medium cursor-pointer ${selectedRegions.includes(region.value) && "bg-zinc-800"}`}
        >
          {region.value}
        </button>
      ))}
    </div>
  );
}
