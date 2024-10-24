import React, { useEffect, useRef, useState } from "react";
export let activeTabRef
function NavigationComponent({
  route,
  defaultActiveState = 0,
  defaultTab = [],
  children,
}) {
  //this is for hr
  let activeUnderlineRef = useRef();
  //this is for useEffect to work
   activeTabRef = useRef();

  const [activeState, setActiveState] = useState(defaultActiveState);
  const handleActiveState = (btn, i) => {
    let { offsetWidth, offsetLeft } = btn;
    activeUnderlineRef.current.style.width = offsetWidth + "px";
    activeUnderlineRef.current.style.left = offsetLeft + "px";
    setActiveState(i);
  };
  useEffect(() => {
    handleActiveState(activeTabRef.current, defaultActiveState);
  }, []);
  return (
    <>
      <div className="relative overflow-x-hidden bg-white border-b border-grey flex flex-nowrap">
        {route.map((route, i) => {
          return (
            <button
              ref={i == defaultActiveState ? activeTabRef : null}
              key={i}
              className={
                "p-2 capitalize  " +
                (activeState == i ? "text-black " : "text-slate-500 ") +
                (defaultTab.includes(route) ? "md:hidden" : " ")
              }
              onClick={(e) => {
                handleActiveState(e.target, i);
              }}
            >
              {route}
            </button>
          );
        })}
        <hr
          ref={activeUnderlineRef}
          className="absolute bottom-0 duration-300 text-black"
        />
      </div>
      {Array.isArray(children) ? children[activeState] : children}
    </>
  );
}

export default NavigationComponent;
