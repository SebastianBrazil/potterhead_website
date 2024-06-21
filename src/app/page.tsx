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

      <div className="w-screen h-screen">
        <div className="pt-10 grid grid-cols-1">
          <div className="max-md:grid pb-10 md:pb-40 md:flex justify-center">
            <button onClick={backwardList} className="py-3 m-1 bg-black bg-opacity-45 rounded-3xl w-52 text-white">Go Back 20</button>
            <button onClick={forwardList} className="py-3 m-1 bg-black bg-opacity-45 rounded-3xl w-52 text-white">Go Forward 20</button>

            <button onClick={forwardList} className="py-3 m-1 bg-black bg-opacity-45 rounded-3xl w-52 text-white">Switch Direction</button>

            <button onClick={forwardList} className="py-3 m-1 bg-black bg-opacity-45 rounded-3xl w-52 text-white">Sort List By Standard Order</button>
            <button onClick={forwardList} className="py-3 m-1 bg-black bg-opacity-45 rounded-3xl w-52 text-white">Sort List By Alphabetical Order</button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-2 text-center pb-10 w-screen max-w-[768px]">
            {
              allCharNames ? allCharNames.map((char: ICharacterData, index: number) => {
                if (displayNumStart <= index && index <= displayNumEnd) {
                  return (
                    <div key={index} className="col-span-2 sm:col-span-1 flex justify-center">
                      <div className="py-2 my-1 bg-black bg-opacity-45 rounded-3xl w-52">
                        <p className="text-white" onClick={() => { setIndiChar(char); setIsModalOpen(true); }}>{char.name}</p>
                      </div>
                    </div>
                  )
                }
              })
                :
                <div className="w-screen grid justify-center">
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
