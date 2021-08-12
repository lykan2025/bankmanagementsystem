import React,{Component} from 'react';
import {connect} from "react-redux";
import {logsheetAction} from "../store/actions/actions"

class Sheet extends Component
{
    componentDidMount()
    {
        const data=new FormData()
        data.append("account_number",this.props.selected_account.account_number)
        console.log(data)
        this.props.logsheetAction(data);
        console.log(this.props.account_logs)
    }
    render()
    {
        return(
            <div>
                <table class="table table-bordered mx-auto w-auto">
                    {
                        this.props.account_logs.length ? 
                    <tbody>
                        <tr>
                            <td><h4>Description</h4></td>
                            <td><h4>Date Time</h4></td>
                            <td><h4>Credit</h4></td>
                            <td><h4>Debit</h4></td>
                            <td><h4>Total</h4></td>
                        </tr>
                        {
                            this.props.account_logs.map((id)=>
                            (
                                <tr>
                                    <td>{id.description}</td>
                                    <td>{id.datetime}</td>
                                    <td>{id.credit}</td>
                                    <td>{id.debit}</td>
                                    <td>{id.total}</td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                     :""}
                </table>
            </div>
        )
    }
}

const mapStateToProps=(state)=>
{
    return {
        login_status:state.mainReducer.login_status,
        account_logs:state.mainReducer.account_logs,
        selected_account:state.mainReducer.selected_account
    }
}

const mapDispatchToProps=(dispatch)=>
(
{
    logsheetAction:(data)=>dispatch(logsheetAction(data)),
}
)
export default connect (mapStateToProps,mapDispatchToProps)(Sheet)