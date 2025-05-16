"use client"
import { StatsContext } from '@/context/StatsContext'
import React, { useContext } from 'react'

const AutosumLabel = () => {
  
    const { autoSum, clearStsats } = useContext(StatsContext);
    if (autoSum === 0) return null;
    return (
    <div className="fixed top-4 md:top-2 left-0 right-0 flex justify-center z-20">

        <button 
          onClick={clearStsats}
          className="bg-gray-400/15  text-gray-900 px-4 py-2 text-xs md:text-base rounded shadow-md transition-colors">
         {"$"+autoSum.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </button>
    </div>
  )
}

export default AutosumLabel