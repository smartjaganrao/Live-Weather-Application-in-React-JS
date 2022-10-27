import React from 'react';
import BgRainVideo from '../files/rainvideo.mp4';
import BgSunnyVideo from '../files/sunnyvideo.mp4';

function Bgvideo ({livecondition})
{
 return (
          (livecondition == "Sunny") ? 
      <video autoPlay muted loop id="video">
       <source src={BgSunnyVideo} type='video/mp4'/>
      </video>      
      :    
      <video autoPlay muted loop id="video">
      <source src={BgRainVideo} type='video/mp4'/>
     </video>
 );
}

export default Bgvideo;