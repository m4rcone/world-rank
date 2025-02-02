import Image from "next/image";

export default function Header() {
  return (
    <header className="py-16 flex justify-center">
      <Image
        width={174}
        height={24}
        src="logo.svg"
        alt="Logo World Ranks" 
      />
    </header>
  );
}