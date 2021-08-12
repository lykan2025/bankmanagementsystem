import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
import {connect} from "react-redux";


class Navigation extends Component
{

    render()
    {
        return(
            <Navbar className="avadhut" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="d-inline p-3 avadhut more text-decoration-none" to="/">
                            <b>Welcome</b>
                        </NavLink>
                        {
                            this.props.login_status || this.props.manager_login_status?null:
                            <NavLink className="d-inline p-3 avadhut more text-decoration-none" to="/Signup">
                                Sign up
                            </NavLink>
                        }
                        {
                           this.props.login_status && this.props.manager_login_status===false ? 
                           <NavLink className="d-inline p-3 avadhut more text-decoration-none" to="/Accounts">
                                My Accounts
                            </NavLink>
                            : this.props.login_status===false &&this.props.manager_login_status===false ?
                            <NavLink className="d-inline p-3 avadhut more text-decoration-none" to="/Login">
                                Login
                            </NavLink>
                            :null
                        }
                        {
                           this.props.login_status && this.props.manager_login_status===false ? 
                           <NavLink className="d-inline p-3 avadhut more text-decoration-none" to="/Newaccount">
                                New Account
                            </NavLink>
                            : null
                        }
                        {
                            this.props.manager_login_status===false && this.props.login_status===false?
                            <NavLink className="d-inline p-3 avadhut more text-decoration-none" to="/ManagerLogin">
                                Manager Login
                            </NavLink>
                            : this.props.login_status===false && this.props.manager_login_status ?
                            <NavLink className="d-inline p-3 avadhut more text-decoration-none" to="/Manager">
                                Admin
                            </NavLink>
                            :null
                        }
                        {
                            this.props.manager_login_status || this.props.login_status ?
                            <NavLink className="d-inline p-3 avadhut more text-decoration-none" to="/Login">
                                Logout
                            </NavLink>
                            :""
                            
                        }
                                            
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps=(state)=>
{
    return {
        signup_status:state.mainReducer.signup_status,
        login_status:state.mainReducer.login_status,
        user_accounts:state.mainReducer.user_accounts,
        manager:state.mainReducer.manager,
        manager_login_status:state.mainReducer.manager_login_status
    }
}


export default connect (mapStateToProps)(Navigation)





    

