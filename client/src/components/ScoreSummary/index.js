import React from "react";
import { ListItem } from "../List";
// import { Link } from "react-router-dom";

import "./style.css";

function ScoreSummary({ scores, homeButton }) {
  return (
    <div>
      <button className="btn1logout" onClick={() => homeButton()}>
        Back
      </button>
      <div className="scoreSummaryMain">
        <div className="scoreSummaryDiv">
          {scores.length ? (
            scores.map((item) => {
              return (
                <div key={item._id}>
                  {/* {item.wine} = {parseInt(item.score).toFixed(2)} */}

                  <ListItem>
                    <div className="listitemdiv3">
                      <div className="emppagewinecollectiondiv1">
                        <div className="scoreList">
                          <div className="winecollectionname1">
                            <div>{item.wine}</div>
                            <div>{parseInt(item.score).toFixed(2) + "%"}</div>
                          </div>
                        </div>

                        <div></div>
                      </div>
                    </div>
                  </ListItem>
                </div>
              );
            })
          ) : (
            <h1>Take an exam</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScoreSummary;
