import React, { Component } from 'react';
import './Todo.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            text: this.props.todoText
        };
        this.toggleForm = this.toggleForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleRemove() {
        this.props.removeTodo(this.props.id);
    }
    toggleForm() {
        this.setState({ isEditing: !this.state.isEditing })
    }
    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    handleUpdate(evt) {
        evt.preventDefault();
        this.props.updateTodo(this.props.id, this.state.text);
        this.setState({ isEditing: false });
    }
    handleToggle(evt) {
        this.props.toggleTodo(this.props.id);
    }
    render() {
        let result;
        if (this.state.isEditing) {
            result = (
                <CSSTransition key='editing' timeout={500} classNames='form'>
                    <form className='Todo-edit-form' onSubmit={this.handleUpdate}>
                        <input
                            type='text'
                            name="text" 
                            onChange={this.onChange}
                            value={this.state.text} 
                        />
                        <button>Save</button>
                    </form>
                </CSSTransition>
            );
        } else {
            result = (
                <CSSTransition key='normal' timeout={500} classNames='task-text'>
                    <li className='Todo-task' onClick={this.handleToggle}>
                        {this.props.todoText}
                    </li>
                </CSSTransition>
            )
        }
        return(
            <TransitionGroup>
                {result}
                <div className='Todo-buttons'>
                    <button onClick={this.toggleForm}>
                        <i className='fas fa-pen' />
                    </button>
                    <button onClick={this.handleRemove}>
                        <i className='fas fa-trash' />
                    </button>
                </div>
            </TransitionGroup>
        );
    }
}

export default Todo;