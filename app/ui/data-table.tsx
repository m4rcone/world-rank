export default function DataTable() {
  return (
    <div className="table w-full">
      <div className="table-header-group text-xs ">
        <div className="table-row ">
          <div className="pb-4 border-b border-zinc-800 table-cell">Flag</div>
          <div className="pb-4 border-b border-zinc-800 table-cell">Name</div>
          <div className="pb-4 border-b border-zinc-800 table-cell">Population</div>
          <div className="pb-4 border-b border-zinc-800 table-cell">Area (km²)</div>
        </div>
      </div>
      <div className="table-row-group text-sm">
        <div className="table-row">
          <div className="pt-4 table-cell">Image</div>
          <div className="pt-4 table-cell">China</div>
          <div className="pt-4 table-cell">1,401,212,212</div>
          <div className="pt-4 table-cell">9,706,325</div>
        </div>
      </div>
    </div>
  );
}