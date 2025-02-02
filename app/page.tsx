import Image from "next/image";
import SearchInput from "./ui/search-input";
import SortSelect from "./ui/sort-select";
import RegionFilter from "./ui/region-filter";
import StatusFilter from "./ui/status-filter";
import DataTable from "./ui/data-table";

export default function Page() {
  return (
    <main className="px-3 py-6 flex flex-col justify-center gap-6 bg-zinc-900 border border-zinc-800 rounded-xl">
      <section className="flex flex-col gap-6">
        <h2 className="font-medium">Found 234 countries</h2>

        <SearchInput placeholder="Search by Name, Region..." />

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium">Sort by</label>
          <SortSelect />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium">Region</label>
          <RegionFilter />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium">Status</label>
          <StatusFilter />
        </div>
      </section>

      <section>
        <DataTable />
      </section>
    </main>
  );
}
