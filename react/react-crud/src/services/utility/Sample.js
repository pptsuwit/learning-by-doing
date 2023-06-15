import React, { Component } from "react";
// import * as Label from '../services/stringHelper';
// import { Services } from '../services/Service/Services';
// import { SWITCH_SIZE } from '../services/stringHelper';
// import { connect } from 'react-redux';
// import * as actions from '../store/actions/Others/sample';

// import Switcher from '../components/Switcher/Switcher';
// import DatePicker from '../components/DatePicker/DatePicker';
// import TimePicker from '../components/TimePicker/TimePicker';
// import Dropdown from '../components/Dropdown/Dropdown';
// import RadioInput from '../components/RadioInput/RadioInput';
// import RadioPermission from "../components/RadioPermission/RadioPermission";
// var QRCode = require("qrcode.react");
class Sample extends Component {
  state = {
    value1: true,
    value2: false,
    value3: false,
  };
  onChange = (e) => {
    if (e.name === "1" && e.value === true) {
      this.setState({ value1: true, value2: true, value3: true });
    } else {
      this.setState({ value1: false, value2: false, value3: false });
    }
  };
  showS = (showState) => {
    console.log(showState);
  };
  downloadQR = () => {
    const canvas = document.getElementById("123456");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "123456.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  render() {
    console.log("render sample");
    // const datasource = [
    //     { key: 1, label: 'Mock datasource for dropdown 1' },
    //     { key: 2, label: 'Mock datasource for dropdown 2' },
    //     { key: 3, label: 'Mock datasource for dropdown 3' },
    // ];
    return (
      <>
        {/* <div>
          <QRCode
            id="123456"
            value="asasfasfasf"
            size={290}
            level={"L"}
            includeMargin={true}
          />
          <a onClick={this.downloadQR}> Download QR </a>
        </div> */}

        <div>
          <div>
            <h1>SAMPLE COMPONENT</h1>
          </div>
          <button onClick={() => this.showS(this.props.showState)}>Show</button>
        </div>
      </>
    );
  }
}

// const mapStateToProps = state => {
//     return {
//         // active: state.sample.active,
//         // date_single: state.sample.date_single,
//         // date: state.sample.date,
//         // date_multiple_start: state.sample.date_multiple_start,
//         // date_multiple_end: state.sample.date_multiple_end,
//         // time: state.sample.time,
//         showState: state.sample
//     };
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onToggleSwicher: (active) => dispatch(actions.setSwitcher(active)),
//         onSetDate: (date) => dispatch(actions.setDate(date)),
//         onSetDateRange: (dateRange) => dispatch(actions.setDateRange(dateRange)),
//         onSetTime: (time) => dispatch(actions.setTime(time)),
//     }
// }

export default Sample;
// export default connect(mapStateToProps, mapDispatchToProps)(Sample)
