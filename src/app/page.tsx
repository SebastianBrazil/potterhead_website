'use client'

import { useEffect, useState } from "react";
import { callAPI } from "./utils/DataServices";

export default function Home() {
  const [allCharNames, setAllCharNames] = useState<ICharacterData[]>();
  const [displayNumStart, setDisplayNumStart] = useState<number>(0);
  const [displayNumEnd, setDisplayNumEnd] = useState<number>(19);

  const saveData = async () => {
    const data: ICharacterData[] = await callAPI('api/characters')
    setAllCharNames(data);
  }

  const forwardList = async () => {
    if (allCharNames && displayNumEnd < allCharNames.length) {
      setDisplayNumStart(displayNumStart + 20);
      setDisplayNumEnd(displayNumEnd + 20);
    }
  }

  const backwardList = async () => {
    if (allCharNames && displayNumStart > 0) {
      setDisplayNumStart(displayNumStart - 20);
      setDisplayNumEnd(displayNumEnd - 20);
    }
  }

  useEffect(() => {
    saveData();
  }, []);

  return (
    <>
      <div>
        <button onClick={backwardList} className="bg-black text-white">back</button>
        <button onClick={forwardList} className="mb-10 ml-4 bg-black text-white">foreward</button>

        {
          allCharNames && allCharNames.map((chars: ICharacterData, index: number) => {
            if(displayNumStart <= index && index <= displayNumEnd){
              return (
                <div key={index}>
                  <p>{chars.name}</p>
                </div>
              )
            }
          })
        }
      </div>
    </>
  );
}
