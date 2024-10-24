
import React from 'react'

function Loader() {
  return (
   /* From Uiverse.io by TamaniPhiri */ 
<div className="flex-col gap-4 w-full flex items-center justify-center absolute right-[22rem] top-[22rem]">
  <div className="w-[2rem] h-[2rem] border-4 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-slate-400 rounded-full">
    {/* <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" className="animate-ping">
    </svg> */}
  </div>
</div>
  )
}

export default Loader