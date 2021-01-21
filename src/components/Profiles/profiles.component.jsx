import React from "react";
import profileImg from "../../assets/User_Icon.png"

function Profiles(props) {
  let localData = JSON.parse(localStorage.getItem("registerData")) || []
  return (
    <div className="profiles_container">
      {localData.length ? <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Address</th>
            <th scope="col">DOB</th>
            <th scope="col">Email</th>
            <th scope="col">Profile</th>
          </tr>
        </thead>
        <tbody>
          {localData.map((userData, i) => (
            <tr>
              <th scope="row px-3 py-3">
                <i class="fa fa-pencil text-primary mr-4" aria-hidden="true" onClick={e => props.history.push("/signup")}></i>
                <i class="fa fa-trash text-danger" aria-hidden="true" onClick={e => {
                  localData.splice(i, 1)
                  localStorage.setItem("registerData", JSON.stringify(localData))
                }}></i>
              </th>
              <td className="px-3 py-3">{userData.street + "," + userData.town}</td>
              <td className="px-3 py-3">{userData.bday.slice(0, 10)}</td>
              <td className="px-3 py-3">{userData.email}</td>
              <td className="px-3 py-3">
                {userData.name}
                <div className="profile-img-name">
                  <img src={"data:image/jpeg;base64" + userData.image} height="200" width="200" alt="" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table> : <div style={{ textAlign: "center" }}>No data available!</div>}
    </div>
  );
}

export default Profiles;
