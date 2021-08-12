import React,{Component} from 'react';
import {connect} from "react-redux";
import {signupAction,clear_signup_status} from "../store/actions/actions";

class Signup extends Component
{
    state={
        name:"",
        email:"",
        mobile:"",
        password:"",
        adhaar:"",
        pan:""
    }
    buttonclick(e)
    {
        e.preventDefault()
        const data=new FormData();
        data.append("name",this.state.name);
        data.append("email_address",this.state.email);
        data.append("mobile_number",this.state.mobile);
        data.append("password",this.state.password);
        data.append("Adhaar_number",this.state.adhaar);
        data.append("pancard_number",this.state.pan);
        this.props.signupAction(data);
    }
    componentDidUpdate(prevProps,prevState)
    {
        if(prevProps.signup_status===false && this.props.signup_status===true)
        {
            this.props.clear_signup_status();
            this.props.history.push({
                pathname: '/Login',
            })
        }
    }
    render()
    {
        return(
           <div className="login-form">
               <form>
                   <div className="form-group">
                       <input 
                       type="text" 
                       className="form-control" 
                       name="name"
                       onChange={(e)=>this.setState({name:e.target.value})}
                       placeholder="Enter your full name"
                       required="required"
                       />
                    </div>
                    <div className="form-group">
                       <input 
                       type="email"
                       className="form-control"
                       name="email"
                       onChange={(e)=>this.setState({email:e.target.value})}
                       pattern=".+@gmail.com"
                       placeholder="Enter your email address"
                       required="required"
                       />
                    </div>
                    <div className="form-group">
                        <input 
                        type="number"
                        className="form-control"
                        name="number"
                        onChange={(e)=>this.setState({mobile:e.target.value})}
                        placeholder="Enter your mobile number"
                        required="required"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={(e)=>this.setState({password:e.target.value})}
                        placeholder="Enter your password"
                        required="required"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="number"
                        className="form-control"
                        name="adhaar number"
                        onChange={(e)=>this.setState({adhaar:e.target.value})}
                        placeholder="Enter your adhaar number"
                        required="required"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="text"
                        className="form-control"
                        name="pancard number"
                        onChange={(e)=>this.setState({pan:e.target.value})}
                        placeholder="Enter your pancard number"
                        required="required"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" 
                        onClick={(e)=>(this.buttonclick(e))}
                        className="btn btn-secondary btn-lg btn-block">
                            <h5>sign up</h5>
                        </button>
                    </div>
                    {this.props.signup_error ? 
                        <div className="text-danger text-uppercase">
                            {this.props.signup_error}
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
        signup_error:state.mainReducer.signup_error,
        signup_status:state.mainReducer.signup_status
    }
}

const mapDispatchToProps=(dispatch)=>(
{
    signupAction:(data)=>dispatch(signupAction(data)),
    clear_signup_status:()=>dispatch(clear_signup_status()),
}
)

export default connect(mapStateToProps,mapDispatchToProps)(Signup)