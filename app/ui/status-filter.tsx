'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function StatusFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const isMemberUNChecked = searchParams.get("un") === "true";
  const isIndependentChecked = searchParams.get("independent") === "true";
  
  const handleFilter = (filter: string, value: boolean) => {
    const params = new URLSearchParams(searchParams);
    if (!value) {
      params.set(filter, "true");
    } else {
      params.delete(filter);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          className="hidden peer"
          checked={isMemberUNChecked}
          onChange={e => handleFilter("un", !e.target.checked)}
        />
        <div
          className="w-6 h-6 rounded-md border-2 border-gray-300 peer-checked:bg-blue-500 peer-checked:border-blue-500
                peer-checked:bg-[url(/done_round.svg)] peer-checked:bg-center">
        </div>
        <span className="text-sm font-medium">Member of the United Nations</span>
      </label>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          className="hidden peer"
          checked={isIndependentChecked}
          onChange={e => handleFilter("independent", !e.target.checked)}
        />
        <div
          className="w-6 h-6 rounded-md border-2 border-gray-300 peer-checked:bg-blue-500 peer-checked:border-blue-500
                peer-checked:bg-[url(/done_round.svg)] peer-checked:bg-center">
        </div>
        <span className="text-sm font-medium">Independent</span>
      </label>
    </div>
  );
}