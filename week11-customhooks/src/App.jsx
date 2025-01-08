import React, { useState } from 'react'

function useDebounce(originalFn){
    
    const currentClock = useRef();
    
    const fn = () => {
    clearTimeout(currentClock.current);
    currentClock.current = setTimeout(originalFn, 30);
    }

    return fn;
}


function App() {
  
  function sendDataToBackend(){
     fetch("api.amazon.com/search");
  }

  const debouncedFunction = useDebounce(sendDataToBackend);

  return <div>
       
       <input onClick = {debouncedFunction}></input>

  </div>
}

export default App
