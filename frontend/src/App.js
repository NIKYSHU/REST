import React from "react";
import './logo.svg';
import './App.css';
import UsersList from './components/Users.js';
import NotesList from './components/Todo.js';
import ProjectsList from "./components/Projects.js";
import axios from "axios";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFound from "./components/NotFound";
import MenuItem from "./components/Menu";
import FooterItem from "./components/Footer";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'notes': [],
            'projects': [],
        }

    }

    componentDidMount() {

        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users.results,
                    }
                )

            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/')
            .then(response => {
                const notes = response.data
                this.setState(
                    {
                        'notes': notes.results,
                    }
                )

            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects.results,
                    }
                )

            }).catch(error => console.log(error))

    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <MenuItem/>
                    <Routes>
                        <Route path='/' element={<UsersList users={this.state.users}/>}/>
                        <Route path='/todo' element={<NotesList notes={this.state.notes}/>}/>
                        <Route path='/projects' element={<ProjectsList projects={this.state.projects}/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Routes>
                    <FooterItem/>
                </BrowserRouter>
            </div>
        )
    }
}


export default App;

