import React, { Component } from 'react';
import uuid from 'uuid';
import './NewTodoForm.css';

class NewTodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    handleSubmit(evt) {
        evt.preventDefault();
        this.props.createTodo({ ...this.state, id: uuid(), completed: false });
        this.setState({ text: '' });
    }
    render() {
        return(
            <form className='NewTodoForm' onSubmit={this.handleSubmit}>
                <label htmlFor="text">New Todo</label>
                <input
                    id="text"
                    name="text"
                    type="text"
                    placeholder="New Todo"
                    value={this.state.text}
                    onChange={this.onChange} 
                />
                <button>Add Todo</button>
            </form>
        )
    }
}

export default NewTodoForm;