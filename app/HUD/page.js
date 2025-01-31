import Image from "next/image";
import React from "react";

export default function HUD() {
  return (
    // Layout
    <section className="flex justify-center items-center h-screen bg-zinc-100">
      {/* Component */}
      {/* <div className="overflow-hidden w-[120px] h-[120px] flex hover:w-max shadow-md transition-all duration-800 border-4 border-slate-400 rounded-full hover:rounded-r-2xl ease-in-out"> */}
      {/* <div className="overflow-hidden h-[120px] flex hover:w-max shadow-md transition-all duration-800 border-4 border-slate-400 rounded-full ease-in-out"> */}
      <div className="overflow-hidden w-[120px] h-[120px] flex hover:w-max shadow-md transition-all duration-800 border-4 border-slate-200 rounded-full ease-in-out outline-4 outline-slate-400">
        {/* Open State */}
        <div className="group flex items-center gap-4 transition-all duration-200 rounded-lg bg-gradient-to-b from-slate-200 to-slate-400 pr-8 ">
          {/* Open/ close Button */}
          <button className="w-max cursor-pointer bg-slate-200 rounded-full p-1 group-hover:p-4 bg-gradient-to-br from-slate-200 to-slate-400 drop-shadow-lg transition-all">
            <Image src={"/images/items/totebag.png"} width={100} height={0} alt="Totebag Icon" />
          </button>

          {/* Items */}
          {/* <ul className="flex gap-2"> */}
          <ul className="flex gap-2 relative">
            <button className="cursor-pointer hover:translate-y-[-5px] hover:scale-[102%] focus:translate-y-[-5px] transition-all duration-200 ease-in-out">
              <div className="group relative ">
                <div className="bg-slate-100 border-b-6 border-slate-300 h-[100px] w-[100px] rounded-2xl flex items-center justify-center">
                  <span className="text-7xl drop-shadow-lg">🎟️</span>
                </div>
                {/* <div className="group-hover:opacity-100 opacity-0 absolute bottom-3 text-center w-full transition-all">
                  Text
                </div> */}
              </div>
            </button>
          </ul>
        </div>
      </div>
    </section>
  );
}
