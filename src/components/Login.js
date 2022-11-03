import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [usererror, setUsererror] = useState("none");
  const [passerror, setPasserror] = useState("none");
  const [data, setData] = useState({ mobileNumber: "", password: "" });
  const [formerror, setFormError] = useState("none");
  const [wait, setWait] = useState("Log In");
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_API_URL;
  const formHandle = async (e) => {
    e.preventDefault();
    if (data.mobileNumber === "") {
      setUsererror("block");
    }
    if (data.password === "") {
      setPasserror("block");
    }
    try {
      const url = baseUrl + "api/v1/admin/loginAdmin";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNumber: data.mobileNumber,
          password: data.password,
        }),
      });
      const json = await response.json();

      if (json.result.token) {
        localStorage.setItem("token", json.result.token);
        setWait("Logged In..");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setFormError("block");
        setWait("Login In");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const validuser = () => {
    setUsererror("none");
  };
  const validpass = () => {
    setPasserror("none");
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
            <div className="font-bold text-xl">Login</div>
            <div className="form-control  ">
              <div>
                <input
                  type="text"
                  placeholder="Mobile number"
                  name="mobileNumber"
                  className="my-5  border-2 rounded p-2 w-full text-black-900"
                  value={data.mobileNumber}
                  onKeyUp={validuser}
                  onChange={(e) => handleChange(e)}
                />
                <span className="text-red-700 pb-2" style={{ display: usererror }}>
                  Please enter mobile number!
                </span>
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="my-5  border-2 rounded p-2 w-full text-black-900"
                  value={data.password}
                  onKeyUp={validpass}
                  onChange={(e) => handleChange(e)}
                />
                <span className="text-red-700 pb-2" style={{ display: passerror }}>
                  Please enter Password!
                </span>
                <span className="text-red-700 pb-2" style={{ display: formerror }}>
                  Please enter correct mobile number or password!
                </span>
              </div>
              <button
                onClick={formHandle}
                className="bg-white w-1/2 rounded hover:bg-yellow-300 py-2 duration-500 font-bold"
              >
                {wait}
              </button>
              <div onClick={() => {
                navigate('/forget-password')
              }} className="text-center py-2 text-blue-900 font-bold cursor-pointer">Forget Password ?</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;