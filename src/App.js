import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setdata] = useState(null);
  const [searchdata, sersearchdata] = useState("");
  let [time, settime] = useState(0)
  useEffect(() => {
    getdata();
   
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
     settime(time++)
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const search = () => {
    if (search === ""){
setdata(...data)
    }
    else{
      setdata(
        data.filter((val) => {
          return searchdata === ""
            ? val
            : val.name.toLowerCase().includes(searchdata.toLowerCase());
        })
      );
    }
  };

  const getdata = async () => {
    try {
      const res = await axios("https://jsonplaceholder.typicode.com/users");
      setdata(res.data);
      console.log(data);
    } catch (error) {
      console.log("Seach filter Error", error);
    }
  };
  return (
    <div className=" ">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 p-0">
            <input
              type="text"
              placeholder="Search......."
              className="form-control mb-3"
              onChange={(e) => {
                sersearchdata(e.target.value);
              }}
            />
          </div>
          <div className="col-md-2 ">
            <button className="btn btn-success" onClick={search}>
              {" "}
              Search
            </button>
          </div>
        </div>
        <h1>Time : {time}</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data
                .filter((val) => {
                  return searchdata === ""
                    ? val
                    : val.name.toLowerCase().includes(searchdata.toLowerCase());
                })
                .map((value, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index}</th>
                      <td>{value.name}</td>
                      <td>{value.username}</td>
                      <td>{value.email}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
