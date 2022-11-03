import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseUrl = process.env.REACT_APP_API_URL;
export default function EditProfile() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState();
  const [profilePic, setprofilePic] = useState("");
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const [ProfileData, setProfileData] = useState("");
  let navigate = useNavigate();
  const formData = {
    name: name,
    gender: gender,
    profilePic: profilePic
  }
  const getProfile = async () => {
    axios
      .get(baseUrl + "api/v1/admin/viewProfile", {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((response) => {
        if (response.data.responseCode === 200) {
          setProfileData(response.data.result);
          setName(response.data.result.name);
          setprofilePic(response.data.result.profilePic);
          setGender(response.data.result.gender);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const AddProfile = () => {
    setSubmitBtn("Please Wait...");
    axios.put(baseUrl + "api/v1/admin/editProfile", formData, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then((response) => {
      if (response.data.responseCode === 200) {
        setSubmitBtn("Profile data add successfuly!");
        setTimeout(function () {
          navigate("/admin-profile");
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
    getProfile();
  }, []);
  return (
    <div className="bg-yellow-300 my-1 mx-10 card h-10/12 " >
      <div className="">
        <h1 className="font-bold text-3xl py-1">Edit Profile</h1>
      </div>
      <div className="my-2 card">
        <div className="w-full py-2 ">
          <div className="">
            {ProfileData?.profilePic ? (
              <div className="w-full flex justify-center center h-auto "><img
                src={ProfileData?.profilePic}
                className="rounded-full border "
                width={80}
                height={80}
              /></div>
            ) : (
              "Profile Pic"
            )}
          </div>
        </div>
        <div className="rounded-lg p-3  border">
          <div className="flex w-full py-2 px-5">
            <div className="w-full ">
              <div className="flex  justify-between ">
                <label className=" py-2">Name</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={ProfileData?.name}
                  onChange={(e) => setName(e.target.value)}
                  className='border-2 border-black-900 rounded-xl px-3 w-3/4 ' />
              </div>
            </div>
          </div>
          <div className="flex w-full py-2 px-5">
            <div className="w-full ">
              <div className="flex  justify-between ">
                <label className=" py-2">Gender</label>
                <select onChange={(e) => setGender(e.target.value)} name="gender" className="border-2 border-black-900 rounded-xl px-3 w-3/4">
                 <option value={ProfileData?.gender}>{ProfileData?.gender}</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between px-5">
            <div className="">Profile Pic</div>
            <input
              type="file"
              name="profilePic"
              className="border-2 border-black-900 rounded-xl px-3 w-3/4"
              onChange={(e) => setprofilePic(e.target.files[0])}
            />
          </div>
          <div className="w-full mt-3">
            <button className="btn w-full bg-yellow-300 hover:bg-yellow-500 font-semibold rounded py-1" onClick={() => AddProfile()}>{submitBtn}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
