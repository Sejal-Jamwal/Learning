import React, { useState } from 'react'
import { usePrev } from './hooks/usePrev'


function App() {
const [ value , setCurrentValue ] = useState(0);
const prev = usePrev(value);

  return <div>
       
       <div>{value}</div>

       <button onClick = {() => setCurrentValue(count => count + 1)}>Click me</button>
        
       <div>The previous value was {prev}</div>

  </div>
}

export default App
