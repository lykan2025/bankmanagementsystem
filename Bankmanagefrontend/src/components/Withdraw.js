import React,{Component} from 'react';
import {connect} from "react-redux";
import {withdrawAction} from "../store/actions/actions"

class Withdraw extends Component
{
    state={
        amount:""
    }

    buttonclick(e)
    {
        e.preventDefault()
        const data=new FormData();
        data.append("account_number",this.props.selected_account['account_number']);
        data.append("amount",this.state.amount);
        data.append("accountholder",this.props.accountholderid);
        this.props.withdrawAction(data)

       
    }

    componentDidUpdate(prevProps,prevState)
    {
        if(this.props.user_accounts && this.props.user_accounts.length)
        {
            this.props.user_accounts.forEach(element=>{

                if(element.type===this.props.selected_account.type)
                {
                    if(element.balance!==this.state.selected_account.balance)
                    {
                        let temp_arr=[]
                        temp_arr=this.props.user_accounts.filter(e=>(JSON.stringify(e)!==JSON.stringify(element)))
                        let temp_dict={}
                        temp_dict=element
                        temp_dict['balance']=this.state.selected_account.balance
                        temp_arr.push(temp_dict)
                        this.props.user_accounts_update(temp_arr)
                    }
                }
                
            });
        }
    }

    render()
    {
        return(
            <div className="login-form">
                <form>
                <div className="form-group">
                       <input 
                       type="number" 
                       className="form-control" 
                       name="amount"
                       onChange={(e)=>this.setState({amount:e.target.value})}
                       placeholder="Enter amount to withdraw"
                       required="required"
                       />
                </div>
                <div className="form-group">
                        <button type="submit" 
                        onClick={(e)=>(this.buttonclick(e))}
                        className="btn btn-secondary btn-lg">
                            Withdraw
                        </button>
                </div>
                {this.props.withdraw_error ? 
                    <div className="text-danger text-uppercase text-lg">
                        {this.props.withdraw_error}
                    </div>
                    :null
                }
                {this.props.withdraw_messege ? 
                    <div className="text-success text-uppercase text-lg">
                        {this.props.withdraw_messege}
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
        login_status:state.mainReducer.login_status,
        account_logs:state.mainReducer.account_logs,
        withdraw_error:state.mainReducer.withdraw_error,
        accountholderid:state.mainReducer.accountholderid,
        selected_account:state.mainReducer.selected_account,
        withdraw_messege:state.mainReducer.withdraw_messege
    }
}

const mapDispatchToProps=(dispatch)=>
(
{
    withdrawAction:(data)=>dispatch(withdrawAction(data)),
   
}
)
export default connect (mapStateToProps,mapDispatchToProps)(Withdraw)