import React from 'react'
import { Provider, Subscribe } from 'unstated'

import styled from 'styled-components'

import TodosContainer from './store'

import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import FilterTodo from './components/FilterTodo'
import AddNewListTodo from './components/AddNewListTodo'
import TodoArrayList from './components/TodoArrayList'

function App () {
  return (
    <Provider>
      <Wrapper>
        <Subscribe to={[TodosContainer]}>
          {todos => {
            const list = todos.getList()
            const openindex = todos.getOpenListIndex()
            const currentfilter = todos.getCurrentFilter()
            return (
              <TodosWrapper>
                <AddNewListTodo selectindex={openindex} onAddNewListTodo={todos.createTodoList} />
                <TodoArrayList items={list} onTodoArrayList={todos.changeCurrentTodoList} />
                <AddTodo onAddTodo={todos.createTodo} />
                <FilterTodo currentfilter={currentfilter} onFilterTodo={todos.filterTodo}/>
                <TodoList items={list[openindex]}  toggleComplete={todos.toggleComplete} />
              </TodosWrapper>
            )
          }}
        </Subscribe>
      </Wrapper>
    </Provider>
  )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`

const TodosWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`

export default App
