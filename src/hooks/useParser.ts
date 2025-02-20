import { useState } from "react";
import { Parser } from "../types";

type UseParser = {
  registerParser: (label: string, inputKeyStr: string, parser: Parser) => void;
  parserMap: Record<string, Record<string, Parser>>;
};
export const useParser = (): UseParser => {
  const [parserMap, setParserMap] = useState<
    Record<string, Record<string, Parser>>
  >({});

  const registerParser = (
    label: string,
    inputKeyStr: string,
    parser: Parser
  ) => {
    setParserMap((prev) => ({ ...prev, [label]: { [inputKeyStr]: parser } }));
  };

  return { registerParser, parserMap };
};
