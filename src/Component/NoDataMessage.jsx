import React from 'react'

function NoDataMessage({message}) {
  return (
    <div className='w-full bg-slate-100 rounded-md p-2 flex items-center justify-center mt-2'><p>{message}</p></div>
  )
}

export default NoDataMessage