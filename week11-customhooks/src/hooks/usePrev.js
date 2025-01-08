import { useRef, useEffect } from 'react';

export function usePrev(value){
    
   const ref = useRef();
   console.log("re-render happened with new value" + value);
    
   useEffect(() => {
      console.log("updated the ref to be" + value);
      ref.current = value;
   } , [value]);

   console.log("returned the value" + ref.current);
   return ref.current;

}

//Property of React: it returns first and calls the effect later.