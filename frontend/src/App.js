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
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie";

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

/* Делаем запросы на бек (добавляем токен headers вторым параметром) */

    loadData() {
        const headers = this.getHeaders()
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
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

        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
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

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
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

/* Этот код выполняется каждый раз, когда запускается сервер (делает запросы на сервер + достает токен из cookies и
* определяет авторизирован пользователь или нет) */

    componentDidMount() {
        this.getTokenFromStorage()
    }

/* Этот метод создает и получает токен авторизации */

    getToken(username, password) {
        axios.post('http://127.0.0.1:8000/api_token/', {username: username, password: password})
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

/* Этот метод добавляет токен в headers, если пользователь авторизирован */

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.isAuthenticated()){
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

/* Этот метод проверяет авторизирован пользователь или нет */

    isAuthenticated() {
        return this.state.token !== ''
    }

/* Этот метод будет обнулять токен в cookies */

    logout() {
        this.setToken('')
    }

/* Считывает токен из cookies и записывает его состояние (нужен, когда мы снова открываем страницу сайта) */

    getTokenFromStorage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token':token}, ()=>this.loadData())
    }

/* Эта функция создает и возвращает верстку js */

    render() {
        return (
            <div>
                <BrowserRouter>
                    <MenuItem parentComponent={this}/>
                    <Routes>
                        <Route path='/' element={<UsersList users={this.state.users}/>}/>
                        <Route path='/todo' element={<NotesList notes={this.state.notes}/>}/>
                        <Route path='/projects' element={<ProjectsList projects={this.state.projects}/>}/>
                        <Route path='/login' element={<LoginForm
                            getToken={(username, password) => this.getToken(username, password)}/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Routes>
                    <FooterItem/>
                </BrowserRouter>
            </div>
        )
    }
}


export default App;

