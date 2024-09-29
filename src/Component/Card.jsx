import React from 'react'
import Button from './Buttons/Button'

function Card({img,heading,para}) {
  return (
    <div className="shadow-lg box w-[20rem] h-[23rem] border-1 border-black space-y-3">
        <img src={img} alt="" />
        <h1>{heading}</h1>
        <p>{para}</p>
        <div className='ml-2'><Button view={'Read More'}/></div>
    </div>
  )
}

export default Card