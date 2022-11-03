import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';


const baseUrl = process.env.REACT_APP_API_URL;

export default function WithdrawApproved() {
    const { id } = useParams();

    const [paymentReply, setpaymentReply] = useState();
    const [screenShot, setscreenShot] = useState();
    const [status, setStatus] = useState();


    const [submitBtn, setSubmitBtn] = useState("Submit");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    let navigate = useNavigate();

    const addPaymentStatus = () => {
        setSubmitBtn("Please Wait...");
        const formData = new FormData();
        formData.append("paymentReply", paymentReply);
        formData.append("status", status);
        formData.append("screenShot", screenShot);

        axios
            .put(baseUrl + `api/v1/admin/withdrawApprove/${id}`, formData, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                if (response.data.responseCode === 200) {
                    setSubmitBtn("Withdrawal request approved!");
                    setTimeout(function () {
                        navigate("/withdrawal");
                    }, 2000);
                } else {
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
        <div className="bg-yellow-300 my-10 mx-10 card">
            <div className="">
                <h1 className="font-bold text-3xl py-5 ">Withdrawal Approval</h1>
            </div>

            <div className="my-6 card">
                <div className="rounded-lg p-3 border">
                    <form onSubmit={handleSubmit(addPaymentStatus)}>
                        <div className="flex ">
                            <div className="w-full">
                                <div className="flex  justify-around w-full">
                                    <label className="mr-10 w-2/4 py-2">Payment Reply</label>
                                    <input
                                        type="text"
                                        {...register("paymentReply", { required: true })}
                                        onChange={(e) => setpaymentReply(e.target.value)}
                                        value={paymentReply}
                                        placeholder="Enter about payment"
                                        className='border-2 border-black-900 rounded-xl px-3 w-1/3 '
                                    />
                                    {errors.paymentReply?.type === "required" && (
                                        <span className="form-error">paymentReply Is Required!</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="status flex justify-around my-5">
                            <div className="mr-10 w-2/4">Choose Status</div>
                            <select className="w-1/3 rounded py-1 px-3" name="status" onChange={(e) => setStatus(e.target.value)}>
                                <option value="PAID">PAID</option>
                                <option value="PENDING">PENDING</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <div className="form-group flex justify-around my-5">
                                <label className="mr-10 w-2/4">Add screenShot</label>
                                <input
                                    type="file"
                                    className="w-1/3 rounded text-sm py-1"
                                    onChange={(e) => setscreenShot(e.target.files[0])}
                                    accept="screenShot/*"
                                />
                            </div>
                        </div>
                        <div className="w-full mt-3">
                            <button className="btn w-full bg-yellow-300 hover:bg-yellow-500 font-semibold rounded py-1">{submitBtn}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
