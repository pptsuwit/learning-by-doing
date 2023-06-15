import { toast } from "react-toastify";
export const notify = {
  success,
  toastify,
  update,
  loading,
};

function success(
  message = "",
  position = toast.POSITION.TOP_RIGHT,
  autoClose = 5000
) {
  toast.success(message, {
    position,
    autoClose,
  });

  //   var promise = new Promise((resolve, reject) => {
  //     swal({
  //       title: message,
  //       icon: SERVICES.ICON.ERROR,
  //       button: SERVICES.BUTTON.OK,
  //     }).then((res) => {
  //       resolve(res);
  //     });
  //   });
  //   return promise;
}

function loading(message = "Please wait...") {
  toast.loading(message);
}
function update(
  id,
  update = {
    render: "",
    type: "success",
    isLoading: false,
    autoClose: "5000",
    position: toast.POSITION.TOP_RIGHT,
  }
) {
  toast.update(id, update);
}

function toastify() {}
