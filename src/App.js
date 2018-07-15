import cx from 'classnames';
import React, { Component } from 'react';

let index = 0;

const TodoForm = ({addTodo}) => {
	let input;
  
	return (
	  <div>
		<input ref={node => {
		  input = node;
		}} />
		<button onClick={() => {
		  addTodo(input.value);
		  input.value = '';
		}}>
		  Add
		</button>
	  </div>
	);
  };
  
const Todo = ({todo, clickTodo}) => {
	return (<li onClick={() => clickTodo(todo.id)} className={cx({ 'is-done': todo.done})}>{todo.text}</li>);
}
  
const TodoLists = ({todos, clickTodo}) => {
	const todoNode = todos.map((todo) => {
		return (<Todo todo={todo} key={todo.id} clickTodo={clickTodo}/>)
	});
	return (<ul>{todoNode}</ul>);
}

class App extends Component {
  	constructor(props){
		super(props);
		this.state = {
			data: []
		}
	}
	  
	addTodo = val => {
		// to prevent from empty string
        if (!val.trim()) {
          return
        }
        const todo = {text: val, id: index++, done: false}
        this.setState({data: [...this.state.data, todo]});
    }
    
    handleClickTodo = id => {
        const remainder = this.state.data.map(todo => {
			if(todo.id === id) {
				return {...todo, done: !todo.done};
			} else {
				return todo;
			}
        });
        this.setState({data: remainder});
    }

	render() {
		return (
			<div>
				<div>
					<h2>
						Todo List
					</h2>
					<TodoForm addTodo={this.addTodo}/>
					{`${this.state.data.filter(todo => todo.done === false).length} remaining out of ${this.state.data.length} tasks`}
					<TodoLists 
						todos={this.state.data} 
						clickTodo={this.handleClickTodo}
					/>
				</div>
				<style>{`
					.is-done {
					text-decoration: line-through;
					}
				`}</style>
			</div>
		);
	}
}

export default App;
