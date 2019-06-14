import { Container } from 'unstated'

const defaultState = {
  list: [
      [],
      [
        {
          id: 1,
          completed: false,
          text: 'Read README'
        },
        {
          id: 2,
          completed: false,
          text: 'Add one todo'
        },
        {
          id: 3,
          completed: false,
          text: 'Add filters'
        },
        {
          id: 4,
          completed: false,
          text: 'Add multiple lists'
        },
        {
          id: 5,
          completed: false,
          text: 'Optional: add tests'
        }
    ]
  ],
  openindex:0,
  currentfilter:'All'
}

class TodosContainer extends Container {
  constructor (props) {
    super(props)

    this.state = this.readStorage()
  }

  readStorage () {
    if (window && window.localStorage) {
      const state = window.localStorage.getItem('appState')
      if (state) {
        const returnstate = JSON.parse(state)
        returnstate.openindex = 0
        returnstate.currentfilter = 'All'
        return returnstate
      }
    }

    return defaultState
  }

  syncStorage () {
    if (window && window.localStorage) {
      const state = JSON.stringify(this.state)
      window.localStorage.setItem('appState', state)
    }
  }

  getList () {
    return this.state.list
  }
  getOpenListIndex () {
    return this.state.openindex
  }
  getCurrentFilter () {
    return this.state.currentfilter
  }
  toggleComplete = async id => {
    const item = this.state.list[this.state.openindex].find(i => i.id === id)
    const completed = !item.completed

    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated
    await this.setState(state => {
      const list = state.list
      list[state.openindex] = state.list[state.openindex].map(item => {
        if (item.id !== id) return item
        return {
          ...item,
          completed
        }
      })
      return { list }
    })

    this.syncStorage()
    this.filterTodo()
  }

  createTodo = async text => {
    await this.setState(state => {
      const isCompleted = state.currentfilter == 'Completed' ? true : false
      const item = {
        completed: isCompleted,
        text,
        id: state.list[state.openindex].length + 1
      }
      if(state.openindex == 0){
        alert('Please select list first')
        return false
      }
      const list = this.readStorage().list
      list[state.openindex] = list[state.openindex].concat(item)
      return { list }
    })

    this.syncStorage()
    this.filterTodo()
  }

  filterTodo = async status => {
    await this.setState(state => {
      const currentfilter = status
      if(status == undefined)
        return false
      return {currentfilter}
    })
    await this.setState(state => {
      const readStorageList = this.readStorage().list.length == 0 ? defaultState : this.readStorage().list
      if(state.currentfilter == 'All'){
        const list = readStorageList
        return { list }
      }
      const list = state.list
      list[state.openindex] = readStorageList[state.openindex].filter(item => {
        return (state.currentfilter == 'Completed' && item.completed == true) ? true : (state.currentfilter == 'Active' && item.completed == false) ? true : false
      })
      return { list }
    })
  }

  createTodoList = async listindex => {
    await this.setState(state => {
      const list = this.readStorage().list;
      list[list.length] = Array()
      return { list }
    })
    this.syncStorage()
    this.filterTodo()
    alert('Successfully added new list!')
  }
  changeCurrentTodoList = async index => {
    await this.setState(state => {
      const openindex = (index == 'Select Todo List to display') ? 0 : parseInt(index)
      return { openindex }
    })
    this.filterTodo()
  }
}

export default TodosContainer
