import React from 'react';
import './Current.css'

const center = {textAlign : 'center'};

function Current ({current, city})
{
    return (
    <div className='current'>

    <h4 style={center}> <b>CURRENT WEATHER </b> 
    <br/>
    {city} Weather 
    </h4>

    <div className='currentBody'>
    
    <img src={current.condition.icon} />

    <span> {current.condition.text} </span>

    <span> <b> Temp :</b>  {current.temp_c} deg </span>

    <span> <b> Feel Likes :</b>  {current.feelslike_c} deg</span>

    <span> <b> Wind Speed :</b>  {current.wind_kph}  kph</span>
    
    </div>
    </div>
    );
}

export default Current;