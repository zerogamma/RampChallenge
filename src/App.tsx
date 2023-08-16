import { useEffect, useState, useRef } from "react";
import { useGetHiddenURL } from "./hooks/useGetHiddenURL";
import { useGetFlagFromURL } from "./hooks/useGetFlagFromURL";
import "./styles.css";

export default function App() {
  const [flag, setFlag] = useState<string>("");
  const { hiddenUrl, fetchHiddenURL } = useGetHiddenURL();
  const { loading, fetchFlagWord, flagWord } = useGetFlagFromURL();
  const countRef = useRef(0);

  useEffect(() => {
    // hook to get the URL for the flag word
    fetchHiddenURL();
  }, []);

  useEffect(() => {
    if (hiddenUrl) fetchFlagWord({ url: hiddenUrl });
  }, [hiddenUrl]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (flagWord.length) {
      timer = setTimeout(() => {
        if (countRef.current < flagWord.length) {
          setFlag(flag + flagWord[countRef.current]);
          countRef.current = countRef.current + 1;
        }
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [flagWord, flag]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Hidden URL: {hiddenUrl}</p>
      </header>
      <div>{loading ? <div>Loading...</div> : <p>{flag}</p>}</div>
    </div>
  );
}
