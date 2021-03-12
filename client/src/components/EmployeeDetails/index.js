import React from "react";
// import { ListItem } from "../List";
// import { Link } from "react-router-dom";

import "./style.css";

function EmployeeDetails({
  empScores,
  empId,
  empfirstName,
  emplastName,
  empEmail,
  homeButton
}) {
  console.log(empScores);

  return (
    <div>
         <button className="btn1logout" onClick={() => homeButton()}>Back</button>
            <div>
              {/* {showMeEmp ? */}
              <div>
                <div className="empinfo1">
                  <div className="empinfo2">
                    <div className="empinfo3">
                      <div className="infoempwrap">
                        <div className="infodetails">Id No: {empId}</div>
                        <div className="infodetails">
                          First Name: {empfirstName}
                        </div>
                        <div className="infodetails">
                          Last Name: {emplastName}
                        </div>
                        <div className="infodetails">Email: {empEmail}</div>
                        <div className="infodetails">Test Scores:</div>
                        {empScores.map((score) => {
                          return (
                            <div>
                              <li className="travelcompany-input">
                                <span className="input-label">
                                  Wine: {score.wine}
                                </span>{" "}
                                =
                                <span className="input-label">
                                  {" "}
                                  {parseInt(score.score).toFixed(2)}%
                                </span>
                              </li>
                            </div>
                          );
                        })}

                        {/* {console.log("hoooooy")} */}
                        {console.log(empScores)}
                        {/* <div className="infodetails">Email: {empScores}</div> */}
                      </div>

                      <br></br>
                    </div>
                    <div className="btnwrap">
                      {/* <button><Link
                          
                          to="/admin"
                        >
                          Others
          </Link></button> */}
                      {/* <button className="btnwrap1buserclose" onClick={() => hideShowEmp(empId)}><i className="fas fa-times-circle"></i></button> */}

                    </div>
                  </div>
                </div>
              </div>
              {/* : null
              } */}
            </div>
          </div>
        
      
  );
}

export default EmployeeDetails;
