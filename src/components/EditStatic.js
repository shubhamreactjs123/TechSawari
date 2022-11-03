import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const baseUrl = process.env.REACT_APP_API_URL;

export default function EditStatic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitBtn, setSubmitBtn] = useState("Submit");

  const [staticData, setStaticData] = useState("");

  let navigate = useNavigate();
  const { id } = useParams();

  const formData = {
    title: title,
    description: description,
  };
  const getStatic = async () => {
    axios
      .get(baseUrl + "api/v1/static/getStaticContent?_id=" + id, {})
      .then((response) => {
        if (response.data.responseCode === 200) {
          setStaticData(response.data.result);
          setTitle(response.data.result.title);
          setDescription(response.data.result.description);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AddStatic = () => {
    setSubmitBtn("Please Wait...");

    axios
      .put(baseUrl + "api/v1/static/updateStaticContent/" + id, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.responseCode === 200) {
          setSubmitBtn("Static data add successfuly!");
          setTimeout(function () {
            navigate("/static");
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
    getStatic();
  }, []);
  return (
    <div className="bg-yellow-300 my-1 mx-10 card h-10/12 ">
      <div className="">
        <h1 className="font-bold text-3xl py-1">Edit Static</h1>
      </div>
      <div className="my-2 card">
        <div className="rounded-lg  border">
          <div className="flex w-full py-2 px-5">
            <div className="w-full ">
              <div className="flex  justify-between ">
                <label className=" py-2">Title</label>
                <input
                  name="title"
                  type="text"
                  defaultValue={staticData?.title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-2 border-black-900 rounded-xl px-3 w-3/4 "
                />
              </div>
            </div>
          </div>

          <div className="flex left px-5 py-2 text-xl ">Decscription</div>
          <Editor
            apiKey="6q148xaviqj7hqyobxrsajmpguywzo0ruppfuiiml4p58efb"
            initialValue={staticData?.description}
            init={{
              height: 300,
              menubar: true,
              plugins: "link image table lists",
              toolbar: [
                { name: "history", items: ["undo", "redo"] },
                { name: "styles", items: ["styles"] },
                { name: "formatting", items: ["bold", "italic"] },
                { name: "lists", items: ["numlist", "bullist"] },
                { name: "image", items: ["image"] },
                { name: "link", items: ["link"] },
                {
                  name: "alignment",
                  items: [
                    "alignleft",
                    "aligncenter",
                    "alignright",
                    "alignjustify",
                  ],
                },
                { name: "indentation", items: ["outdent", "indent"] },
              ],
              contextmenu: "link image table",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px, max-height:500px }",
            }}
            onChange={(e) => setDescription(e.target.getContent())}
          />
          <div className="w-full mt-3">
            <button
              className="btn w-full bg-yellow-300 hover:bg-yellow-500 font-semibold rounded py-1"
              onClick={() => AddStatic()}
            >
              {submitBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
