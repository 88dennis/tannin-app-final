import React from "react";
import { ListItem } from "../List";
// import { Link } from "react-router-dom";

import "./style.css";

function Restowine({ handleWineDelete, name, id, hideShow }) {
  return (
    <div>
      <ListItem>
        <div className="listitemdiv3">
          <div className="winecollectiondiv1">
            <div className="winecollectionname1">
              {/* <div className="fontitalicsmall">{name}</div> */}
              <div>
                <button className="winenamebtn1" onClick={() => hideShow(id)}>
                  {name}
                </button>
              </div>
              <div>
                <button
                  className="winedelbtn"
                  onClick={() => handleWineDelete(id)}
                >
                  <i className="fas fa-minus-circle"></i>
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
            <div className="fontitalicbarcode">Product Id: {id}</div>
            <div></div>
          </div>
        </div>
      </ListItem>
    </div>
  );
}

export default Restowine;
