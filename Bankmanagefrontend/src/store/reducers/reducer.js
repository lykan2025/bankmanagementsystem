import * as type from "../actions/type";

const initialState={
    user_accounts:[],
    signup_status:false,
    signup_error:"",
    login_status:false,
    login_error:"",
    account_create_status:false,
    selected_account:{},
    account_logs:[],
    deposit_error:"",
    withdraw_error:"",
    delete_messege:"",
    client_accounts:[],
    manager_error:"",
    manager_login_status:false,
    delete_status:false,
    mobile_number:0,
    send_error:"",
    account_create_error:"",
    create_messege:"",
    deposit_messege:"",
    withdraw_messege:"",
    send_messege:""
    
}

const mainReducer = (state=initialState,action) =>
{
    switch (action.type) {
          case type.SIGNUP_SUCCESS:
          return {
            ...state,
            signup_error: "",
            signup_status: true
          };
          case type.SIGNUP_FAILURE:
          return {
            ...state,
            signup_error: action.payload.error,
            signup_status: false
          };
          case type.LOGIN_SUCCESS:
          return{
            ...state,
            login_error:"",
            login_status:true,
            accountholderid:action.payload[0].id,
            mobile_number:action.payload[0].mobile_number,
            user_accounts:action.payload[0].user_accounts,
          };
          case type.LOGIN_FAILURE:
          return{
            ...state,
            login_error: action.payload.error,
            login_status: false,
            user_accounts:[]
          };
          case type.ACCOUNT_CREATE_SUCCESS:
              return{
                  ...state,
                  account_create_status:true,
                  user_accounts:action.payload.data,
                  account_create_error:"",
                  create_messege:action.payload.messege
              };
            case type.ACCOUNT_CREATE_FAILURE:
                return{
                    ...state,
                    account_create_status:false,
                    account_create_error:action.payload.error,
                    create_messege:""
                };
            case type.UPDATE_SELECTED_ACCOUNT:
                return{
                    ...state,
                    selected_account:action.payload.selected_account
                };
            case type.ACCOUNT_LOGS:
                return{
                    ...state,
                    account_logs:action.payload
                };
            case type.DEPOSIT_SUCCESS:
                return{
                    ...state,
                    deposit_error:"",
                    user_accounts:action.payload.data,
                    deposit_messege:action.payload.messege
                };
            case type.DEPOSIT_FAILURE:
                return{
                    ...state,
                    deposit_error:action.payload.error,
                    deposit_messege:""
                };
            case type.WITHDRAW_SUCCESS:
                return{
                    ...state,
                    withdraw_error:"",
                    user_accounts:action.payload.data,
                    withdraw_messege:action.payload.messege,
                };
            case type.WITHDRAW_FAILURE:
                return{
                    ...state,
                    withdraw_error:action.payload.error,
                    withdraw_messege:""
                };
            case type.SEND_SUCCESS:
                return{
                    ...state,
                    user_accounts:action.payload.data,
                    send_messege:action.payload.messege,
                    send_error:""
                };
            case type.SEND_FAILURE:
                return{
                    ...state,
                    send_error:action.payload.error,
                    send_messege:""
                }    
            case type.DELETE_SUCCESS:
                return{
                    ...state,
                    user_accounts:action.payload[0].user_accounts,
                    delete_status:true
                }
            case type.MANAGER_LOGIN_SUCCESS:
                return{
                    ...state,
                    client_accounts:action.payload,
                    manager_login_status:true,
                    manager_error:""
                }
            case type.MANAGER_LOGIN_FAILURE:
                return{
                    ...state,
                    manager_error:action.payload.error,
                    manager_login_status:false,
                    client_accounts:[]
                }
            case type.LOGOUT:
                return{
                    ...state,
                    manager_login_status:false,
                    login_status:false,
                    manager:[]
                }
            case type.UPDATE_USER_ACCOUNTS:
                return{
                    ...state,
                    user_accounts:action.payload.data
                }
          default:
          return state;
        }
}

export default mainReducer