import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="py-16 flex justify-center">
      <Link href="/">
        <Image width={174} height={24} src="logo.svg" alt="Logo World Ranks" />
      </Link>
    </header>
  );
}
