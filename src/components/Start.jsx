import { useRef } from "react";

export default function Start({setusername}) {
  const inputref = useRef();
  const handleclick = ()=>{
    inputref.current.value && setusername(inputref.current.value);
  }
  return (
    <div className="Start">
      <input placeholder="enter your name" className="startinput" ref={inputref}/>
      <button className="startbutton" onClick={handleclick}>Start</button>
    </div>
  );
}
