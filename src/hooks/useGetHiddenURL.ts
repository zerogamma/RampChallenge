import React, { useState } from "react";

type responseType = {
  hiddenUrl: string;
  fetchHiddenURL: () => Promise<void>;
};

function parseDOMElement({ html }: { html: string }) {
  // the idea is to parse the HTML as a Node/DOMElement for that I use to
  // create a temporary DOM element using DOMParser and parse it.
  // this aproach are similar to a web scrapper.
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Traverse the DOM tree to find and extract characters and push it into a variable array
  const characters: string[] = [];
  // Get and array of parent element that are type code and have [data-class] attribute
  const codeElements = doc.querySelectorAll("code[data-class]");

  // NOTE: you can change the tree structure to me it work again. Mentioning this because it did
  // change the tree structure while doing this challenge.
  // current structure: code -> div -> span -> i
  // other option I did see was: ul -> li -> div -> span

  codeElements.forEach((code) => {
    // now I dive beeper into the DOM tree pattern div[data-tag] -> span[data-id] -> i
    // and extract the value where it host the characters to build the URL
    const divElement = code.querySelector("div[data-tag]");
    const spanElement = divElement?.querySelector("span[data-id]");
    const iElement = spanElement?.querySelector("i");
    const character = iElement?.getAttribute("value");

    // if the character exist save it in to the array.
    if (character) {
      characters.push(character);
    }
  });

  // Join the characters to form the hidden URL
  return characters.join("");
}

export const useGetHiddenURL = (): responseType => {
  const [hiddenUrl, setHiddenURL] = useState<string>("");

  // Main logic to parse the HTML to get the URL
  async function fetchHiddenURL() {
    // Try catch in case the url doesnt work.
    try {
      const response = await fetch(
        "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge"
      );
      // convert the response to a string
      const html = await response.text();

      // save the Hidden URL found in the HTML using a custom function "parseDOMElement"
      setHiddenURL(parseDOMElement({ html }));
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  }

  return { hiddenUrl, fetchHiddenURL };
};
