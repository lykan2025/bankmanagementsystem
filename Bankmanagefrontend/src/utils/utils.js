import moment from "moment";

const getCSRFtoken = () => {
  return (document.cookie.split(";").filter((item) => item.match("csrftoken"))[0] || "").split("=")[1];
};

const buildUrl = (url, parameters) => {
  let qs = "";
  for (const key in parameters) {
    if (parameters.hasOwnProperty(key)) {
      const value = parameters[key];
      qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
    }
  }
  if (qs.length > 0) {
    qs = qs.substring(0, qs.length - 1); //chop off last "&"
    url = url + "?" + qs;
  }
  return url;
};

const defaultResponseHandler = (type) => {
  return (data, extraParam) => ({
    type: type,
    payload: data,
    extraParam: extraParam,
  });
};

const ResponseActions = (successType, failureType) => {
  return {
    onSuccess: defaultResponseHandler(successType),
    onFailure: defaultResponseHandler(failureType),
  };
};

const getQueryParams = (location) => {
  let query = new URLSearchParams(location.search);
  let params = {};
  query.forEach((val, key) => (params[key] = val));
  return params;
};

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

const getDateFormat = (date, format = "DD MMM YYYY", input_format = "YYYY-MM-DD") => {
  if (date) {
    if (date instanceof Date) {
      return moment(date).format(format);
    } else if (date instanceof moment) {
      return date.format(format);
    } else {
     
      return moment(date, input_format).format(format);
    }
  }
  return "";
};

const capitalize = (str) => {
  try {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } catch (error) {
    return str;
  }
};

const checkPermission = (permissions) => {
  if (!Array.isArray(permissions)) {
    permissions = new Array(permissions);
  }
  var all_permissions = {};
  var permission_valiadte = all_permissions.includes(permissions[0]);
  permissions.map((permission, index) => (permission_valiadte = permission_valiadte && all_permissions.includes(permission)));
  return permission_valiadte;
};

export { capitalize, isEmpty, ResponseActions, buildUrl, getCSRFtoken, getQueryParams, getDateFormat, checkPermission };
