import React, { createContext, useContext, useState } from 'react'
import './App.css'

//CREATING CONTEXT FOR YOUR STATE VARIABLES
const BulbContext = createContext();

function App() {

  const [bulbOn, setBulbOn] = useState(true);
   
    return <div>
      {/*PROVIDER*/}
      <BulbContext.Provider value={{
          bulbOn : bulbOn,
          setBulbOn : setBulbOn
      }}>
       <Light/>
      </BulbContext.Provider>
    </div>
}

function Light(){

    return <div>
        <LightBulb/>
        <LightSwitch/>
    </div>
}

function LightBulb(){
  
  const { bulbOn } = useContext(BulbContext);

  return <div>
      { bulbOn ? "Bulb on" : "Bulb off"};
  </div>
     
}

function LightSwitch(){
    
   const { bulbOn, setBulbOn } = useContext(BulbContext);
    
   function ToggleFunction(){
        setBulbOn(!bulbOn);
   }

   return <div>
      <button onClick={ToggleFunction}>Toggle</button>
   </div>

}



export default App
