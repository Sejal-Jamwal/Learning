
import './App.css'
import { useRef, useState } from 'react';

// A clock with start and stop functionality is the best example for useRef
//For more info, you can watch 10.1 video- SPAs and Routing, 01:13:55

function App() {

  const [currentCount, setCurrentCount] = useState(1);

  const timer = useRef();

  function startClock(){
      let value = setInterval(function(){
            setCurrentCount(count => count+1);
      }, 1000);

      timer.current = value;
  }

  function stopClock(){
       clearInterval(timer.current);
  }

  return <div>
   {currentCount}
   <button onClick={startClock}>Start</button>
   <button onClick={stopClock}>Stop</button>
  </div>

   
}



export default App

