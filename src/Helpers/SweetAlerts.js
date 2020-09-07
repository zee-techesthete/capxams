import Swal from "sweetalert2";
// import { alertsApi } from '../Config/ApiClient'
// import { UPDATE_ALERT_STATUS } from '../Queries/Pages/Alerts'

/**
 *
 * @param type - used to switch which Swal to fire
 * @param id - id of the affected item
 * @param status - for alerts, this is the status of the alert
 * @returns {*}
 */
export default function sweetAlert(type, id, name, status) {
  switch (type) {
    case "alert":
      return Swal.fire({
        title: `Are you sure you want to ${
          status === true ? "turn on" : "pause"
        } <br/>${name}?`,
        type: "",
        width: 500,
        padding: 40,
        showConfirmButton: true,
        confirmButtonText: "Yes",
        confirmButtonClass: "swal-btn-confirm",
        confirmButtonColor: "#6600cc",
        showCloseButton: true,
        showCancelButton: true,
        reverseButtons: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#ffffff",
        cancelButtonClass: "swal-btn-cancel",
      }).then(function (data) {
        if (data.dismiss !== "cancel" && data.dismiss !== "close") {
          // alertsApi
          //   .mutate({
          //     variables: { id: id, paused: !status },
          //     mutation: UPDATE_ALERT_STATUS,
          //     refetchQueries: () => ['GetAlerts'],
          //   })
          // .then(() => {
          //   Swal.fire({
          //     title: `${name}<br/> has been ${status === true ? 'turned on' : 'paused'}.`,
          //     type: '',
          //     width: 500,
          //     padding: 40,
          //     confirmButtonClass: 'swal-btn-confirm',
          //     confirmButtonColor: '#6600cc',
          //     showCloseButton: true,
          //   })
          // })
        }
      });
    default:
      return null;
  }
}
