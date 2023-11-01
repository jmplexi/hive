import React from 'react'

export const MultiSelectOption = ({ value, selected, label, onChange }) => {
  return (
        <div className="multi-select-option-item" onClick={onChange}>
            <input
                type="checkbox"
                value={value}
                checked={selected}
                onChange={() => {}}
            />
            <label>{label}</label>
        </div>
  )
}

export const SingleSelectOption = ({ label, onClick }) => {
  return (
          <div className="single-select-option-item" onClick={onClick}>
             {label}
          </div>
  )
}
