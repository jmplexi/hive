/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { MultiSelect } from './components/multi-select/multi-select'
import { people, months } from './options.js'
import './App.scss'

function App () {
  const [selectedMultiItems, setSelectedMultiItems] = useState({})
  const [selectedItem, setSelectedItem] = useState({})

  return (
    <>
    <div className="example1">
      <MultiSelect
        isMulti={true}
        options={people}
        setItems={setSelectedMultiItems}
        tag="People"
        placeHolder="Search for People"
      />
      <div>
        <div>Selected Values</div>
        <ul>
          {Object.keys(selectedMultiItems).map((i) => {
            return (<li key={i}>{selectedMultiItems[i].value}</li>)
          })}
        </ul>
      </div>
    </div>
    <br></br>
    <br></br>
    <div className="example2">
      <MultiSelect
        isMulti={false}
        options={months}
        setItems={setSelectedItem}
        tag="Year"
        placeHolder="Select a Month"
      />
      <div>
        <div>Selected Values</div>
        <ul>
          <li>{selectedItem.value}</li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default App
