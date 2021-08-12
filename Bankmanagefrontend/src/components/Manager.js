import React,{Component} from 'react';
import {connect} from "react-redux";


class Manager extends Component
{
    render()
    {
        return(
           <div>
               <table class="table table-bordered mx-auto w-auto"> 
                    <thead>
                        <tr>
                            <td><h4>Name</h4></td>
                            <td><h4>Email Address</h4></td>
                            <td><h4>Mobile number</h4></td>
                            <td><h4>User Accounts</h4></td>
                        </tr> 
                    </thead>

                        {
                            this.props.client_accounts.map((client)=>
                            (
                                <tbody>
                                    {
                                    client.user_accounts.map((account,i)=>
                                        <tr>
                                            {i===0?
                                                <td rowSpan={client.user_accounts?client.user_accounts.length.toString():"0"}><h4>{client.name}</h4></td>
                                            :null}
                                            {i===0?
                                                <td rowSpan={client.user_accounts?client.user_accounts.length.toString():"0"}><h4>{client.email_address}</h4></td>
                                            :null}
                                            {i===0?
                                                <td rowSpan={client.user_accounts?client.user_accounts.length.toString():"0"}><h4>{client.mobile_number}</h4></td>
                                                :null}
                                            <td><h4>{account.type}</h4></td>
                                        </tr>
                                        )
                                    }
                                </tbody>
                            ))
                        }
                    
                </table>
               
           </div>
           
        )
               
    }
}

const mapStateToProps=(state)=>
{
    return {
        login_error:state.mainReducer.login_error,
        client_accounts:state.mainReducer.client_accounts,
        manager_login_status:state.mainReducer.manager_login_status
    }
}



export default connect(mapStateToProps)(Manager)