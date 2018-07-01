import React, { Component } from 'react';
import TodoTemplate from './components/TodoTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';


class App extends Component {
  id = 3 // 이미 0,1,2 가 존재하므로 3으로 설정

  state = {
    input: '',
    todos: [
      { id: 0, text: 'HI', checked: false },
      { id: 1, text: 'React', checked: true },
      { id: 2, text: 'Haha', checked: false }
    ]
  };

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    }); 
  }

  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: '',
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const nextTodos = [...todos];

    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    }

    this.setState({
      todos: nextTodos
    });
  }


  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle
    } = this;

    return (
      <TodoTemplate form={(
        <Form 
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />)}>
        <TodoItemList todos={todos} onToggle={handleToggle}/>
      </TodoTemplate>
    );
  }
}

export default App;