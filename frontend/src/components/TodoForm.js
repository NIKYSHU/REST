import React from "react";

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textNote: '',
            activeNote: false,
            projectNote: null,
            userNote: null
        }
    }

    /* метод, который сохраняет в состояние введеные данные формы */

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    /* метод, который проверяет сохранились данные из формы в состояние или нет + отменяет
    * отправку формы */

    handleSubmit(event) {
        this.props.createTodo(this.state.textNote, this.state.activeNote, this.state.projectNote, this.state.userNote)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>

                <div className='form-group'>
                    <label htmlFor='text'>Text</label>
                    <input type='text' className='form-control' name='textNote' value={this.state.textNote}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className='form-group'>
                    <label htmlFor='active'>Active</label>
                    <input type='checkbox' className='form-control' name='activeNote' value='true'
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className='form-group'>
                    <label htmlFor='projectNote'>Project</label>
                    <select name='projectNote' multiple onChange={(event) => this.handleChange(event)}>
                        {this.props.project.map((item) => <option value={item.id}>{item.name_project}</option>)}
                        {/*{this.props.project.map((item) => <option value={item.id}>{item.id}</option> )}*/}
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor='userNote'>User</label>
                    <select name='userNote' multiple onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                        {/*{this.props.project.map((item) => <option value={item.id}>{item.id}</option> )}*/}
                    </select>
                </div>

                <input type='submit' className='btn btn-primary' value='Save'/>
            </form>
        )
    }

}

export default TodoForm