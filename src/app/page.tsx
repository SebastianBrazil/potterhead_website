'use client'

import { useEffect, useState } from "react";
import { callAPI } from "./utils/DataServices";

export default function Home() {
  const [allCharNames, setAllCharNames] = useState<ICharacterData[]>();

  const saveData = async () => {
    const data: ICharacterData[] = await callAPI('api/characters')
    setAllCharNames(data);
  }

  useEffect(() => {
    saveData();
  }, []);

  return (
    <>
      <div>
        {/* <p>bruh</p> */}
        {
          allCharNames && allCharNames.map((chars: ICharacterData, index: number) => {
            return (
              <div key={index}>
                <p>{chars.name}</p>
              </div>
            )
          })
        }
      </div>
    </>
  );
}
