import { use } from 'react';
import { useState, useEffect } from 'react'


function App() {

  //CONDITIONAL RENDERING

  const [counterVisible, setCounterVisible] = useState(true);

  //Logic for changing the counterVisible value after every 5 secs
  useEffect(function(){
     
    setInterval(function(){
       setCounterVisible(counterVisible => !counterVisible);
    }, 5000);

  }, []);

   return <div>
       {counterVisible && <Counter></Counter>}
   </div>
   
}

function Counter(){
    
   const [count, setCount] = useState(0);
    
   useEffect(function() {
      // Logic for when the component mounts, runs only when dependency array is empty
      let clock = setInterval(function(){
        setCount(count => count + 1);
      }, 1000);

      // UNMOUNTING AND CLEANUP

      return function(){
        //Logic for when the component unmounts, runs only when dependency array is empty
        clearInterval(clock);
      }

   }, []);


   return <div>
       <h1>{count}</h1>
       
   </div>
}

export default App
