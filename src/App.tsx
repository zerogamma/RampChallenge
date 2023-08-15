import "./styles.css";

import React, { useEffect, useState } from "react";

export default function App() {
  const [hiddenUrl, setHiddenURL] = useState("");

  useEffect(() => {
    async function fetchHiddenURL() {
      try {
        const response = await fetch(
          "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge"
        );
        const html = await response.text();

        // Create a temporary DOM element to parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Traverse the DOM tree to find and extract characters
        const characters: string[] = [];
        const codeElements = doc.querySelectorAll("code[data-class]");

        console.log(codeElements);
        codeElements.forEach((code) => {
          const divElement = code.querySelector("div[data-tag]");
          const spanElement = divElement?.querySelector("span[data-id]");
          const iElement = spanElement?.querySelector("i");
          const character = iElement?.getAttribute("value");

          if (character) {
            characters.push(character);
          }
        });

        // Join the characters to form the hidden URL
        const url = characters.join("");
        setHiddenURL(url);
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    }

    fetchHiddenURL();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Hidden URL: {hiddenUrl}</p>
      </header>
    </div>
  );
}
