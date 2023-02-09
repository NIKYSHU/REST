import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameProject: '',
            linkRepo: '',
            userProject: []
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

    handleChangeUser(event) {
        if (!event.target.selectedOptions) {
            this.setState(
                {
                    'userProject': []
                }
            )
            return
        }
        let userProject = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            userProject.push("http://127.0.0.1:8000/api/users/" + event.target.selectedOptions.item(i).value + "/")
        }
        console.log(userProject)
        this.setState(
            {
                'userProject': userProject
            }
        )
    }

    /* метод, который проверяет сохранились данные из формы в состояние или нет + отменяет
    * отправку формы */

    handleSubmit(event) {
        this.props.createProject(this.state.nameProject, this.state.linkRepo, this.state.userProject)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>

                <div className='form-group'>
                    <label htmlFor='login'>Name project</label>
                    <input type='text' className='form-control' name='nameProject' value={this.state.nameProject}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className='form-group'>
                    <label htmlFor='project'>Link repo</label>
                    <input type='text' className='form-control' name='linkRepo' value={this.state.linkRepo}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className='form-group'>
                    <label htmlFor='user'>User project</label>
                    {/*<input type='number' className='form-control' name='userProject' value={this.state.userProject}*/}
                    {/*       onChange={(event) => this.handleChange(event)}/>*/}
                    <select name='userProject' multiple onChange={(event) => this.handleChangeUser(event)}>
                        {this.props.users.map((item) => <option value={item.id}>{item.username}</option> )}
                    </select>
                </div>
                <input type='submit' className='btn btn-primary' value='Save' />
            </form>
        )
    }

}

export default ProjectForm