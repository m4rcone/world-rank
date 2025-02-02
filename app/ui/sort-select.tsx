import Image from "next/image";

export default function SortSelect() {
  const options = ["Population", "Name", "Área (km²)"];

  return (
    <div className="relative">
      <select className="w-full appearance-none px-4 py-2 border border-zinc-800 rounded-xl text-sm">
        {options.map(option => (
          <option className="px-4 py-4 bg-zinc-900 rounded-xl">{option}</option>
        ))}
      </select>
      <Image
        width={24}
        height={24}
        src="expand_down.svg"
        alt="expand down icon"
        className="absolute bottom-2 right-2 pointer-events-none" />
    </div>
  );
}