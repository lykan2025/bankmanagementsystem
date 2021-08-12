import React,{Component} from 'react';
import './App.css';
import Welcome from './components/Welcome'
import Signup from './components/Signup'
import Login from './components/Login'
import Navigation from './components/Navigation'
import Newaccount from './components/Newaccount'
import Accounts from './components/Accounts'
import Sheet from './components/Sheet'
import Deposit from './components/Deposit'
import Withdraw from './components/Withdraw'
import Send from './components/Send'
import Manager from './components/Manager'
import ManagerLogin from './components/ManagerLogin'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

class App extends Component
{
    render()
    {
        return(
            <BrowserRouter>
            <Navigation/>
            <Switch>
                <Route path='/' component={Welcome} exact/>
                <Route path='/Signup' component={Signup}/>
                <Route path='/Login' component={Login}/>
                <Route path='/Accounts' component={Accounts}/>
                <Route path='/Newaccount' component={Newaccount}/>
                <Route path="/Sheet" component={Sheet}/>
                <Route path="/Deposit" component={Deposit}/>
                <Route path="/Withdraw" component={Withdraw}/>
                <Route path="/Send" component={Send}/>
                <Route path="/Manager" component={Manager}/>
                <Route path="/ManagerLogin" component={ManagerLogin}/>
            </Switch>
            </BrowserRouter>
        )
    }
}


export default App;
