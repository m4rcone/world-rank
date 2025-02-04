"use client";

import { createContext, useState, useContext } from "react";

interface CountriesFoundContextProps {
  countriesFound: number;
  setCountriesFound: React.Dispatch<React.SetStateAction<number>>;
}

const CountriesFoundContext = createContext<CountriesFoundContextProps>({
  countriesFound: 0,
  setCountriesFound: () => {},
});

export const CountriesFoundProvider = ({ children }) => {
  const [countriesFound, setCountriesFound] = useState<number>(0);

  return (
    <CountriesFoundContext.Provider
      value={{ countriesFound, setCountriesFound }}
    >
      {children}
    </CountriesFoundContext.Provider>
  );
};

export const useCountriesFound = () => useContext(CountriesFoundContext);
