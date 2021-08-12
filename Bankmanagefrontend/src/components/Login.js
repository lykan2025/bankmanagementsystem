import React,{Component} from 'react';
import {connect} from "react-redux";
import {loginAction,logoutAction} from "../store/actions/actions";

class Login extends Component
{
    state={
        username:"",
        password:""
    }

    buttonclick(e)
    {
        e.preventDefault()
        const data=new FormData();
        data.append("username",this.state.username);
        data.append("password",this.state.password);
        this.props.loginAction(data)
    }
    componentDidUpdate(prevProps,prevState)
    {
        if(prevProps.login_status===false && this.props.login_status===true )
        {
            this.props.history.push({
                pathname:"/Accounts"
            })
        }
        
    }

    componentDidMount()
    {
        if((this.props.login_status || this.props.manager_login_status) && !(this.props.login_error))
        {
            this.props.logoutAction();
        }
    }


    render()
    {
        return(
           <div className="login-form">
               <form>
                   <h1 className="text-center">Login here</h1>
                   <div className="form-group">
                       <input 
                       type="text" 
                       className="form-control" 
                       name="mobile number or email address"
                       onChange={(e)=>this.setState({username:e.target.value})}
                       placeholder="mobile number or email address"
                       required="required"
                       />
                    </div>
                    <div className="form-group">
                       <input 
                       type="password"
                       className="form-control"
                       name="password"
                       onChange={(e)=>this.setState({password:e.target.value})}
                       placeholder="password"
                       required="required"
                       />
                    </div>
                    <div className="form-group">
                        <button type="submit"
                        onClick={(e)=>(this.buttonclick(e))}
                        className="btn btn-secondary btn-lg btn-block">
                            <h5>login</h5>
                        </button>
                    </div>
                    
                    {this.props.login_error ? 
                        <div className="text-danger text-lg">
                            {this.props.login_error}
                        </div>
                        :null
                    }


               </form>
           </div>
        )
    }
}

const mapStateToProps=(state)=>
{
    return {
        login_error:state.mainReducer.login_error,
        login_status:state.mainReducer.login_status,
        user_accounts:state.mainReducer.user_accounts,
        manager_login_status:state.mainReducer.manager_login_status
    }
}

const mapDispatchToProps=(dispatch)=>(
{
    loginAction:(data)=>dispatch(loginAction(data)),
    logoutAction:()=>dispatch(logoutAction())
}
)

export default connect(mapStateToProps,mapDispatchToProps)(Login)