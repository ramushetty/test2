import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api from './Api'





function App() {
  const [data,setData] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/data', {withCredentials: true});
        console.log(response.data)
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <div>

    
      <div>{data.message}</div>
      
    </div>

  );
}

export default App;
