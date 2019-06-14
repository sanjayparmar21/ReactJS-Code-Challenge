import React from 'react'

import styled from 'styled-components'

const AddNewListTodo = ({selectindex, onAddNewListTodo }) => {
  const handleClick = e => {
      onAddNewListTodo(e.target.value)
  }

  return (
    <Input
      type='button'
      onClick={handleClick}
      value='Click To add new Todo List'
    />
  )
}

const Input = styled.input`
  background: #3b4049;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 18px;
  font-size: 24px;
  height: 56px;
  width: 536px;
  margin-bottom: 16px;

  &::placeholder {
    color: #8d96a8;
  }
`

export default AddNewListTodo
