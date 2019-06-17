import React, { Component } from 'react'
import NewTodoFrom from './NewTodoForm';
import Todo from './Todo';
import './TodoList.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.toggleCompletion = this.toggleCompletion.bind(this);
    }
    create(newTodo) {
        this.setState({
            todos: [...this.state.todos, newTodo]
        });
    }
    update(id, updatedText) {
        const updatedTodos = this.state.todos.map(todo => {
            if (todo.id === id) {
                return {...todo, text: updatedText};
            } else {
                return todo;
            }
        });
        this.setState({ todos: updatedTodos });
    }
    remove(id) {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        });
    }
    toggleCompletion(id) {
        const updatedTodos = this.state.todos.map(todo => {
            if (todo.id === id) {
                return {...todo, completed: !todo.completed};
            } else {
                return todo;
            }
        });
        this.setState({ todos: updatedTodos });
    }
    render() {
        const todos = this.state.todos.map(todo =>
            <CSSTransition key={todo.id} timeout={500} classNames='todo'>
                <Todo 
                    key={todo.id} 
                    id={todo.id} 
                    todoText={todo.text}
                    completed={todo.completed}
                    updateTodo={this.update} 
                    removeTodo={this.remove}
                    toggleTodo={this.toggleCompletion} 
                />
            </CSSTransition> 
        );
        return (
            <div className='TodoList'>
                <h1>Todo List</h1>
                <NewTodoFrom createTodo={this.create} />
                <ul>
                    <TransitionGroup className='todo-list'>{todos}</TransitionGroup>
                </ul>
            </div>
        )
    }
}

export default TodoList;