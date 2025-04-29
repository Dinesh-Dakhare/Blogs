
import React from 'react'

function Loader() {
  return (

<div className="flex-col gap-4 w-full flex items-center justify-center absolute  top-[22rem]">
  <div className="w-[2rem] h-[2rem] border-4 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-slate-400 rounded-full">
  </div>
</div>
  )
}

export default Loader