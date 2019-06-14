import React from 'react'

import styled from 'styled-components'

const FilterTodo = ({ onFilterTodo }) => {
  const handleMouceClick = e => {
    onFilterTodo(e.target.value)
  }

  return (
    <Select
      type='text'
      onChange={handleMouceClick}
    >
      <option>All</option>
      <option value="Completed">Completed</option>
      <option value="Active">Active</option>
    </Select>
  )
}

const Select = styled.select`
  background: #3b4049;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 18px;
  font-size: 24px;
  height: 55px;
  width: 536px;
  margin-bottom: 16px;

  &::placeholder {
    color: #8d96a8;
  }
`

export default FilterTodo
