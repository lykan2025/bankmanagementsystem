import * as action from "./type";
import * as utils from "../../utils/utils";
import * as api from "../../api/index";

const signupAction = (data) => {
    let Response = utils.ResponseActions(action.SIGNUP_SUCCESS, action.SIGNUP_FAILURE);
    let headers = new Headers();
    headers.append("X-CSRFToken", utils.getCSRFtoken());
    let option = {
      method: "POST",
      headers,
      body: data,
      credentials: "same-origin",
    };
    return (dispatch, getState) => {
      dispatch({
        type: "API",
        meta: {
          type: "API",
          payload: data,
          url: api.SIGNUP_API,
          options: option,
          successAction: Response.onSuccess,
          failureAction: Response.onFailure,
          extraParams: {},
        },
      });
    };
  };

  const loginAction = (data) => {
    let Response = utils.ResponseActions(action.LOGIN_SUCCESS, action.LOGIN_FAILURE);
    let headers = new Headers();
    headers.append("X-CSRFToken", utils.getCSRFtoken());
    let option = {
      method: "POST",
      headers,
      body: data,
      credentials: "same-origin",
    };
    return (dispatch, getState) => {
      dispatch({
        type: "API",
        meta: {
          type: "API",
          payload: data,
          url: api.LOGIN_API,
          options: option,
          successAction: Response.onSuccess,
          failureAction: Response.onFailure,
          extraParams: {},
        },
      });
    };
  };

const accountcreateAction = (data) => {
    let Response = utils.ResponseActions(action.ACCOUNT_CREATE_SUCCESS, action.ACCOUNT_CREATE_FAILURE);
    let headers = new Headers();
    headers.append("X-CSRFToken", utils.getCSRFtoken());
    let option = {
      method: "POST",
      headers,
      body: data,
      credentials: "same-origin",
    };
    return (dispatch, getState) => {
      dispatch({
        type: "API",
        meta: {
          type: "API",
          payload: data,
          url: api.ACCOUNT_CREATE_API,
          options: option,
          successAction: Response.onSuccess,
          failureAction: Response.onFailure,
          extraParams: {},
        },
      });
    };
  };

  const logsheetAction = (data) => {
    let Response = utils.ResponseActions(action.ACCOUNT_LOGS,action.ACCOUNT_LOGS);
    let headers = new Headers();
    headers.append("X-CSRFToken", utils.getCSRFtoken());
    let option = {
      method: "POST",
      headers,
      body: data,
      credentials: "same-origin",
    };
    return (dispatch, getState) => {
      dispatch({
        type: "API",
        meta: {
          type: "API",
          payload: data,
          url: api.SHEET_API,
          options: option,
          successAction: Response.onSuccess,
          failureAction: Response.onFailure,
          extraParams: {},
        },
      });
    };
  };

  const depositAction=(data)=>
  {
    let Response = utils.ResponseActions(action.DEPOSIT_SUCCESS,action.DEPOSIT_FAILURE);
    let headers = new Headers();
    headers.append("X-CSRFToken", utils.getCSRFtoken());
    let option = {
      method: "POST",
      headers,
      body: data,
      credentials: "same-origin",
    };
    return (dispatch, getState) => {
      dispatch({
        type: "API",
        meta: {
          type: "API",
          payload: data,
          url: api.DEPOSIT_API,
          options: option,
          successAction: Response.onSuccess,
          failureAction: Response.onFailure,
          extraParams: {},
        },
      });
    };
  };

  const sendAction=(data)=>
  {
    let Response = utils.ResponseActions(action.SEND_SUCCESS,action.SEND_FAILURE);
    let headers = new Headers();
    headers.append("X-CSRFToken", utils.getCSRFtoken());
    let option = {
      method: "POST",
      headers,
      body: data,
      credentials: "same-origin",
    };
    return (dispatch, getState) => {
      dispatch({
        type: "API",
        meta: {
          type: "API",
          payload: data,
          url: api.SEND_API,
          options: option,
          successAction: Response.onSuccess,
          failureAction: Response.onFailure,
          extraParams: {},
        },
      });
    };
  };

  const withdrawAction=(data)=>
  {
    let Response = utils.ResponseActions(action.WITHDRAW_SUCCESS,action.WITHDRAW_FAILURE);
    let headers = new Headers();
    headers.append("X-CSRFToken", utils.getCSRFtoken());
    let option = {
      method: "POST",
      headers,
      body: data,
      credentials: "same-origin",
    };
    return (dispatch, getState) => {
      dispatch({
        type: "API",
        meta: {
          type: "API",
          payload: data,
          url: api.WITHDRAW_API,
          options: option,
          successAction: Response.onSuccess,
          failureAction: Response.onFailure,
          extraParams: {},
        },
      });
    };
  };

  const managerAction = (data) => {
    let Response = utils.ResponseActions(action.MANAGER_LOGIN_SUCCESS, action.MANAGER_LOGIN_FAILURE);
    let headers = new Headers();
    headers.append("X-CSRFToken", utils.getCSRFtoken());
    let option = {
      method: "POST",
      headers,
      body: data,
      credentials: "same-origin",
    };
    return (dispatch, getState) => {
      dispatch({
        type: "API",
        meta: {
          type: "API",
          payload: data,
          url: api.MANAGER_API,
          options: option,
          successAction: Response.onSuccess,
          failureAction: Response.onFailure,
          extraParams: {},
        },
      });
    };
  };

  const selected_account_action=(data)=>
  {
      return{
          payload:{selected_account:data},
          type:action.UPDATE_SELECTED_ACCOUNT
      }
  }

  const deleteAction=(data)=>
  {
    let Response = utils.ResponseActions(action.DELETE_SUCCESS,action.DELETE_SUCCESS);
    let headers = new Headers();
    headers.append("X-CSRFToken", utils.getCSRFtoken());
    let option = {
      method: "POST",
      headers,
      body: data,
      credentials: "same-origin",
    };
    return (dispatch, getState) => {
      dispatch({
        type: "API",
        meta: {
          type: "API",
          payload: data,
          url: api.ACCOUNT_DELETE_API,
          options: option,
          successAction: Response.onSuccess,
          failureAction: Response.onFailure,
          extraParams: {},
        },
      });
    };
  };

const clear_signup_status=()=>
{
    return {
        payload:{error:""},
        type: action.SIGNUP_FAILURE
    }
}

const clear_account_create_status=()=>
{
    return {
        payload:{error:""},
        type: action.ACCOUNT_CREATE_FAILURE
    }
}

const logoutAction=()=>
{
    return {
        payload:{},
        type:action.LOGOUT
    }
}

const user_accounts_update=(data)=>
{
    return{
        payload:{accounts:data},
        type:action.UPDATE_USER_ACCOUNTS
    }
}


export {signupAction,clear_signup_status,loginAction,depositAction,
    accountcreateAction,selected_account_action,managerAction,logsheetAction,
    withdrawAction,sendAction,deleteAction,clear_account_create_status,logoutAction,user_accounts_update}