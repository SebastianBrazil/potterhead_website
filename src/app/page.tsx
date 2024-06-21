'use client'

import { useEffect, useState } from "react";
import { callAPI } from "./utils/DataServices";
import ModalComponent from "./Components/ModalComponent";

export default function Home() {
  const [displayedCharNames, setDisplayedCharNames] = useState<ICharacterData[]>();

  const [allCharNames, setAllCharNames] = useState<ICharacterData[]>();
  const [displayNumStart, setDisplayNumStart] = useState<number>(0);
  const [displayNumEnd, setDisplayNumEnd] = useState<number>(19);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [indiChar, setIndiChar] = useState<ICharacterData>();

  const saveData = async () => {
    const data: ICharacterData[] = await callAPI();
    setAllCharNames(data);
    setDisplayedCharNames(data);
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

  const swapList = async () => {
    let flippedList: ICharacterData[] = [];

    if (displayedCharNames) {
      for (let i = displayedCharNames.length - 1; i >= 0; i--) {
        flippedList.push(displayedCharNames[i])
      }

      setDisplayedCharNames(flippedList);
    }
  }

  const standardOrder = async () => {
    if (allCharNames) {
      setDisplayedCharNames(allCharNames);
    }
  }

  const alphabeticalOrder = async () => {
    if (allCharNames) {
      let alphaList: ICharacterData[] = [];

      let allNames: string[] = allCharNames.map(char => {
        return char.name + "_" + char.id;
      })

      allNames = allNames.sort();

      allNames.map(name => {
        allCharNames.map(char => {
          let nameData = name.split("_");
          if (char.name === nameData[0] && char.id === nameData[1]) {
            alphaList.push(char);
          }
        })
      })

      setDisplayedCharNames(alphaList);
    }
  }

  useEffect(() => {
    saveData();
  }, []);

  return (
    <>
      {isModalOpen && indiChar && <ModalComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} char={indiChar} />}

      <div className="w-screen h-screen">
        <div className="pt-10 grid grid-cols-1">
          <div className="max-md:grid pb-10 md:pb-40 md:flex justify-center">
            <button onClick={backwardList} className="py-3 m-1 bg-black bg-opacity-45 rounded-3xl w-52 text-white">Go Back 20</button>
            <button onClick={forwardList} className="py-3 m-1 bg-black bg-opacity-45 rounded-3xl w-52 text-white">Go Forward 20</button>

            <button onClick={swapList} className="py-3 m-1 bg-black bg-opacity-45 rounded-3xl w-52 text-white">Switch Direction</button>

            <button onClick={standardOrder} className="py-3 m-1 bg-black bg-opacity-45 rounded-3xl w-52 text-white">Sort List By Standard Order</button>
            <button onClick={alphabeticalOrder} className="py-3 m-1 bg-black bg-opacity-45 rounded-3xl w-52 text-white">Sort List By Alphabetical Order</button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-2 text-center pb-10 w-screen max-w-[768px]">
            {
              displayedCharNames ? displayedCharNames.map((char: ICharacterData, index: number) => {
                if (displayNumStart <= index && index <= displayNumEnd) {
                  return (
                    <div key={index} className="col-span-2 sm:col-span-1 flex justify-center">
                      <button className="py-2 my-1 bg-black bg-opacity-45 rounded-3xl w-52 text-white" onClick={() => { setIndiChar(char); setIsModalOpen(true); }}>{char.name}</button>
                    </div>
                  )
                }
              })
                :
                <div className="col-span-2 flex justify-center">
                  <div className="py-3 my-1 bg-black bg-opacity-45 rounded-3xl w-52">
                    <p className="text-white">Loading...</p>
                  </div>
                </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}
