import './CSS/App.css';
import React from 'react'
import InfoBox from './Components/InfoBox'
import {useState, useEffect} from 'react'
import {
    FormControl,
    Select,
    MenuItem,
    Card, 
    CardContent
  } from '@mui/material';
import './CSS/Header.css'
import Table from './Components/Table'
import {sortData} from './Components/utility'
import LineGraph from './Components/LineGraph'

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('Worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])

useEffect(() => {
  fetch('https://disease.sh/v3/covid-19/all')
  .then(response => response.json())
  .then(data => {
    setCountryInfo(data)
  })
}, [])


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

          const sortedData = sortData(data)
          setTableData(sortedData)
          setCountries(countries)
        })
      }
      getData()
    }, [countries])
  
    const onCountryChange = async (event)=>{
      const countryCode = event.target.value
      setCountry(countryCode)

      const url = countryCode === 'Worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

      await fetch(url)
      .then((response)=> response.json())
      .then((data) => {
        setCountry(countryCode)
        setCountryInfo(data)
      })
    }

    
    return (
      <div className="app">
      {/* LEFT SECTION */}
      <section className="app__left">
      <div className="header">
        {/* HEADER */}
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
      </div>
      <div className="app__stats">
        {/* INFOBOX  Title="Corona Virus Cases*/}
        <InfoBox title="CoronaVirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
        
        {/* INFOBOX  Title="Corona Virus Recoveries*/}
        <InfoBox title="CoronaVirus Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />

        {/* INFOBOX  Title="Corona Virus Deaths*/}
        <InfoBox title="CoronaVirus Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
      </div>

        <div className="map">
          {/* MAP */}
          <h1>I am a MAP</h1>
        </div>
      </section>

      {/* RIGHT SECTION */}
      <Card className="app__right">
        <CardContent>
        {/* TABLE */}
          <h3>Live Cases By Country</h3>
          <Table countries={tableData} />

        {/* GRAPH */}
        <h3>Worldwide New Cases</h3>
        <LineGraph />
        
        </CardContent>
      </Card>


    </div>
  );
}

export default App;
