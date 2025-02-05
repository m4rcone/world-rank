# World Ranks

Desafio do <a href="https://devchallenges.io/challenge/country-page" target="blank">devChallenges.io</a> onde o principal aprendizado foi trabalhar com uma quantidade maior e mais complexa de dados de uma API. 

Aproveitei para utilizar ferramentas como Next.js, React e TypeScript para aprimorar meus conhecimentos.

<a href="https://world-ranks-sepia.vercel.app/" target="blank">Acesse aqui</a>

## Tabela de conteúdos

- [Sobre o projeto](#sobre-o-projeto)
  - [Funcionalidades](#funcionalidades)
  - [O que aprendi](#o-que-aprendi)
- [Como executar o projeto](#como-executar-o-projeto)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Autor](#autor)

## Sobre o projeto

World Ranks é uma página de classificação de países, onde a lista de países é adquirida através da <a href="https://restcountries.com/">API REST Countries</a>. A página permite pesquisa, classificação e filtragem, além de exibir detalhes individuais de cada país.

### Funcionalidades

- Classificação dos países por nome, população ou área (km²).
- Filtragem por diversas regiões: Américas, Antártida, Ásia, Europa ou Oceania.
- Filtragem por países membros das Nações Unidas.
- Filtragem por países independentes.
- Pesquisa/filtragem de países por nome, região ou sub-região.
- Exibição do número total de países encontrados.
- Visualização detalhada de um país em sua página específica.
- Exibição de informações como população, área, capital, moeda e idioma na página do país.
- Exibição de países vizinhos com links para suas respectivas páginas.

### O que aprendi

Este projeto me ajudou a praticar e aprimorar meus conhecimentos em tecnologias como `React`, `Next.js`, `TypeScript` e `Tailwind CSS`. A seguir, algumas abordagens e aprendizados adquiridos:

**Nexts.js** 

Utilizei pela primeira vez alguns hooks do `next/navigation`, como `usePathname`, `useRouter` e `useSearchParams`, que me permitiram controlar a navegação das páginas, recuperar o caminho da URL e acessar os dados passados por parâmetros. 

No componente `search-input.tsx`, utilizei o hook `useDebouncedCallback`, que atrasa a execução de uma função pelo tempo especificado (neste caso, 300 milissegundos). Isso foi útil para evitar requisições excessivas de renderização do componente `data-table.tsx`. Segue o código:
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
**Tailwind CSS**

Com o uso contínuo, percebi que o `Tailwind CSS` torna a estilização mais ágil. Também utilizei o `prettier-plugin-tailwindcss`, que organiza as classes automaticamente ao executar o script `lint:fix`.

**React** 

Utilizei `createContext` pela primeira vez para resolver um problema importante: passar a quantidade de países encontrados do componente `data-table.tsx` para o componente pai `page.tsx`, que é renderizado no servidor (SSR). Como não poderia usar `useState` e `useEffect`, criei um contexto `countries-found.tsx` e um novo componente client-side `countries-found.tsx` para gerenciar essa informação. Segue a implementação:

`context/countries-found.tsx`
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

`ui/countries-found.tsx`
```tsx
"use client";
import { useCountriesFound } from "../context/countries-found";

export default function ContriesFound() {
  const { countriesFound } = useCountriesFound();

  return <h2 className="font-medium">Found {countriesFound} countries</h2>;
}
```

`ui/data-table.tsx`
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

`app/page.tsx`
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

**TypeScript / Axios**

Neste projeto, utilizei `axios` para fazer requisições à API e aprimorei meus conhecimentos em `TypeScript`, definindo a estrutura dos dados no arquivo `lib/definition.ts`:

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

-   [Nexts.js](https://nextjs.org/)
-   [React](https://react.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Axios](https://www.npmjs.com/package/axios)
-   [Lucide](https://lucide.dev/)
-   [Prettier](https://prettier.io/)
-   [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
-   [use-debounce](https://www.npmjs.com/package/use-debounce)

Veja o arquivo: [package.json](https://github.com/m4rcone/world-ranks/blob/main/package.json)

## Autor

- [LinkedIn](https://www.linkedin.com/in/marcone-lentz-boff)
- [GitHub](https://{github.com/m4rcone})
