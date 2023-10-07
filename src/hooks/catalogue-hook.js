import { generateCatalogues } from "@/libs/faker-data";
import { fuzzySearch, generateFuzzySets } from "@/libs/fuzzy-helper";
import { useQueryClient, useQuery } from "@tanstack/react-query";

export function useCatalogues() {
  const queryClient = useQueryClient();

  const dummyCatalogues = useQuery({
    queryKey: ["catalogues", "dummy-data"],
    queryFn: () => queryClient.getQueryData(["catalogues", "dummy-data"]),
    initialData: generateCatalogues(100),
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const catalogues = useQuery({
    queryKey: ["catalogues"],
    queryFn: () => queryClient.getQueryData(["catalogues"]),
    initialData: dummyCatalogues.data,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const fuzzyFilter = useQuery({
    queryKey: ["catalogues", "fuzzy-filter"],
    queryFn: () => queryClient.getQueryData(["catalogues", "fuzzy-filter"]),
    initialData: {},
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const filterCatalogues = (filter) => {
    let data = [...queryClient.getQueryData(["catalogues", "dummy-data"])];
    const fuzzySets = {};

    if (Object.keys(filter).length > 0) {
      Object.keys(filter).forEach(
        (key) => (fuzzySets[key] = generateFuzzySets(filter[key])),
      );

      data = data
        .reduce((store, item) => {
          const scores = [];

          Object.keys(filter).forEach((key) => {
            const score = fuzzySearch(item[key], fuzzySets[key]);
            scores.push(score);
          });
          const finalScore = Math.min(...scores);
          const newItem = {
            ...item,
            scores,
            finalScore,
          };

          if (finalScore > 0) {
            store.push(newItem);
          }

          return store;
        }, [])
        .sort((a, b) => (a.finalScore < b.finalScore ? 1 : -1));
    }

    console.log(data);

    queryClient.setQueryData(["catalogues", "fuzzy-filter"], fuzzySets);
    queryClient.setQueryData(["catalogues"], data);
  };

  return {
    catalogues,
    fuzzyFilter,
    filterCatalogues,
  };
}
