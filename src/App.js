import { useEffect, useState } from 'react';
import './App.css';
import Current from './components/Current';
import ForeCast from './components/ForeCast';
import Bgvideo from './components/Bgvideo';

const autoCompleteSuggestURL = "http://api.weatherapi.com/v1/search.json?key=d5d09894860748a4ba785928222110&q=";

const weatherURL = 
(city) => `http://api.weatherapi.com/v1/forecast.json?
key=d5d09894860748a4ba785928222110&q=${city}&days=1&aqi=no&alerts=no
`;

const center = {textAlign : 'center'};

function App() {

  const [city,setCity] = useState('');
  const [clicked,setClicked] = useState(false);
  const [citysuggest,setCitySuggest] = useState([]);

  const [current,setCurrent] = useState()
  const [forecast,setForecast] = useState()

  const [livecondition, SetLivecondition] =  useState();
  

  const handleClick = async (selectedcity) => {
    setCity(selectedcity);
    setClicked(true); // Display the city list
    setCitySuggest([]);// Hide the city List

    const apiresponse = await fetch(weatherURL(selectedcity));
    const apidata = await apiresponse.json();

    setCurrent(apidata.current);
    setForecast(apidata.forecast);

    SetLivecondition(apidata.current.condition.text);

    console.log(apidata);
  }

  const suggestionList =<div className='SuggestionWrapper'>
    {     
  citysuggest.map((items) =>
  (
  <div className='Suggestion' onClick={ () => handleClick(items) }> {items}</div>
  ))
    }     
  </div>;

  useEffect( () => 
  {

    const getDataFromApiTimeout = setTimeout( () => {  
      const fetchCitySuggestion = async () => 
    {
      const response = await fetch(autoCompleteSuggestURL + city);
      const data = await response.json();
      console.log(data);

      const result = data.map( (item,index) => {
        console.log(item.name+","+item.region+","+item.country);
        const res = item.name+","+item.region+","+item.country;
        return res;
      })
      setCitySuggest(result);  
    }

    if(!clicked && city.length > 2)
    {
      fetchCitySuggestion();
    }
    else
    {
      setClicked(false); // Hide the city list
      setCitySuggest([]); // clear city array
    }
    }, 1000);
     
    return () => clearTimeout(getDataFromApiTimeout); // ckear timeout from use effect not from set timeout.

  },[city, livecondition]) // when city value is changed then it will call use effect function

  return (
    
    <div className="App">

      <h1 style={center}><b> Live Weather Application </b></h1>
      <div className="App-header">

       {
       
       livecondition && <Bgvideo livecondition={livecondition}></Bgvideo>
       
       } 

       <input type="text" className='citytextbox' placeholder='City' value={city}  onChange={ event => setCity(event.target.value) }></input>
       
       {(citysuggest.length === 0) ?  "" :   suggestionList } 

       { current && <Current current={current} city={city} />}
       { forecast && <ForeCast forecast={forecast} />}
    </div>
    </div>
  );
}
export default App;