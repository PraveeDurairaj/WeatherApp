import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import search from './assets/search.png'
import sun from './assets/clear.png'
import humidity_photo from './assets/humidity.png'
import wind_speed from './assets/wind.png'
import clouds from './assets/clouds.png'
import drizzle from './assets/drizzle.png'
import mist from './assets/mist.png'
import rain from './assets/rain.png'
import snow from './assets/snow.png'

import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const App = () => {
  const [city, setCity] = useState('Madurai');
  const[weather,setWeather] = useState('0');
  const[humidity,setHumidity] = useState('00');
  const[wind,setWind] = useState('clouds');
  const[icon,setIcon] = useState(sun)
   const weatherIconList = {
    'clouds':clouds,
    'drizzle':drizzle,
    'mist':mist,
    'rain':rain,
    'snow':snow
  } 

  const cityName = (city) => {
    let API_key = "7de8a66a5c7e7052c7168564ff49d8c7";
    let fullUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`;
    const weather= fetch(fullUrl);
  
    return weather.then((response) => {
      return response.json(); //getting Json object
    });
  };
  let connect = () => {
    var city = document.getElementById('cityname').value
    cityName(city)//call the step 1
      .then((response) => {
        showWeatherData(response);
        changeIcon(response)
        console.log(response)
      })
      .catch(() => console.log("err"));
      
  };

  let changeIcon= (weatherData)=>{
    const weatherIconList = {
      'Clouds':clouds,
      'drizzle':drizzle,
      'Mist':mist,
      'Rain':rain,
      'Snow':snow,
      'Haze':mist
    } 
     for(const data in weatherIconList){
      console.log(weatherData.weather[0].main)
      if(weatherData.weather[0].main==data){
        console.log(data)
        setIcon(weatherIconList[data])
      }
    }
  }
  function showWeatherData(weatherData) {
    setWeather(Math.floor(weatherData.main.temp))
    setCity(weatherData.name)
    setHumidity(weatherData.main.humidity)
    setWind(weatherData.weather[0].main)
  }
  
  return (
    <Container className='main-container ' fluid>
      <Row className='container-box w-100 d-flex justify-content-center my-5'>
        <Col className=' box p-2 ' lg={3}  >
          <div className="serach-bar w-100 d-flex justify-content-center mt-3">
             <input type="text" placeholder='Enter The City' id='cityname'className='p-2 border rounded-pill me-1 w-75'/>
             <button className='border rounded-pill p-2' onClick={connect}><img src={search} className='w-50 '/></button>
          </div>
          <div className="city-weather-type-container d-flex justify-content-center flex-column align-items-center ">
             <img src={icon} class="weather-icon" />
             <h1 className='display-1'><span id="weather-no" >{weather}</span><span>°C</span></h1>
             <h2 class="display-5">{city}</h2>
          </div>
          <div class="humidity-wind-speed-container d-flex justify-content-between w-100 mt-5">
                <div class="humidity-container d-flex justify-content-center ps-4 ">
                    <img src={humidity_photo} className='w-50 h-50 pe-2'/>
                    <div className='d-flex flex-column humidity'>
                        <p ><span className="fs-4" value={50}>{humidity}</span> <span>%</span></p>
                        <p className="humidity">Humidity</p>
                    </div>
                </div>
                <div class="wind-speed-container d-flex justify-content-center pe-4">
                    <img src={wind_speed} className='w-50 h-50 pe-2'/>
                    <div className='d-flex flex-column humidity'>
                        <p class="weatherType" value={wind}>{wind}</p>
                        <p>Weather</p>
                    </div>
                </div>
            </div>
        </Col>
      </Row>
    </Container>
  )
}

export default App
