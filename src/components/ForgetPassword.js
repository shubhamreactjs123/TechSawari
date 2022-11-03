import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const baseUrl = process.env.REACT_APP_API_URL;
function ForgetPasword() {
  const [mobileError, setMobileError] = useState("none");
  const [otpError, setOtpError] = useState("none");
  const [otpField, setOtpField] = useState('none')
  const [verifyBtn, setVerifyBtn] = useState('none')
  const [sendBtn, setSendBtn] = useState('block')
  const [resendField, setResendField] = useState('none')
  const [mobileCorError, setMobileCorError] = useState('none')
  const [otpSent, setOtpSent] = useState('none');
  const [mobileNumber, setMobileNumber] = useState("");
  const [verifyDetail, setVerifyDetail] = useState();
  const [otp, setOtp] = useState("")
  const [wait, setWait] = useState("Send OTP");
  const navigate = useNavigate();
  const formData = {
    mobileNumber: mobileNumber
  }
  const formHandle = (e) => {
    e.preventDefault();

    if (mobileNumber === "") {
      setMobileError("block");
    }
    else {
      axios.post(baseUrl + 'api/v1/admin/forgetPassword', formData)
        .then((respo) => {
          if (respo.data.responseCode === 200) {
            setWait("OTP sent");
            setOtpSent('block')
            setMobileCorError('none')
            setVerifyDetail(respo.data.result)
            setTimeout(() => {
              setOtpField('block')
              setWait("Verify OTP")
              setVerifyBtn('block')
              setSendBtn('none')
            }, 2000);
            setTimeout(() => {
              setResendField('block')
            }, 30000);
          } else {
            setMobileCorError('block')
            setWait("Send OTP");
          }
        }).catch((error) => {
          console.log(error);
        })

    }
  };

  const verifyData = {
    mobileNumber: verifyDetail?.mobileNumber,
    otp: otp
  }
  const verifyForm = () => {
    if (otp === verifyDetail.otp) {
      axios.post(baseUrl + 'api/v1/admin/verifyOtp', verifyData)
        .then((respo) => {
          if (respo.data.responseCode === 200) {
            setWait('OTP verified...')
            localStorage.setItem('token', respo.data.result.token)
            setTimeout(() => {
              navigate('/change-password')
            }, 2000);
          } else {
            console.log('somthing wrong');
          }
        }).catch((error) => {
          console.log(error);
        })

    } else {
      setOtpError('block')
    }
  }
  const validMobile = () => {
    setMobileError("none");
  };
  const validOtp = () => {
    setOtpError("none");
  };
  return (
    <>
      <div className="flex justify-center h-screen">
        <div className="xl:w-1/4 md:w-1/4 sm:w-3/4">
          <div className="text-center">
            <img
              width={100}
              src={require("./taxily-512.png")}
              alt=""
              className="mt-20 mb-2 inline"
            />
          </div>
          <div className="bg-yellow-500 shadow-xl rounded p-5 h-auto bottom-1/3">
            <div className="font-bold text-xl">Forget Password</div>
            <div className="form-control  ">
              <div>
                <input
                  type="text"
                  placeholder="Mobile number"
                  name="mobileNumber"
                  className="my-5  border-2 rounded p-2 w-full text-black-900"
                  value={mobileNumber}
                  onKeyUp={validMobile}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <span className="text-red-800 pb-2" style={{ display: mobileError }}>
                  Please enter mobile number!
                </span>
                <span className="text-red-800 pb-2" style={{ display: mobileCorError }}>
                  Please enter correct mobile number!
                </span>
              </div>
              <div>
                <input
                  type="text"
                  name="otp"
                  placeholder=" Enter OTP"
                  className="my-5  border-2 rounded p-2 w-full text-black-900"
                  value={otp}
                  style={{ display: otpField }}
                  onKeyUp={validOtp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <span className="text-red-800 pb-2" style={{ display: otpError }}>
                  Please enter correct OTP!
                </span>
              </div>
              <button
                style={{ display: sendBtn }}
                onClick={formHandle}
                className="bg-white w-1/2 rounded hover:bg-yellow-300 py-2 duration-500 font-bold"
              >
                {wait}
              </button>
              <button
                style={{ display: verifyBtn }}
                onClick={verifyForm}
                className="bg-white w-1/2 rounded bg-yellow-200 hover:bg-yellow-300 py-2 duration-500 font-bold"
              >
                {wait}
              </button>
              <span className="text-green-800 py-2 text-center" style={{ display: otpSent }}>
                OTP sent to your registered mobile number!
              </span>
              <div style={{ display: resendField }} className="text-center py-2 text-blue-900 font-bold cursor-pointer">Resend OTP</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPasword;
