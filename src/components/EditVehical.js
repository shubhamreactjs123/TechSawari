import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const baseUrl = process.env.REACT_APP_API_URL;

export default function EditVehical() {
  const [vehicalName, setVehicalName] = useState("");
  const [image, setImage] = useState();
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const [vehicalData, setvehicalData] = useState("");
  const [tax, setTax] = useState();
  const [commission, setCommission] = useState();

  let navigate = useNavigate();
  const { id } = useParams();
  const dataId = {
    _id: id,
  };
  const formData = {
    _id: id,
    vehicalName: vehicalName,
    vehicalImage: image,
    tax: tax,
    Commission: commission,
  };
  const getvehical = async () => {
    axios
      .post(baseUrl + "api/v1/user/viewVehical", dataId, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
       if (response.data.responseCode === 200) {
        setvehicalData(response.data.result);
        setVehicalName(response.data.result.vehicalName);
        setImage(response.data.result.vehicalImage);
        setTax(response.data.result.tax);
        setCommission(response.data.result.commission);
       }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Addvehical = () => {
    setSubmitBtn("Please Wait...");

    axios
      .put(baseUrl + "api/v1/admin/editVehicaltype", formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.responseCode === 200) {
          setSubmitBtn("vehical data add successfuly!");
          setTimeout(function () {
            navigate("/vehicals");
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
  useEffect(() => {
    getvehical();
  }, []);
  return (
    <div className="bg-yellow-300 my-1 mx-10 card h-10/12 ">
      <div className="">
        <h1 className="font-bold text-3xl py-1">Edit vehical</h1>
      </div>
      <div className="my-2 card">
        <div className="w-full py-2 ">
          <div className="">
            {vehicalData?.vehicalImage ? (
              <div className="w-full flex justify-center center h-auto ">
                <img src={vehicalData?.vehicalImage} width={150} height={150} />
              </div>
            ) : (
              "vehical Pic"
            )}
          </div>
        </div>
        <div className="rounded-lg p-3  border">
          <div className="flex w-full py-2 px-5">
            <div className="w-full ">
              <div className="flex  justify-between ">
                <label className=" py-2">Vehical Name</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={vehicalData?.vehicalName}
                  onChange={(e) => setVehicalName(e.target.value)}
                  className="border-2 border-black-900 rounded-xl px-3 w-3/4 "
                />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-between px-5">
            <div>Vehical Image</div>
            <input
              type="file"
              name="image"
              defaultValue={vehicalData?.vehicalImage}
              className="border-2 border-black-900 rounded-xl px-3 w-3/4"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="flex w-full py-2 px-5">
            <div className="w-full ">
              <div className="flex  justify-between ">
                <label className=" py-2">Tax</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={vehicalData?.tax}
                  onChange={(e) => setTax(e.target.value)}
                  className="border-2 border-black-900 rounded-xl px-3 w-3/4 "
                />
              </div>
            </div>
          </div>

          <div className="flex w-full py-2 px-5">
            <div className="w-full ">
              <div className="flex  justify-between ">
                <label className=" py-2">Commission</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={vehicalData?.Commission}
                  onChange={(e) => setCommission(e.target.value)}
                  className="border-2 border-black-900 rounded-xl px-3 w-3/4 "
                />
              </div>
            </div>
          </div>

          <div className="w-full mt-3">
            <button
              className="btn w-full bg-yellow-300 hover:bg-yellow-500 font-semibold rounded py-1"
              onClick={() => Addvehical()}
            >
              {submitBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
