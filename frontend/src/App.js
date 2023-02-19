import React from "react";
import './logo.svg';
import './App.css';
import UsersList from './components/Users.js';
import ProjectsList from "./components/Projects.js";
import axios from "axios";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFound from "./components/NotFound";
import MenuItem from "./components/Menu";
import FooterItem from "./components/Footer";
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie";
import TodosList from "./components/Todo.js";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";

/* создаем класс (обьект, компонент) с состоянием (информация).
Тут будет храниться инфа и передаваться в др. компоненты */

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'notes': [],
            'projects': [],
            'token': ''
        }

    }

    /* Этот метод проверяет авторизирован пользователь или нет */

    isAuthenticated() {
        return this.state.token !== ''
    }

    /* Этот метод добавляет токен в headers, если пользователь был ранее авторизирован */

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.isAuthenticated()){
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    /* Делаем запросы на бек (добавляем токен headers вторым параметром) */

    loadData() {
        const headers = this.getHeaders()
        axios.get('http://95.163.242.243:80/api/users/', {headers})
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users.results,
                    }
                )

            }).catch(error => {
                console.log(error)
                this.setState({users: []})
        })

        axios.get('http://95.163.242.243:80/api/todo/', {headers})
            .then(response => {
                const notes = response.data
                this.setState(
                    {
                        'notes': notes.results,
                    }
                )

            }).catch(error => {
                console.log(error)
                this.setState({notes: []})
        })

        axios.get('http://95.163.242.243:80/api/projects/', {headers})
            .then(response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects.results,
                    }
                )

            }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    /* Считывает токен из cookies и записывает его состояние (если нам будет нужен токен, то не надо будет снова
    его получать у сервера) */

    getTokenFromStorage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token':token}, ()=>this.loadData())
    }

    /* Этот код выполняется каждый раз, когда запускается сервер (делает запросы на сервер + достает токен из cookies и
    * определяет авторизирован пользователь или нет) */

    componentDidMount() {
        this.getTokenFromStorage()
    }

    /* Этот метод создает и получает токен авторизации */

    getToken(username, password) {
        axios.post('http://95.163.242.243:80/api_token/', {username: username, password: password})
            .then(response => {
                this.setToken(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    }

    /* Этот метод принимает токен, устанавливает его в cookies и записывает состояние приложения */

    setToken(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.loadData())
    }

    /* Этот метод будет обнулять токен в cookies */

    logout() {
        this.setToken('')
    }

    /* Эта функция создает и возвращает верстку js */

    deleteProject(id) {
        const headers = this.getHeaders()
        axios.delete(`http://95.163.242.243:80/api/projects/${id}/`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
    }

    /* Этот метод создает новый проект */

    createProject(name, link, users) {
        const headers = this.getHeaders()
        const data = {name_project: name, link_repo: link, users_project: users}
        axios.post('http://95.163.242.243:80/api/projects/', data, {headers})
            .then(response => {
                this.loadData()
            }).catch(error => console.log(error))
    }

    /* Этот метод удаляет заметку */

    deleteTodo(id) {
        const headers = this.getHeaders()
        axios.delete(`http://95.163.242.243:80/api/todo/${id}/`,{headers})
            .then(response => {
                this.setState({notes: this.state.notes.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
    }

    createTodo(text, active_note, project, user) {
        const headers = this.getHeaders()
        const data = {text_note: text, active_note: active_note, project_id: project, user_note: user}
        axios.post('http://95.163.242.243:80/api/todo/', data, {headers})
            .then(response => {
                this.loadData()
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <MenuItem parentComponent={this}/>
                    <Routes>
                        <Route path='/' element={<UsersList users={this.state.users}/>}/>
                        <Route path='/todo' element={<TodosList notes={this.state.notes}
                                                                deleteTodo={(id) => this.deleteTodo(id)}/>}/>
                        <Route path='/projects' element={<ProjectsList projects={this.state.projects}
                                                                       deleteProject={(id) => this.deleteProject(id)}/>}/>
                        <Route path='/login' element={<LoginForm
                            getToken={(username, password) => this.getToken(username, password)}/>}/>
                        <Route path='*' element={<NotFound/>}/>
                        <Route path='/projects/create' element={<ProjectForm users={this.state.users} createProject={(name, link, users) =>
                            this.createProject(name, link, users)}/>}/>
                        <Route path='/todo/create' element={<TodoForm project={this.state.projects} users={this.state.users} createTodo={(text, active_note, project, user) =>
                            this.createTodo(text, active_note, project, user)}/>}/>
                    </Routes>
                    <FooterItem/>
                </BrowserRouter>
            </div>
        )
    }
}


export default App;

