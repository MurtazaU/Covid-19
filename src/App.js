import './App.css';
import React from 'react'
import {
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import {useState, useEffect} from 'react';
import InfoBox from './InfoBox';

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('Worldwide')

  useEffect(() => {
    // Must Be ASYNC --> send a request, wait for it to return

    const getData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response)=> response.json())
      .then((data)=>{
        const countries = data.map((country)=>(
          {
            name : country.country, // Country name : India, Pakistan, China
            value : country.countryInfo.iso2 // UK, USA, PK, IND
          }
        ))
        setCountries(countries)

      })
    }
    getData()
  }, [countries])

  const onCountryChange = (event)=>{
    const countryCode = event.target.value
    setCountry(countryCode)
  }


  return (
    <div className="app">
      <div className="app__header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined"
          onChange={(onCountryChange)}
          value={country}>
          <MenuItem value="Worldwide">Worldwide</MenuItem>
            {/* Loop through all the countries and display them */}
            {countries.map((countries) => (
              <MenuItem value={countries.value}>{countries.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        {/* INFOBOX  Title="Corona Virus Cases*/}
        <InfoBox title="CoronaVirus Cases" cases={200} total={2000} />
        
        {/* INFOBOX  Title="Corona Virus Recoveries*/}
        <InfoBox title="CoronaVirus Recovered" cases={23} total={3544} />

        {/* INFOBOX  Title="Corona Virus Deaths*/}
        <InfoBox title="CoronaVirus Deaths" cases={3555555555} total={1231231} />

      </div>
    </div>
  );
}

export default App;
