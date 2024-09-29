import React from 'react'

function Button({view}) {
  return (
    <button className='p-2 w-[7rem] border-2 rounded-xl bg-slate-700 text-white'>{view}</button>
  )
}

export default Button