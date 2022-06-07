import React from 'react'
import {Line} from 'react-chartjs-2'
import {useState, useEffect} from 'react'

function LineGraph() {
    const [data, setData] = useState({})

    useEffect(() => {
     fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
     .then(response => response.json())
     .then(data => {

     })
    }, [])
    

  return (
      <div>
          IM A LINE GRAPH
          {/* <Line 
          data
          options
          /> */}
      </div>
  )
}

export default LineGraph