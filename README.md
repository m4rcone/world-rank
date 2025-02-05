# World Ranks

Desafio do <a href="https://devchallenges.io/challenge/country-page" target="blank">devChallenges.io</a> onde o principal aprendizado era trabalhar com uma quantidade maior e mais complicada de dados de uma API. Aproveiter para utilizar ferramentas como Nexts.js, React e Typescript para aprimorar meus conhecimentos.

<a href="https://world-ranks-sepia.vercel.app/" target="blank">Acesse aqui -></a>

## Tabela de conteúdos

- [Sobre o projeto](#sobre-o-projeto)
  - [Layout](#layout)
  - [Funcionalidades](#funcionalidades)
  - [O que aprendi](#o-que-aprendi)
- [Como executar o projeto](#como-executar-o-projeto)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Autor](#autor)

## Sobre o projeto

World Ranks é uma página de classificação de países, onde a lista de países é adquirida através da <a href="https://restcountries.com/">API REST Countries</a>. A página permite pesquisa, classificação e filtragem. Também possui página com detalhes de cada país.

### Funcionalidades

- Classificar os países por nome, população ou área (km²).
- Filtrar por diversas regiões, que podem ser Américas, Antártida, Ásia, Europa ou Oceania.
- Filtrar por países membros das Nações Unidas.
- Filtrar por países independentes.
- Pesquisar/filtrar países por seus nomes, regiões ou sub-regiões.
- Visualizar o número total de países encontrados.
- Selecionar um país e ver mais detalhes em na página do país.
- Na página do país, os usuários podem ver informações como população, área, capital, moeda, língua...
- Na página do país, os usuários podem ver os países vizinhos e selecionar para redirecionar para a página do país correspondente.

### O que aprendi

Este projeto me ajudou a praticar e aprimorar meus conhecimentos em tecnologias como React, Next.js, Typescript e Tailwind CSS. Apresento a seguir algumas abordagens e conhecimentos adquiridos:

**Nexts.js:** utilizei pela primeira vez alguns hooks no `next/navigation` como `usePathname`, `useRouter`, `useSearchParams` que me permitiu controlar a navegação das páginas, retornar o caminho da URL e os dados passados por parâmetros. Segue exemplo do componente `search-input.tsx` onde também utilizei pela primeira vez o um hook chamado `useDebounced` que atrasa a execução de uma função no tempo informado, que no caso foi de 300 milissegundos. Usei essa abordagem pois na primeira versão, quando eu atualizava os parâmetros de busca da URL, o meu componente `data-table.tsx` fazia uma nova requisição na API e não queria que ele fizesse isso a cada letra digitada, porém mudei a abordagem para fazer apenas uma requisição e depois aplicar os filtros. Segue o código:
```tsx
export default function SearchInput({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    ...
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("search")?.toString()}
    ...
```
**Tailwind CSS:** acredito que tailwind é uma questão de prática e que conforme o tempo de uso você acaba ficando mais ágil na utilização, foi o que consegui perceber nesse projeto. Também utilizei o `prettier-plugin-tailwindcss` que organiza as classes de estilização ao executar o script `lint:fix`.

**React:** utilizei pela primeira vez o `createContext` do React que foi o que me permitiu resolver o maior desafio pra mim nesse projeto. Eu precisava passar a quantidade de países encontrados do meu componente `data-table.tsx` para o componente pai `page.tsx` porém esse componente era server side o que impedia eu usar hooks `useState` e `useEffect`. Então criei o contexto `countries-found.tsx` e um novo componente client side `countries-found.tsx` que permitiu eu passar informação de um para o outro. Segue o código:

context/countries-found.tsx
```tsx
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
```

ui/countries-found.tsx
```tsx
"use client";
import { useCountriesFound } from "../context/countries-found";

export default function ContriesFound() {
  const { countriesFound } = useCountriesFound();

  return <h2 className="font-medium">Found {countriesFound} countries</h2>;
}
```

ui/data-table.tsx
```tsx
"use client";
import { useCountriesFound } from "../context/countries-found";
...

export default function DataTable({
  search,
  un,
  independent,
  sortBy,
  region,
  countries,
}: DataTableProps) {
  const { setCountriesFound } = useCountriesFound();

  useEffect(() => {
    setCountriesFound(filteredCountries.length);
  }, [filteredCountries]);

  ...
}
```

app/page.tsx
```tsx
import { CountriesFoundProvider } from "./context/countries-found";
...

return (
    <main>
      <section className="flex flex-col justify-center gap-6 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-6 md:px-6">
        <CountriesFoundProvider>
          <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <CountriesFound />
            ...
          </header>

          <div className="flex flex-col gap-6 md:flex-row">
            ...
            <section className="overflow-x-auto md:basis-full">
              <DataTable
                search={search}
                un={un}
                independent={independent}
                sortBy={sortBy}
                region={region}
                countries={countries}
              />
            </section>
          </div>
        </CountriesFoundProvider>
      </section>
    </main>
  );
}
```

**Typescrit/Axios:** Nesse projeto utilizei apenas a função `get` do `axios` mas foram dados um pouco mais completos o que me ajudou a melhorar meus conhecimentos em `Typescript` também, onde criei um arquivo `lib/definition.ts` para definir a estrutura dos dados de cada país do array e criei `lib.data.ts` para definir a função de `fetch` na `api`:
```ts
export type Country = {
  name: {
    common: string;
  };
  region: string;
  subregion?: string;
  population: number;
  area: number;
  unMember: boolean;
  independent: boolean;
  flags: {
    svg: string;
  };
  cca3: string;
};

```

```ts
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
```

## Como executar o projeto

```bash
# Clone este repositório
$ git clone git@github.com:m4rcone/world-ranks.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd world-ranks

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000
```

## Tecnologias utilizadas

-   **[Nexts.js](https://nextjs.org/)**
-   **[React](https://react.dev/)**
-   **[Tailwind CSS](https://tailwindcss.com/)**
-   **[Axios](https://www.npmjs.com/package/axios)**
-   **[Lucide](https://lucide.dev/)**
-   **[Prettier](https://prettier.io/)**
-   **[prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)**
-   **[use-debounce](https://www.npmjs.com/package/use-debounce)**

Veja o arquivo: [package.json](https://github.com/m4rcone/world-ranks/blob/main/package.json)

## Autor

- LinkedIn [marcone-lentz-boff](https://www.linkedin.com/in/marcone-lentz-boff)
- GitHub [@m4rcone](https://{github.com/m4rcone})
