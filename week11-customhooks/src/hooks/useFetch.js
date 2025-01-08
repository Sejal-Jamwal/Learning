
import { useState , useEffect } from 'react';

//custom hook that sends a backend request as soon as website i.e component loads

// export function usePostTitle(){
//      const [ post , setPost ] = useState({});

//      async function getPosts(){
//           const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
//           const json = await response.json();
        
//           setPost(json);

//      }
     
//      useEffect(() => {
//           getPosts();
//      } , [])

//      return post;

// }

//useFetch hook will take in url as an input and return whatever that endpoint returns

export function useFetch(url){

    const [ finalData, setFinalData ] = useState({});
    const [ loading , setLoading ] = useState(true);

    async function getDetails(){
         setLoading(true);
         const response = await fetch(url);
         const json = await response.json();
         setFinalData(json);
         setLoading(false);

    }
     
    useEffect(() =>{
         getDetails();  
    } , [url])

    return {
         finalData,
         loading
    }

}

