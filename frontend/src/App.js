import React from "react";
import './logo.svg';
import './App.css';
import UsersList from './components/Users.js'
import axios from "axios";
import MenuItem from "./components/Menu";
import FooterItem from "./components/Footer";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {

        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users,
                        'menu': {'dsf': 'sss'},
                        'footer': {'sdfsf': 222}
                    }
                )
            }).catch(error => console.log(error))

        // const users = [
        //     {
        //         'first_name': 'Фёдор',
        //         'last_name': 'Достоевский',
        //         'email': 'sudoaptinstall@gmail.com',
        //         'username': 'ftdor'
        //     },
        //     {
        //         'first_name': 'Александр',
        //         'last_name': 'Грин',
        //         'email': 'get@gmail.com',
        //         'username': 'ffffdddd'
        //     },
        // ]
        // this.setState(
        //     {
        //         'users': users
        //     }
        // )

    }


    render() {
        return (
            <div>
                <MenuItem/>
                <UsersList users={this.state.users}/>
                <FooterItem/>
            </div>
        )
    }
}

export default App;

