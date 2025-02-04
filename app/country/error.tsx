"use client";

import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  return (
    <main className="md:px-24 lg:px-36 xl:px-64 2xl:px-96">
      <section className="flex flex-col items-center justify-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 px-14 py-14">
        <h2 className="text-2xl">Country not found!</h2>
        <button
          onClick={() => router.back()}
          className="cursor-pointer rounded-2xl bg-zinc-800 px-4 py-2 text-sm font-medium"
        >
          Return
        </button>
      </section>
    </main>
  );
}
