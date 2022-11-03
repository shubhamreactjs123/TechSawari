import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const baseUrl = process.env.REACT_APP_API_URL;

function AddCity() {
  const { handleSubmit } = useForm();

  const [state, setState] = useState();
  const [stateId, setStateId] = useState();
  const [cityValue, setCityValue] = useState([]);
  const [addBtn, setAddBtn] = useState("Add City");

  const statelist = () => {
    axios.get(baseUrl + "api/v1/admin/stateList").then((response) => {
      if (response.data.responseCode === 200) {
        setState(response.data.result);
      }
    });
  };

  const [cityy, setCityy] = useState();
  const selectCity = (stateId) => {
    axios
      .get(baseUrl + `api/v1/admin/statecityList?_id=${stateId}`)
      .then((res) => {
        if (res.status === 200) {
          setCityy(res.data.result);
        }
      });
  };

  const selectedCities = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setCityValue(value);
  };

  const cityForm = {
    stateId: stateId,
    city: cityValue,
  };
  const navigate = useNavigate();
  const addCity = () => {
    setAddBtn("Please wait...");

    axios
      .post(baseUrl + "api/v1/admin/addSelectedcity", cityForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          setAddBtn("City added !");
          setTimeout(() => {
            navigate("/state");
          }, 2000);
        }
      });
  };
  useEffect(() => {
    statelist();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between opacity-50 bg-slate-100 w-full p-3">
        <div className="text-3xl text-slate-900">State &#38; City</div>
        <button onClick={() => {
          navigate('/state')
        }} className="px-3 bg-black shadow-xl text-yellow-400 rounded-full">Back</button>
      </div>
      <div
        className="flex justify-center items-center"
        style={{ height: "80vh" }}
      >
        <div className="p-2 w-3/4 md:w-2/4 h-auto bg-slate-900 rounded shadow-xl">
          <div className="text-center text-xl text-slate-400 font-bold">
            Add City Statewise
          </div>
          <hr className="w-full px-3 h-1 my-2" />
          <form onSubmit={handleSubmit(addCity)}>
            <div className="flex justify-between py-2">
              <label htmlFor="" className="text-slate-300 py-2">
                State
              </label>
              <select
                onChange={(e) => {
                  setStateId(e.target.value);
                  selectCity(e.target.value);
                }}
                name="state"
                className="border px-3 w-3/4 text-slate-300 border-slate-900 rounded bg-slate-600"
              >
                {state?.map((item, index) => {
                  return (
                    <option key={index} value={item._id}>
                      {item.state}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex justify-between py-2">
              <label htmlFor="" className="text-slate-300 py-2">
                City
              </label>
              <select
                onChange={(e) => selectedCities(e)}
                name="city"
                className="border px-3 w-3/4 text-slate-300 border-slate-900 rounded bg-slate-600"
                multiple
              >
                {cityy
                  ? cityy.map((item, index) => {
                    return (
                      <option key={index} value={[item.cityName]}>
                        {item.cityName}
                      </option>
                    );
                  })
                  : null}
              </select>
            </div>
            <button className="text-slate-300 py-2 w-full bg-slate-700 rounded hover:bg-slate-800 mt-5">
              {addBtn}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCity;
