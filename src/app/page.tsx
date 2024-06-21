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

  const stopScroll = () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    }
  }

  return (
    <>
      {isModalOpen && indiChar && <ModalComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} char={indiChar} />}

      <div className="w-screen h-screen">
        <div className="py-10 grid justify-center">
          <button onClick={backwardList} className="w-40 bg-black text-white">backward</button>
          <button onClick={forwardList} className="w-40 bg-black text-white">foreward</button>
        </div>

        <div className="grid justify-center text-center pb-10">
          {
            allCharNames ? allCharNames.map((char: ICharacterData, index: number) => {
              if (displayNumStart <= index && index <= displayNumEnd) {
                return (
                  <div className="py-3 my-1 bg-black bg-opacity-45 rounded-3xl w-52" key={index}>
                    <p className="text-white" onClick={() => { setIndiChar(char); setIsModalOpen(true); stopScroll(); }}>{char.name}</p>
                  </div>
                )
              }
            })
              :
              <div className="py-3 my-1 bg-black bg-opacity-45 rounded-3xl w-52">
                <p className="text-white">Loading...</p>
              </div>
          }
        </div>
      </div>
    </>
  );
}
