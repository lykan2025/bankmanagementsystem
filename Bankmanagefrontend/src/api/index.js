const HOST="http://localhost:8000";

const SIGNUP_API=HOST+"/accountholdercreate";
const LOGIN_API=HOST+"/accountholderlogin";
const ACCOUNT_CREATE_API=HOST+"/accountcreate";
const SHEET_API=HOST+"/logsheet";
const DEPOSIT_API=HOST+"/depositmoney";
const WITHDRAW_API=HOST+"/withdrawmoney";
const SEND_API=HOST+"/sendmoney";
const ACCOUNT_DELETE_API=HOST+'/accountdelete';
const MANAGER_API=HOST+'/managerlogin';

export {SIGNUP_API,LOGIN_API,ACCOUNT_CREATE_API,MANAGER_API,SHEET_API,DEPOSIT_API,WITHDRAW_API,SEND_API,ACCOUNT_DELETE_API};