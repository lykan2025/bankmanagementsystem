import React,{Component} from 'react';
import {connect} from "react-redux";
import {managerAction} from "../store/actions/actions";

class ManagerLogin extends Component
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
        this.props.managerAction(data)
    }
    componentDidUpdate(prevProps,prevState)
    {
        if(this.props.manager_login_status===true && prevProps.manager_login_status===false)
        {
            this.props.history.push({
                pathname:"/Manager"
            })
        }
        
    }
    render()
    {
        return(
           <div className="login-form">
               <form>
                   <h1 className="text-center">Admin Login</h1>
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
                            <b>login</b>
                        </button>
                    </div>
                    {this.props.manager_error ? 
                        <div className="text-danger text-uppercase">
                            {this.props.manager_error}
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
        manager_error:state.mainReducer.manager_error,
        manager_login_status:state.mainReducer.manager_login_status,
        manager:state.mainReducer.manager
    }
}

const mapDispatchToProps=(dispatch)=>(
{
    managerAction:(data)=>dispatch(managerAction(data)),
}
)

export default connect(mapStateToProps,mapDispatchToProps)(ManagerLogin)