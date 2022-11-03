import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseUrl = process.env.REACT_APP_API_URL;

export default function AddVehical() {
  const [vehicalName, setvehicalName] = useState('');
  const [image, setImage] = useState();
  const [tax, setTax] = useState('');
  const [commission, setCommission] = useState('');
  const [disCountType, setdisCountType] = useState('');
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const addVehical = () => {
    setSubmitBtn("Please Wait...");
    const formData = new FormData();
    formData.append("vehicalName", vehicalName);
    formData.append("image", image);
    formData.append("disCountType", disCountType);
    formData.append("tax", tax);
    formData.append("Commission", commission);
    axios
      .post(baseUrl + "api/v1/admin/addVehicaltype", formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.responseCode === 200) {
          setSubmitBtn("Vehical Added!");
          setTimeout(function () {
            navigate("/vehicals");
          }, 2000);
        } if (response.data.responseCode === 409) {
          setSubmitBtn("Already exist!")
          setTimeout(() => {
            setSubmitBtn("Submit!");
          }, 2000);
        }
        else {
          setSubmitBtn("Something Went Wrong!");
          setTimeout(function () {
            setSubmitBtn("Submit!");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full flex justify-center">
      <div className=" bg-yellow-300 my-10 w-11/12 card">
        <div>
          <div className="">
            <h1 className="font-bold text-3xl py-5">Add New Vehical</h1>
          </div>
          <div className="my-6 card">
            <div className="rounded-lg p-3 border">
              <form onSubmit={handleSubmit(addVehical)}>
                <div className="w-full">
                  <div className="flex  justify-around w-full">
                    <label className="mr-10 w-2/4 py-2">VehicalName</label>
                    <input
                      type="text"
                      {...register("vehicalName", { required: true })}
                      onChange={(e) => setvehicalName(e.target.value)}
                      value={vehicalName}
                      placeholder="Enter Vehical Name"
                      className="border-2 border-black-900 rounded-xl px-3 w-3/4 md:w-1/3 "
                    />
                  </div>
                </div>
                <div className="w-full flex">
                  {errors.vehicalName?.type === "required" && (
                    <span className="text-red-800 px-10 text-right w-full">Vehical Name Is Required!</span>
                  )}
                </div>
                <div className="w-full">
                  <div className="form-group flex justify-around my-5">
                    <label className="mr-10 w-2/4">Add Image</label>
                    <input
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                      accept="image/*"
                      className="md:w-1/3 w-3/4 rounded text-sm py-1"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex justify-around w-full">
                    <label className="mr-10 w-2/4 py-2">Type</label>
                    <div className="md:flex items-center w-3/4 md:w-1/3 my-3">
                      <div className="flex">
                        <input
                          type="radio"
                          {...register("tax", { required: true })}
                          onChange={(e) => setdisCountType(e.target.value)}
                          value='FLAT'
                        /><span className="ml-2 mr-10">FLAT</span>
                      </div>
                      <input
                        type="radio"
                        {...register("tax", { required: true })}
                        onChange={(e) => setdisCountType(e.target.value)}
                        value='PERCENTAGE'
                      /><span className="ml-2 ">PERCENTAGE</span>
                    </div>
                  </div>
                </div>
                <div className="flex w-full">
                  {errors.tax?.type === "required" && (
                    <span className="text-red-800 px-10 text-right w-full">Type Is Required!</span>
                  )}
                </div>
                <div className="w-full">
                  <div className="flex  justify-around w-full">
                    <label className="mr-10 w-2/4 py-2">Tax</label>
                    <input
                      type="text"
                      {...register("tax", { required: true })}
                      onChange={(e) => setTax(e.target.value)}
                      value={tax}
                      placeholder="Enter Tax"
                      className="border-2 border-black-900 rounded-xl px-3 w-3/4 md:w-1/3 "
                    />

                  </div>
                </div>
                <div className="flex w-full">
                  {errors.tax?.type === "required" && (
                    <span className="text-red-800 px-10 text-right w-full">Tax Is Required!</span>
                  )}
                </div>
                <div className="w-full py-4">
                  <div className="flex  justify-around w-full">
                    <label className="mr-10 w-2/4 py-2">Commission</label>
                    <input
                      type="text"
                      {...register("Commission", { required: true })}
                      onChange={(e) => setCommission(e.target.value)}
                      value={commission}
                      placeholder="Enter Commission"
                      className="border-2 border-black-900 rounded-xl px-3 w-3/4 md:w-1/3 "
                    />

                  </div>
                </div>
                <div className="flex w-full">
                  {errors.Commission?.type === "required" && (
                    <span className="text-red-800 px-10 text-right w-full">Commission Is Required!</span>
                  )}
                </div>
                <div className="w-full mt-3">
                  <button className="btn w-full bg-yellow-300 hover:bg-yellow-500 font-semibold rounded py-1">
                    {submitBtn}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
