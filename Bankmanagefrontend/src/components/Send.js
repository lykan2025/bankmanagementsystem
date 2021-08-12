import React,{Component} from 'react';
import {connect} from "react-redux";
import {sendAction} from "../store/actions/actions"

class Send extends Component
{
    state={
        rec_account_number:"",
        amount:""
    }

    buttonclick(e)
    {
        e.preventDefault()
        const data=new FormData();
        data.append("sender_account_number",this.props.selected_account['account_number']);
        data.append("rec_account_number",this.state.rec_account_number);
        data.append("amount",this.state.amount);
        data.append("accountholder",this.props.accountholderid);
        this.props.sendAction(data)
    }

    // componentDidUpdate(prevProps,prevState)
    // {
    //     if(this.props.user_accounts && this.props.user_accounts.length)
    //     {
    //          this.props.user_accounts.forEach(element=>{

    //             if(element.type===this.props.selected_account.type)
    //             {
    //                 if(element.balance!==this.state.selected_account.balance)
    //                 {
    //                     let temp_arr=[]
    //                     temp_arr=this.props.user_accounts.filter(e=>(JSON.stringify(e)!==JSON.stringify(element)))
    //                     let temp_dict={}
    //                     temp_dict=element
    //                     temp_dict['balance']=this.state.selected_account.balance
    //                     temp_arr.push(temp_dict)
    //                     this.props.user_accounts_update(temp_arr)
    //                 }
    //             }
                
    //         });
    //     }
    // }

    render()
    {
        return(
            <div className="login-form">
                <form>
                <div className="form-group">
                       <input 
                       type="number" 
                       className="form-control" 
                       name="account_number"
                       onChange={(e)=>this.setState({rec_account_number:e.target.value})}
                       placeholder="Enter account number"
                       required="required"
                       />
                </div>
                <div className="form-group">
                       <input 
                       type="number" 
                       className="form-control" 
                       name="amount"
                       onChange={(e)=>this.setState({amount:e.target.value})}
                       placeholder="Enter amount to send"
                       required="required"
                       />
                </div>
                <div className="form-group">
                        <button type="submit" 
                        onClick={(e)=>(this.buttonclick(e))}
                        className="btn btn-secondary btn-lg">
                            Send
                        </button>
                </div>
                    {this.props.send_error ? 
                        <div className="text-danger text-lg">
                            {this.props.send_error}
                        </div>
                        :null
                    }
                    {this.props.send_messege ? 
                        <div className="text-success  text-lg">
                            {this.props.send_messege}
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
        accountholderid:state.mainReducer.accountholderid,
        send_error:state.mainReducer.send_error,
        selected_account:state.mainReducer.selected_account,
        user_accounts:state.mainReducer.user_accounts,
        send_messege:state.mainReducer.send_messege
    }
}

const mapDispatchToProps=(dispatch)=>
(
{
    sendAction:(data)=>dispatch(sendAction(data)),
}
)
export default connect (mapStateToProps,mapDispatchToProps)(Send)