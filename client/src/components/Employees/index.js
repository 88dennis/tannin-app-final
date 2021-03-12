import React from "react";
import { ListItem } from "../List";
// import { Link } from "react-router-dom";

import "./style.css";

function Employees({
  handleEmployeeDelete,
  empScores,
  id,
  firstName,
  lastName,
  // empId,
  hideShowEmp,
  // showMeEmp,
  // empfirstName,
  // emplastName,
  // empEmail,
}) {
  console.log(empScores);

  return (
    <div>
      <ListItem>
        <div className="listitemdiv4">
          <div className="empnamediv">
            <div className="empnamecollectionname1">
              {/* <div className="fontitalicsmall">{name}</div> */}
              <div>
                <button className="empnamebtn1" onClick={() => hideShowEmp(id)}>
                  {firstName} {lastName}
                </button>
              </div>
              <div>
                <button
                  className="empdelbtn"
                  onClick={() => handleEmployeeDelete(id)}
                >
                  <i className="fas fa-user-minus lg"></i>
                </button>
              </div>
            </div>
            {/* <div><Link
            className="nav-link" 
            to="/quiz"
          ><button>
            Quiz Page
            </button>
              </Link></div> */}
            <div className="fontitalicbarcode">Id No: {id}</div>

            <div>
           
            </div>
          </div>
        </div>
      </ListItem>
    </div>
  );
}

export default Employees;
