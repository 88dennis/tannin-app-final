import React from "react";
// import { Link } from "react-router-dom";

import "./style.css";

function WineDetails({
  homeButton,
  wineName,
  wineTemp,
  wineTannin,
  wineSweetness,
  wineSummary,
  winePronunciation,
  winePrimaryFlavors,
  winePairings,
  wineDecant,
  wineGlassType,
  wineBody,
  wineAlcohol,
  wineAgeability,
  wineAcidity,
  wineVarietal,
  wineCountry,
  wineRegion,
}) {
  return (
    <div>
      <button className="btn1logout" onClick={() => homeButton()}>
        Back
      </button>
      <div>
        <div>
          <div className="restowineinfo1">
            <div className="restowineinfo2">
              <div className="restowineinfo3">
                <div className="infowinewrap">
                  {wineName ? (
                    <div className="infodetails">Name: {wineName}</div>
                  ) : null}
                  {winePronunciation ? (
                    <div className="infodetails">
                      Pronunciation: {winePronunciation}
                    </div>
                  ) : null}
                  {wineCountry ? (
                    <div className="infodetails">
                      Country of Origin: {wineCountry}
                    </div>
                  ) : null}
                  {wineRegion ? (
                    <div className="infodetails">Region: {wineRegion}</div>
                  ) : null}
                  {wineSummary ? (
                    <div className="infodetails">Summary: {wineSummary}</div>
                  ) : null}
                  {wineAcidity ? (
                    <div className="infodetails">Acidity: {wineAcidity}</div>
                  ) : null}
                  {wineAgeability ? (
                    <div className="infodetails">
                      Ageability: {wineAgeability}
                    </div>
                  ) : null}
                  {wineAlcohol ? (
                    <div className="infodetails">
                      Alcohol By Volume: {wineAlcohol}
                    </div>
                  ) : null}
                  {wineBody ? (
                    <div className="infodetails">Body: {wineBody}</div>
                  ) : null}
                  {wineSweetness ? (
                    <div className="infodetails">
                      Sweetness: {wineSweetness}
                    </div>
                  ) : null}
                  {wineTannin ? (
                    <div className="infodetails">Tannin: {wineTannin}</div>
                  ) : null}
                  {wineVarietal ? (
                    <div>
                      {" "}
                      Varietal:{" "}
                      {wineVarietal.map((varietal, index) => {
                        return (
                          <div key={index}>
                            <ul className="travelcompany-input">
                              <span className="input-label">{varietal}</span>
                            </ul>
                          </div>
                        );
                      })}{" "}
                    </div>
                  ) : null}

                  {winePrimaryFlavors ? (
                    <div>
                      {" "}
                      Primary Flavors :{" "}
                      {winePrimaryFlavors.map((flavor, index) => {
                        return (
                          <div key={index}>
                            <ul className="travelcompany-input">
                              <span className="input-label">{flavor}</span>
                            </ul>
                          </div>
                        );
                      })}{" "}
                    </div>
                  ) : null}

                  {winePairings ? (
                    <div>
                      {" "}
                      Pairings :{" "}
                      {winePairings.map((pairing, index) => {
                        return (
                          <div key={index}>
                            <ul className="travelcompany-input">
                              <span className="input-label">{pairing}</span>
                            </ul>
                          </div>
                        );
                      })}{" "}
                    </div>
                  ) : null}
                  {wineDecant ? (
                    <div className="infodetails">Decant: {wineDecant}</div>
                  ) : null}
                  {wineGlassType ? (
                    <div className="infodetails">
                      Glass Type: {wineGlassType}
                    </div>
                  ) : null}
                  {wineTemp ? (
                    <div className="infodetails">Serving Temp: {wineTemp}</div>
                  ) : null}
                </div>
              </div>
              <br></br>
              <div className="btnwrap">
                {/* <button><Link
                          className={window.location.pathname === "/admin" ? "nav-link active" : "nav-link"}
                          to="/admin"
                        >
                          admin
          </Link></button> */}
                <button className="btn1logout" onClick={() => homeButton()}>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WineDetails;
