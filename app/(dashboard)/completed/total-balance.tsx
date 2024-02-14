"use client";

import { Dot, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface Props {
  total: number;
}

export default function TotalBalance({ total }: Props) {
  const [view, setView] = useState(true);
  return (
    <div
      className="flex flex-col gap-1 cursor-pointer"
      onClick={() => setView((prev) => !prev)}
    >
      <div className="flex gap-2 items-center">
        <span className="text-md">Total</span>
        {view ? (
          <Eye
            className="text-gray-600 transition-all duration-150"
            size={20}
          />
        ) : (
          <EyeOff
            className="text-gray-600  transition-all duration-150"
            size={20}
          />
        )}
      </div>
      <div className="h-[40px]">
        {view ? (
          <>
            <span className="text-xl font-bold text-black">
              {total.toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN",
              })}
            </span>
            <span className="text-md ml-1 text-gray-500 font-bold">MXM</span>
          </>
        ) : (
          <div className="flex">
          {Array.from({ length: 5 }).map((val,index)=>(
            <Dot size={30} className="text-gray-600" key={index}/>            
          ))}
          </div>
        )}
      </div>
    </div>
  );
}
