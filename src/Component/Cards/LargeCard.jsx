import React from 'react'

function LargeCard({e}) {
  return (
    <div className="flex p-5 " >
              <img
                src={`./multerImg/${e.banner}`}
                alt=""
                className=" w-[42rem]"
              />
              <div className="w-full">
                <h1>{e.title}</h1>
                <p>{e.createdAt}</p>
              </div>
            </div>
  )
}

export default LargeCard