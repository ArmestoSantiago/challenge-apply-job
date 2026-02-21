import { OpenPositionsType } from "../types/types";

export const getOpenPositions = async () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const URL = `${BASE_URL}/api/jobs/get-list`;

  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error("Fetch to Get Jobs");
  }

  const data: OpenPositionsType[] = await response.json();

  const mappedData = data.map(position => {
    return {
      id: position.id,
      title: position.title
    };
  });

  return mappedData;
};