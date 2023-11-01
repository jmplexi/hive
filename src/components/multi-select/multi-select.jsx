import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown, faX } from '@fortawesome/free-solid-svg-icons'
import { MultiSelectOption, SingleSelectOption } from './select-option'
import './styles.scss'

Object.filter = (tempOptions, predicate) =>
  Object.fromEntries(Object.entries(tempOptions)
    .filter(([key, value]) =>
      predicate(value)))

export function MultiSelect ({ isMulti, options, setItems, tag, placeHolder = '' }) {
  const [isOpen, setIsOpen] = useState(false) //  Determines if the dropdown is open
  const [selectOptions, setSelectOptions] = useState({}) // The options that are selectable are stored here
  const [searchOptions, setSearchOptions] = useState({}) // Stores the results of search filtering
  const [toggleSelectAll, setToggleSelectAll] = useState(false) //  Stores whether the toggle should select or deselect all
  const [searchInput, setSearchInput] = useState('') // Stores the search input
  const searchQuery = searchInput ? searchOptions : options //  If a search query exists, filter those options, otherwise show all options

  useEffect(() => {
    setItems(selectOptions)
  }, [selectOptions, setItems])

  useEffect(() => {
    const filtered = Object.filter(options, entree => entree.label.includes(searchInput))
    setSearchOptions(filtered)
  }, [searchInput])

  // Toggles a selected multi-select option between selected/not selected
  const setMultiSelect = (event, index) => {
    event.stopPropagation()
    const tempOption = { ...selectOptions }
    if (tempOption[index]) delete tempOption[index]
    else {
      tempOption[index] = { ...options[index] }
    }

    setSelectOptions(tempOption)
  }

  //  Sets the selected option for a single choice input
  const setSelect = (index) => {
    const tempOption = { ...options[index] }
    setSelectOptions(tempOption)
    setIsOpen(false)
  }

  //  Toggle between select all/deselect all
  const toggleAll = () => {
    !toggleSelectAll ? setSelectOptions(options) : setSelectOptions({})
    setToggleSelectAll(!toggleSelectAll)
  }

  //  Renders the options for multi select
  const renderMultiOptions = () => {
    const multiArray = [<MultiSelectOption
      key={Math.random()}
      label="Select All"
      selected={toggleSelectAll}
      onChange={() => toggleAll()}
    />]
    Object.keys(searchQuery).forEach((i) => {
      multiArray.push(<MultiSelectOption
        key={Math.random()}
        value={searchQuery[i].value}
        selected={!!selectOptions[i]}
        label={searchQuery[i].label}
        onChange={(e) => setMultiSelect(e, i)}
      />)
    })

    return multiArray
  }

  //  Renders the options list for single select
  const renderSingleOptions = () => Object.keys(searchQuery).map((i) => (
    <SingleSelectOption
      key={i}
      value={searchQuery[i].value}
      label={searchQuery[i].label}
      onClick={() => setSelect(i)}
    />
  ))

  //  Renders the selected options for multi-select in the search bar
  const renderMultipleSelectedOptions = () => {
    if (Object.keys(selectOptions).length === 0) {
      return <div className="placeholder">{placeHolder}</div>
    }

    return Object.keys(selectOptions).map((i) => (
    <div className="multi-select-item" key={i}>
      <span className="multi-select-item-label">{selectOptions[i].label}</span>
      <button
        className="multi-select-item-delete"
        onClick={(e) => setMultiSelect(e, i)}
      >
        <FontAwesomeIcon icon={faX} size="xs" />
      </button>
    </div>
    ))
  }

  const renderSingleSelectedOption = () => {
    if (Object.keys(selectOptions).length === 0) {
      return <div className="placeholder">{placeHolder}</div>
    }

    return <div className="single-select-item">{selectOptions.label}</div>
  }

  return (
    <div className="select">
      <div className="select-tag">{tag}</div>
      <div className="select-dropdown" onClick={() => setIsOpen(!isOpen)}>
        <div className="select-list">
          {isMulti ? renderMultipleSelectedOptions() : renderSingleSelectedOption()}
        </div>
        <FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} style={{ color: '#808080' }}/>
      </div>
      {isOpen && (
        <div className="select-options">
          <input className="search-bar" type="text" placeholder='Search...' onChange={(e) => { setSearchInput(e.target.value) }} value={searchInput} />
          {isMulti ? renderMultiOptions() : renderSingleOptions()}
        </div>
      )}
    </div>

  )
}
