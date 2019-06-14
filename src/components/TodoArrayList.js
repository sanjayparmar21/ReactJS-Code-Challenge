import React from 'react'

import styled from 'styled-components'

const TodoArrayList = ({ items, onTodoArrayList }) => {
  const handleMouceClick = e => {
    onTodoArrayList(e.target.value)
  }
  var index = -1;
  return (
    <Div>
     <Select
        type='text'
        onChange={handleMouceClick}
      >
        {items.map(item => {
          index++
          return (index > 0) ? <option key={index}>{index}</option> : <option  key={index}>Select Todo List to display</option>
        })}
      </Select>
    </Div>
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
const Div = styled.div`
`
export default TodoArrayList
