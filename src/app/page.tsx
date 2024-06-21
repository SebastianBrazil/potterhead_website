'use client'

import { useEffect, useState } from "react";
import { callAPI } from "./utils/DataServices";
import ModalComponent from "./Components/ModalComponent";

export default function Home() {
  const [allCharNames, setAllCharNames] = useState<ICharacterData[]>();
  const [displayNumStart, setDisplayNumStart] = useState<number>(0);
  const [displayNumEnd, setDisplayNumEnd] = useState<number>(19);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [indiChar, setIndiChar] = useState<ICharacterData>();

  const saveData = async () => {
    const data: ICharacterData[] = await callAPI();
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
      {isModalOpen && indiChar && <ModalComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} char={indiChar} />}

      <div className="grid justify-center">
        <div className="my-10 grid justify-center">
          <button onClick={backwardList} className="w-40 bg-black text-white">backward</button>
          <button onClick={forwardList} className="w-40 bg-black text-white">foreward</button>
        </div>

        <div className="text-center">
          {
            allCharNames && allCharNames.map((char: ICharacterData, index: number) => {
              if (displayNumStart <= index && index <= displayNumEnd) {
                return (
                  <div key={index}>
                    <p onClick={() => { setIndiChar(char); setIsModalOpen(true); }}>{char.name}</p>
                  </div>
                )
              }
            })
          }
        </div>
      </div>
    </>
  );
}
