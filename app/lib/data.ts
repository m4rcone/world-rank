import axios from "axios";

export async function fetchAllCountries() {
  try {
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?sort=population",
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error to fetch all countries.");
  }
}

export async function fetchCountryByCode(code: string) {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/alpha/${code}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error to fetch country by code");
  }
}
