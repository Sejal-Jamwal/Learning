import { useState, useEffect } from 'react'

//useEffect, DEPENDENCY ARRAY, Cleanups

function App() {

   const [count, setCount] = useState(0);
   const [count2, setCount2] = useState(0);

   function increase(){
       setCount(count+1);
   }

   function decrease(){
     setCount2(count2-1);
   }

   return <div>
       <Counter count={count} count2={count2}></Counter>
       <button onClick={increase}>Increase Count</button>
       <button onClick={decrease}>Decrease Count</button>
   </div>
 
   
}

function Counter(props){
    
   //EMPTY DEPENDENCY ARRAY

   useEffect(function(){
    
    console.log("Counter Component mounts");

    return function(){
      console.log("Counter Component unmounts");
    }

   }, []);

   //DEPENDENCY ARRAY WITH STATE VARIABLES

   useEffect(function(){
       console.log("counter has changed");
       
       return function(){
         console.log("cleanup inside second effect");
       }

   }, [props.count, props.count2]);

   return <div>
       <h1>Counter 1 {props.count}</h1>
       <h1>Counter 2 {props.count2}</h1>
       
   </div>
}

export default App
