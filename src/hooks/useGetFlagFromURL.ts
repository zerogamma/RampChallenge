import { useState } from "react";

type responseType = {
  loading: boolean;
  fetchFlagWord: ({ url }: { url: string }) => Promise<void>;
  flagWord: string[];
};

export const useGetFlagFromURL = (): responseType => {
  const [loading, setLoading] = useState<boolean>(true);
  const [flagWord, setFlagWord] = useState<string[]>([]);

  async function fetchFlagWord({ url }: { url: string }) {
    try {
      const response = await fetch(url);
      const flagWordResponse = await response.text();
      if (flagWordResponse) {
        setFlagWord(flagWordResponse.split(""));
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  }

  return { flagWord, loading, fetchFlagWord };
};
