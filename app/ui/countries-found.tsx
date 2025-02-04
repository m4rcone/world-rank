"use client";

import { useCountriesFound } from "../context/countries-found";

export default function ContriesFound() {
  const { countriesFound } = useCountriesFound();

  return <h2 className="font-medium">Found {countriesFound} countries</h2>;
}
