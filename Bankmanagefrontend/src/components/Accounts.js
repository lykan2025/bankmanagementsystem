import React,{Component} from 'react';
import {connect} from "react-redux";
import {selected_account_action,deleteAction,user_accounts_update} from "../store/actions/actions"

class Accounts extends Component
{
    state={
        account_choose:"",
        available_types:[],
        selected_account:{}
    }

    sheetbuttonclick(e)
    {
        e.preventDefault()
        this.props.history.push({
            pathname:"/Sheet"
        })
        
    }

    depositmoney(e)
    {
        e.preventDefault()
        this.props.history.push({
            pathname:"/Deposit"
        })
    }

    withdrawmoney(e)
    {
        e.preventDefault()
        this.props.history.push({
            pathname:"/Withdraw"
        })
    }

    sendmoney(e)
    {
        e.preventDefault()
        this.props.history.push({
            pathname:"/Send"
        })
    }

    deleteaccount(e)
    {
        e.preventDefault()
        const data=new FormData()
        data.append("account_number",this.state.selected_account['account_number']);
        data.append("mobile_number",this.props.mobile_number)
        if(this.props.user_accounts.length>1)
        {
            this.props.user_accounts.forEach(element=>{
        
                if(element.account_number!==this.state.selected_account['account_number'])
                {
                    this.setState({selected_account:element})
                    this.props.selected_account_action(element)
                    this.setState({account_choose:element.type})
                }
            });
        }
        this.props.deleteAction(data);

    }

    componentDidUpdate(prevProps,prevState)
    {
        // console.log(this.props.user_accounts,prevProps.user_accounts)

        if(this.props.user_accounts.length && (prevState.account_choose!==this.state.account_choose))
        {
            this.props.user_accounts.forEach(element=>{
        
                if(element.type===this.state.account_choose)
                {
                    this.setState({selected_account:element})
                    this.props.selected_account_action(element)
                }
            });
        }
        
        
        if(this.props.user_accounts.length && (prevProps.user_accounts.length!==this.props.user_accounts.length))
        {
            // console.log("inside")

            let temp=[] 
            this.props.user_accounts.forEach(element=>{
                
                
                if(!(temp.includes(element.type)))
                {
                    temp.push(element.type)
                }
                
                this.setState({available_types:temp})

            });
        }

         


    }
    componentDidMount()
    {
    // console.log(this.props.history)
        

        if(this.props.user_accounts.length && 
            (this.state.selected_account==={}||this.state.selected_account.type!==this.state.account_choose)
            
            )

        {
            this.props.user_accounts.forEach(element=>{
                let temp=[] 
                temp=this.state.available_types
                temp.push(element.type)
                this.setState({available_types:temp})
                if(element.type===this.state.account_choose)
                {
                    this.setState({selected_account:element})
                    this.props.selected_account_action(element)
                }
                
            });
        }

        if(this.props.user_accounts.length)
        {
            
            this.props.user_accounts.forEach(element=>{
                let temp=[] 
                temp=this.state.available_types
                temp.push(element.type)
                this.setState({available_types:temp})
                if(element.type===this.state.selected_account.type)
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


        if(this.props.selected_account && this.props.selected_account!==this.state.selected_account)
        {
            this.setState({selected_account:this.props.selected_account,account_choose:this.props.selected_account.type})
        }
        
    }
    
    render()
    {
        return(
            <div>
                {
                    this.props.user_accounts.length && this.state.account_choose!=="Select Account"?
                    <div>
                        <div className="select">
                            <select value={this.state.account_choose}
                                onChange={(e)=>this.setState({account_choose:e.target.value})}>
                                <option>Select Account</option>
                                {this.state.available_types.includes("saving")?<option>saving</option>:""}
                                {this.state.available_types.includes("current")?<option>current</option>:""}
                                {this.state.available_types.includes("salary")?<option>salary</option>:""}
                            </select>
                        </div>
                            { this.state.account_choose?
                            <table className="table table-bordered mx-auto w-auto">
                                <tbody>
                                    <tr>
                                        <td><h4>Account number</h4></td>
                                        <td><h4>{this.state.selected_account.account_number}</h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4>Account type</h4></td>
                                        <td><h4>{this.state.selected_account.type}</h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4>Account balance</h4></td>
                                        <td><h4>{this.state.selected_account.balance}</h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4>Account created</h4></td>
                                        <td><h4>{this.state.selected_account.created}</h4></td>
                                    </tr>
                                    </tbody>
                                </table>:
                                        ""
                                        }
                        </div>
                        :
                            <div>
                            {
                                this.props.user_accounts.length===0?
                                    <p>You dont have account</p>
                                    :   <select value={this.state.account_choose}
                                        onChange={(e)=>this.setState({account_choose:e.target.value})}>
                                        <option>Select Account</option>
                                        {this.state.available_types.includes("saving")?<option>saving</option>:""}
                                        {this.state.available_types.includes("current")?<option>current</option>:""}
                                        {this.state.available_types.includes("salary")?<option>salary</option>:""}
                                    </select>
                                }
                            </div>
                            }
                            {
                                this.state.account_choose && this.state.account_choose!=="Select Account" && this.props.user_accounts.length?
                                <div>
                                    <button type="submit"
                                    className="btn btn-dark btn-lg details"
                                    onClick={(e)=>(this.sheetbuttonclick(e))}>Details</button>
                                    <button type="submit"
                                    className="btn btn-success btn-lg deposit"
                                    onClick={(e)=>(this.depositmoney(e))}>Deposit</button>
                                    <button type="submit"
                                    className="btn btn-success btn-lg withdraw"
                                    onClick={(e)=>(this.withdrawmoney(e))}>Withdraw</button>
                                    <button type="submit"
                                    className="btn btn-primary btn-lg send"
                                    onClick={(e)=>(this.sendmoney(e))}>Send Money</button>
                                    <button type="submit"
                                    className="btn btn-danger btn-lg delete"
                                    onClick={(e)=>(this.deleteaccount(e))}>Delete Account</button>
                                </div>
                                :null
                            }
                </div>  
        )
    }
}
        

const mapStateToProps=(state)=>
{
    return {
        login_status:state.mainReducer.login_status,
        user_accounts:state.mainReducer.user_accounts,
        selected_account:state.mainReducer.selected_account,
        mobile_number:state.mainReducer.mobile_number
    }
}

const mapDispatchToProps=(dispatch)=>(
{
    selected_account_action:(data)=>dispatch(selected_account_action(data)),
    deleteAction:(data)=>dispatch(deleteAction(data)),
    user_accounts_update:(data)=>dispatch(user_accounts_update(data))
}
)

export default connect (mapStateToProps,mapDispatchToProps)(Accounts)


