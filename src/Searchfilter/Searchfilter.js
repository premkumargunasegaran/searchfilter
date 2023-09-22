import axios from "axios";
import { React, useState, useEffect } from "react";

function Searchfilter() {
  const [data, setdata] = useState();
  const [searchdata, setsearchdata] = useState("");

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setdata(res.data);
      //   console.log(res.data);
    } catch (error) {
      console.log("Data error", error);
    }
  };
  const search = (e) => {
   if(!searchdata){
    setdata(data)
   }
   else{
    setdata(
      data.filter((value, index)=>{
       return value.name.toLowerCase().includes(searchdata.toLowerCase())
      })
    )
    
   }
   
  };

  return (
    <div className=" ">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 p-0">
            <input
              type="text"
              placeholder="Search...."
              className="form-control mb-3"
              onChange={(e) => {
                setsearchdata(e.target.value);
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

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Email</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map((value, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index}</th>
                      <td>{value.name}</td>
                      <td>{value.email}</td>
                      <td></td>
                    </tr>
                  );
                })
              : "No Data found"}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Searchfilter;
