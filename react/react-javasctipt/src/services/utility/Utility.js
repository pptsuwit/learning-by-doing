// import swal from "sweetalert";
import axios from "./Axios";
import * as moment from "moment";
// import { SERVICES } from "../stringHelper";
var HtmlToReactParser = require("html-to-react").Parser;
const $ = window.$;

// export const token = '_token_forum';
// const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
// const MONTHS_TH = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const FULL_MONTHS_TH = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];
export const Services = {
  response,
  error,
  AlertError,
  AlertSuccess,
  AlertWarning,
  AlertWarning2,
  getThaiDateFullFormat,
  getNewDate,
  getNewDateAndTime,
  getAdjNewDate,
  convertDate,
  convertToMoney,
  convertMoneyToInt,
  convertToDate,
  submitRequest,
  submitRequestWithFile,
  goToTop,
  convertToDecimal,
  htmlParse,
  convertStringToDate,
  convertDateToString,
  convertDateTimeToString,
  convertStringToDateTime,
  convertToInt,
  yearTh,
  numberWithCommas,
  arraysEqual,
  checkZeroValue,
  // isClassComponent, isFunctionComponent, isReactComponent, isElement, isDOMTypeElement, isCompositeTypeElement
};
export const Auth = { isRole, getCurrentUser };

export const Config_url = {
  reset_password: "/auth/resetpassword",
  upload_asset: "uploadasset",
  resend_active_email: "auth/resendactiveemail",
  unlocked: "auth/unlocked",
};

export const Alert = {
  confirm(text, title = "SERVICES.LABEL_CONFIRM") {
    const promise = new Promise((resolve, reject) => {
      // swal({
      //   title: title,
      //   text: text,
      //   icon: "SERVICES.ICON.WARNING",
      //   buttons: true,
      //   dangerMode: true,
      // }).then((confirm) => {
      //   resolve(confirm);
      // });
    });

    return promise;
  },
  done(text = "SERVICES.LABEL_SAVE_SUCCESS", title = "SERVICES.LABEL_SUCCESS") {
    const promise = new Promise((resolve, reject) => {
      // swal({
      //   title: title,
      //   text: text,
      //   icon: "SERVICES.ICON.SUCCESS",
      //   button: "SERVICES.BUTTON.OK",
      // }).then((res) => {
      //   resolve(res);
      // });
    });

    return promise;
  },
  error(text = "SERVICES.LABEL_ERROR_TH", title = "SERVICES.LABEL_ERROR_EN") {
    const promise = new Promise((resolve, reject) => {
      // swal({
      //   title: title,
      //   text: text,
      //   icon: "SERVICES.ICON.ERROR",
      //   button: "SERVICES.BUTTON.OK",
      // }).then((res) => {
      //   resolve(res);
      // });
    });

    return promise;
  },
};

function AlertError(message = "SERVICES.LABEL_ERROR_TH") {
  var promise = new Promise((resolve, reject) => {
    // swal({
    //   title: message,
    //   icon: "SERVICES.ICON.ERROR",
    //   button: "SERVICES.BUTTON.OK",
    // }).then((res) => {
    //   resolve(res);
    // });
  });
  return promise;
}
function AlertSuccess(message = "SERVICES.LABEL_SAVE_SUCCESS") {
  const promise = new Promise((resolve, reject) => {
    // swal({
    //   title: message,
    //   icon: "SERVICES.ICON.SUCCESS",
    //   button: "SERVICES.BUTTON.OK",
    // }).then((res) => {
    //   resolve(res);
    // });
  });
  return promise;
}
function AlertWarning(message) {
  var promise = new Promise((resolve, reject) => {
    // swal({
    //   title: "",
    //   text: message,
    //   icon: "warning",
    //   buttons: true,
    //   dangerMode: true,
    // }).then((res) => {
    //   if (res) {
    //     console.log(res);
    //   }
    // });
  });
  return promise;
}
function AlertWarning2(title = "", message = "") {
  var promise = new Promise((resolve, reject) => {
    // swal({
    //   title: title,
    //   text: message,
    //   icon: "warning",
    //   buttons: true,
    //   dangerMode: true,
    // }).then((res) => {
    //   if (res) {
    //   }
    // });
  });
  return promise;
}
function goToTop() {
  var body = $("html, body");
  body.stop().animate({ scrollTop: 0 }, 500, "swing");
}

function submitRequestWithFile(params, options = {}) {
  const default_options = { show_popup: true };
  options = {
    ...default_options,
    ...options,
  };

  const request_options = {
    headers: { "content-type": "multipart/form-data" },
  };

  let form_data = new FormData();

  for (var key in params.params) {
    let value = params.params[key];
    if (value === null) {
      value = "";
    }

    if (value instanceof Array) {
      form_data.append(key, JSON.stringify(value));
    } else if (value instanceof FileList) {
      for (let i = 0; i < value.length; i++) {
        form_data.append(key, value[i]);
      }
    } else {
      form_data.append(key, value);
    }
  }

  const params_request = {
    url: params.url,
    // params: { ...form_data },
  };

  const promise = new Promise((resolve, reject) => {
    let request;
    const id = params.params.id;
    const url = params_request.url;

    if (id !== undefined && id !== null) {
      // Update
      form_data.append("_method", "PUT");
      request = axios.put(url + "/" + id, form_data, request_options); // change from post to put
    } else {
      // Insert
      request = axios.post(url, form_data, request_options);
    }

    request
      .then((result) => {
        if (options.show_popup === true) {
          // swal({
          //   title: "SERVICES.LABEL_SUCCESS",
          //   text: "SERVICES.LABEL_SAVE_SUCCESS",
          //   icon: "SERVICES.ICON.SUCCESS",
          //   button: "SERVICES.BUTTON.OK",
          // }).then((res) => {
          //   resolve(result);
          // });
        } else {
          resolve(result);
        }
      })
      .catch((res) => {
        // if(res.data){
        //     reject(res.data);
        // }else{

        try {
          // var msg = [];
          // if (res.data instanceof Array) {
          //     msg = res.data;
          // } else {
          //     for (var i in res.data.errors) {
          //         res.data.errors[i].map(item => {
          //             return msg.push(item);
          //         });
          //     }
          // }
          var msg = [];
          if (res !== undefined) {
            if (res.data !== undefined) {
              if (res.data.message !== undefined) {
                msg.push(res.data.message);
              } else {
                for (var i in res.data.errors) {
                  res.data.errors[i].map((item) => {
                    return msg.push(item);
                  });
                }
              }
            } else {
              for (var it in res.response.data.errors) {
                res.response.data.errors[it].map((item) => {
                  return msg.push(item);
                });
              }
            }
          }
          this.goToTop();
          reject(msg);
        } catch (error) {
          // swal({
          //   title: "SERVICES.LABEL_ERROR_TH",
          //   text: "Something wrong, please try again latter.",
          //   icon: "SERVICES.ICON.ERROR",
          //   button: "SERVICES.BUTTON.OK",
          // }).then(() => reject([]));
          // console.log(error);
        }
        // }
      });
  });

  return promise;
}

function submitRequest(params) {
  const default_params = {
    // method: 'post',
    url: "",
    params: [],
  };

  const params_request = {
    ...default_params,
    ...params,
  };

  const promise = new Promise((resolve, reject) => {
    let request;
    const id = params_request.params.id;
    const url = params_request.url;
    if (id !== undefined && id !== null && id !== "" && id !== 0) {
      // Update
      request = axios.put(url + "/" + id, params_request.params);
    } else {
      // Insert
      request = axios.post(url, params_request.params);
    }

    request
      .then((result) => {
        // swal({
        //   title: "SERVICES.LABEL_SUCCESS",
        //   text: "SERVICES.LABEL_SAVE_SUCCESS",
        //   icon: "SERVICES.ICON.SUCCESS",
        //   button: "SERVICES.BUTTON.OK",
        // }).then((res) => {
        //   resolve(result);
        // });
      })
      .catch((res) => {
        var msg = [];
        if (res !== undefined) {
          if (res.data !== undefined) {
            if (res.data.message !== undefined) {
              msg.push(res.data.message);
            } else {
              for (var i in res.data.errors) {
                res.data.errors[i].map((item) => {
                  return msg.push(item);
                });
              }
            }
          } else {
            for (var it in res.response.data.errors) {
              res.response.data.errors[it].map((item) => {
                return msg.push(item);
              });
            }
          }
        }

        this.goToTop();

        reject(msg);
      });
  });

  return promise;
}

function response(axios_promise) {
  var promise = new Promise((resolve, reject) => {
    axios_promise
      .then((res) => {
        // swal({
        //   title: "SERVICES.LABEL_SUCCESS",
        //   text: "SERVICES.LABEL_SAVE_SUCCESS",
        //   icon: "SERVICES.ICON.SUCCESS",
        //   button: "SERVICES.BUTTON.OK",
        // }).then((res) => {
        //   resolve(res);
        // });
      })
      .catch((res) => {
        var errors = [];
        if (res.status === 500) {
          var error_message = res.response.statusText;

          errors.push(error_message);
        } else {
          var msg = [];
          for (var i in res.response.data.errors) {
            res.response.data.errors[i].map((item) => {
              return msg.push(item);
            });
          }

          errors = msg;
        }

        reject(errors);
      });
  });

  return promise;
}
function error(error) {
  console.log(error);
  var promise = new Promise((resolve, reject) => {
    var error_message = "";
    if (error.status === 500) {
      if (error.response !== undefined) {
        error_message = error.response.statusText;
      } else {
        error_message = "SERVICES.LABEL_ERROR_TH";
      }
    } else if (error.status === 400) {
      error_message = error.data.message;
    } else {
      var msg = [];
      if (error.response !== undefined) {
        for (var i in error.response.data.errors) {
          error.response.data.errors[i].map((item) => {
            return msg.push(item);
          });
        }
        error_message = msg.join("\n");
      } else {
        error_message = "SERVICES.LABEL_ERROR_TH";
      }
    }
    // swal({
    //   title: error_message,
    //   icon: "SERVICES.ICON.ERROR",
    //   button: "SERVICES.BUTTON.OK",
    // }).then((res) => {
    //   resolve(res);
    // });
  });

  return promise;
}

function getThaiDateFullFormat(_date) {
  if (_date === null) return "";
  var date = new Date(_date);

  var day = date.getDate();
  var month = FULL_MONTHS_TH[date.getMonth()];
  var year = date.getFullYear() + 543;
  return day + " " + month + " " + year;
}
function getNewDate() {
  // return moment(new Date()).format("DD-MM-YYYY");
  return this.convertDateToString(new Date());
}
function getNewDateAndTime() {
  return this.convertDateTimeToString(new Date());
}
function getAdjNewDate(_day = null, _month = null, _year = null) {
  var new_date = new Date();
  new_date.setDate(new_date.getDate() + parseInt(_day));
  var date = this.convertDateToString(new_date);
  var d = date.substring(0, 2);
  var m = date.substring(3, 5);
  var y = date.substring(6, 10);
  // if (_day !== null) {
  //     d = parseInt(d)
  // }
  // if (_month !== null) {
  //     d = parseInt(m)
  // }
  // if (_year !== null) {
  //     d = parseInt(y)
  // }
  return d + "-" + m + "-" + y;
}
function convertDate(_date) {
  return moment(_date).format("DD/MM/YYYY");
}

function convertToDate(_date, format = "DD/MM/YYYY") {
  return moment(_date, format);
}
function convertStringToDate(_date, format = "DD-MM-YYYY") {
  return moment(_date, format)._d;
}
function convertStringToDateTime(_date, format = "DD-MM-YYYY HH:mm:ss") {
  return moment(_date, format)._d;
}
function convertDateTimeToString(_date, format = "DD-MM-YYYY HH:mm:ss") {
  return _date !== null ? moment(_date).format(format) : null;
}
function convertDateToString(_date, format = "DD-MM-YYYY") {
  return _date !== null ? moment(_date).format(format) : null;
}
function convertToMoney(money) {
  if (money !== undefined && money !== null && money !== "") {
    money = parseFloat(money);
    return money.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }

  return "";
}
function convertToInt(int) {
  return int === null || int === undefined || int === "" || isNaN(int)
    ? 0
    : parseInt(int);
}
function checkZeroValue(int) {
  let value = this.convertToInt(int);
  let zero = false;
  if (value === 0) {
    zero = true;
  }
  return zero;
}
function convertMoneyToInt(money) {
  return parseInt(money.replace(/[^0-9]/g, ""));
}

function convertToDecimal(numeric) {
  const number = parseFloat(numeric);

  if (isNaN(number)) {
    return 0;
  } else {
    return number;
  }
}
function numberWithCommas(x) {
  if (x === undefined) return "0";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function yearTh(_date, format = "DD-MM-YYYY") {
  if (_date === null) return "";
  var date = new Date(this.convertStringToDate(_date));

  var dd = (date.getDate() < 10 ? "0" : "") + date.getDate();
  var mm = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
  var yyyy = date.getFullYear() - 543;
  var th = dd + "-" + mm + "-" + yyyy;
  var date_th = new Date(this.convertStringToDate(th));
  return moment(date_th).format(format);
}

function isRole(role) {
  // role = admin, staff, keynote_speaker, reviewer, super_reviewer
  const current_user = this.getCurrentUser();

  if (current_user !== null && current_user.roles.indexOf(role) !== -1) {
    return true;
  }

  return false;
}

function getCurrentUser() {
  const current_user = JSON.parse(localStorage.getItem("currentUser"));

  return current_user;
}

// function isClassComponent(component) {
//     return (
//         typeof component === 'function' &&
//         !!component.prototype.isReactComponent
//     ) ? true : false
// }

// function isFunctionComponent(component) {
//     return (
//         typeof component === 'function' &&
//         String(component).includes('return React.createElement')
//     ) ? true : false;
// }

// function isReactComponent(component) {
//     return (
//         isClassComponent(component) ||
//         isFunctionComponent(component)
//     ) ? true : false;
// }

// function isElement(element) {
//     return React.isValidElement(element);
// }

// function isDOMTypeElement(element) {
//     return isElement(element) && typeof element.type === 'string';
// }

// function isCompositeTypeElement(element) {
//     return isElement(element) && typeof element.type === 'function';
// }

function htmlParse(html) {
  var htmlToReactParser = new HtmlToReactParser();
  const reactElement = htmlToReactParser.parse(html);

  return reactElement;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
