'use client'

import { useEffect } from "react";
import { callAPI } from "./utils/DataServices";

export default function Home() {

  useEffect(()=>{
    const bruh = callAPI('api/characters');
  }, []);

  return (
    <>
      <div>
        <p>bruh</p>
      </div>
    </>
  );
}
