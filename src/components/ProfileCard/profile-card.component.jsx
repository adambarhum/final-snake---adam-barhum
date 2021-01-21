import React from "react";
import profileImg from "../../assets/User_Icon.png";

function ProfileCard(props) {
  let localData = JSON.parse(localStorage.getItem("registerData")) || []
  return (
    <div className="card_container">
      <div className="card">
        <header>
          <div className="controls">
            <div className="controls__back">

            </div>
            <div className="controls__forward">

            </div>
          </div>
          <figure>
            <img src={localData.length?("data:image/png;base64"+localData[0].image):"https://htmlstream.com/preview/unify-v2.6/assets/img-temp/400x450/img5.jpg"} />
          </figure>
          <h1 className="text-center">
            {localData.length ? localData[0].name : "Name"}<span className="verification" title="Verified Bat">
            </span>
          </h1>
          <h2 className="text-center">{localData.length ? localData[0].email : "test@gmail.com"}</h2>
          <p className="text-center">{localData.length ? localData[0].bday : "January 26, 1990"}</p>
          <p className="pronouns text-center">{localData.length ? localData[0].street + "," + localData[0].town : "Address,Street,City"}</p>
        </header>
        <div className="btns_container d-flex justify-content-center">
          <i class="fa fa-sign-out text-danger" aria-hidden="true"
            onClick={
              () => {
                localStorage.clear()
                props.history.push("/")
              }
            }
          ></i>
          <i class="fa fa-gamepad text-success" aria-hidden="true"
            onClick={
              () => {
                props.history.push("/snake-game")
              }
            }
          ></i>
          <i class="fa fa-info-circle text-primary" aria-hidden="true"
            onClick={
              () => {
                props.history.push("/admin")
              }
            }
          ></i>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
