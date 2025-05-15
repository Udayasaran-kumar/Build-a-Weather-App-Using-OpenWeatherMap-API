import './App.css'
import React, { useEffect, useRef, useState } from 'react'

//https://api.openweathermap.org/data/2.5/weather?q={city}&appid=97fdbb15601f2d7e8036a9b78670b69b&units=metric
//https://api.openweathermap.org/data/2.5/weather?q={city}&appid=97fdbb15601f2d7e8036a9b78670b69b&units=metric
const App = () => {
  const [city,setCity]=useState(''||'bangalore');
  const [err,seterr]=useState('');
  const [isLoading, setIsloading]=useState(true);  
  const [report,setReport]=(null);
  const entercity=useRef(null);
  const handleSubmit=(e)=>{
  e.preventDefault();
  const searchcity=entercity.current.value;
  // console.log(searchcity);
  setCity(prev=>searchcity);
  // console.log(city);
}
const fetchWeather=async(city)=>{  
  try {
    let res= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=97fdbb15601f2d7e8036a9b78670b69b&units=metric`);
  let data=await res.json();
  console.log(data);
  const weather={
    data:data,
    isLoading:false,
    error:''
  }
  console.log(weather);
  setReport(prev=>weather);
  } catch (error) {
    const weather={
    data:{},
    isLoading:false,
    error:error,
  }
  console.log(weather);
  setReport(prev=>weather);
  }

}
useEffect(()=>{
  fetchWeather(city);
 
},[city])
  
  return (
    <div>
      <form action={onsubmit}>
        <input type='text' ref={entercity} placeholder='Enter city name..'/>
        <button onClick={handleSubmit}>Search</button>
      </form>
    </div>
  )
}

export default App