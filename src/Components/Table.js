import React from 'react'
import '../CSS/Table.css'

function Table({countries}) {
  return (
    <div className='table'>
        {/* Destructuring During Maping */}
{countries.map(({ country, cases })=>(
    <tr>
        <td>{country}</td>
        <td>
            <strong>{cases}</strong>
        </td>
    </tr>
))}
    </div>
  )
}

export default Table