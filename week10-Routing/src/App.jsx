
import './App.css'
import { useRef } from 'react';

//useRef Hook 
//lets u create a reference to a value, s.t when you change the value, the component DOES NOT RE-RENDER
// similar to useState in the context that it creates a reference to a value
//BUT different to useState in the context that when you change the value using the useState Hook, the component RE-RENDERS.


function App() {
  
  const inputRef = useRef();

  function focusOnInput(){
    //SAME AS document.getElementById("name");
     inputRef.current.focus();
     
  }
 

  return <div>
    Sign up
    <input ref= {inputRef} id="name" type="text"></input> {/* This is the element jiska hume reference chaiye  */}
    <input id="email" type="text"></input>

    <button onClick={focusOnInput}>Submit</button>

  </div>
  
   
}



export default App

