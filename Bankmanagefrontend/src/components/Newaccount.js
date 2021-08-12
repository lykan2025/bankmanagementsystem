import React,{Component} from 'react';
import {connect} from "react-redux";
import {accountcreateAction,clear_account_create_status} from "../store/actions/actions";

class Newaccount extends Component
{
    state={
        type:"saving"
    }

    buttonclick(e)
    {
        e.preventDefault()
        const data=new FormData();
        data.append("type",this.state.type);
        data.append("accountholder",this.props.accountholderid);
        this.props.accountcreateAction(data)
    }


    render()
    {
        return(
            <div className="login-form">
                <form>
                <h4 className="text-center">Create new account here</h4>
                <div className="form-group">
                    <b>Select account type:</b>
                    <p>
                        <select onChange={(e)=>this.setState({type:e.target.value})}>
                        <option>saving</option>
                        <option>current</option>
                        <option>salary</option>
                        </select>
                    </p>
                </div>
                <div className="form-group">
                    <button type="submit" 
                    className="btn btn-secondary btn-lg btn-block"
                    onClick={(e)=>(this.buttonclick(e))}>
                        <h5>create</h5>
                    </button>
                </div>
                    {this.props.account_create_error ? 
                        <div className="text-danger text-lg">
                            {this.props.account_create_error}
                        </div>
                        :
                        null
                        
                    }
                    {
                        this.props.create_messege? 
                        <div className="text-success text-lg">
                            {this.props.create_messege}
                        </div>
                        :
                        null
                    }
                
                </form>
            </div>
        )
    }
}

const mapStateToProps=(state)=>
{
    return {
        accountholderid:state.mainReducer.accountholderid,
        account_create_status:state.mainReducer.account_create_status,
        account_create_error:state.mainReducer.account_create_error,
        create_messege:state.mainReducer.create_messege
    }
}

const mapDispatchToProps=(dispatch)=>(
{
    accountcreateAction:(data)=>dispatch(accountcreateAction(data)),
    clear_account_create_status:()=>dispatch(clear_account_create_status()),
}
)

export default connect (mapStateToProps,mapDispatchToProps)(Newaccount)