import Image from "next/image";

export default function SearchInput({ placeholder } : { placeholder: string }) {
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
        className="w-full text-sm pl-10 pr-4 py-2 bg-zinc-800 rounded-xl placeholder:text-gray-300 placeholder:text-sm placeholder:truncate"
      />
    </div>
  );
}