import React, { Component } from "react";
// import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
// import Form from "../components/Form";
import Wine from "../components/Wine";
// import Footer from "../components/Footer";
// import Infowine from "../components/Infowine";
// import { Link } from "react-router-dom";
import API from "../utils/API";
import { Container } from "../components/Grid";
import { List } from "../components/List";

class Wines extends Component {
  state = {};

  // componentDidMount(){
  // console.log("???????????????");

  // console.log(this.props.user)

  // }
  handleWineAdd = (id) => {
    // console.log(this.state);
    // console.log("REID: " + this.state.user.restaurantId);
    const wine = this.props.winesMaster.find((wine) => wine._id === id);
    const wineData = {
      wineId: wine._id,
      restaurantId: this.props.user.restaurantId,
    };
    console.log("ADDWINE INFOR");
    console.log(wineData);
    console.log("ADDWINE INFOR");
    API.addWine(wineData)
      .then((res) => {
        console.log("ADD WINE");
        if (res.data === undefined) {
          console.log("YOU HAVE THAT ON YOU ALREADY");
        } else {
          console.log(res.data);
          this.props.getSavedWine();
        }
        console.log("ADD WINE");
        this.setState({
          wineCollections: res.data.Wines,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Container>
        <div>
          <div>
            <div className="backToRestBtn">
              <h2 className="textcenter">
                <strong>Search for WINES</strong>
              </h2>
            </div>

            <div className="backToRestBtn">
              <button
                onClick={() => this.props.homeButton()}
                className="btnadminpage"
              >
                <i className="fas fa-wine-glass-alt">
                  <span> Your Restaurant</span>
                </i>
              </button>
            </div>

            <div>
              <div>
                <div>
                  <Card title="">
                    {this.props.winesMaster.length ? (
                      <List>
                        {this.props.winesMaster.map((wine) => (
                          <Wine
                            key={wine._id}
                            id={wine._id}
                            name={wine.name}
                            // showMe={this.state.showMe}
                            hideShowWineMasterDetail={
                              this.props.hideShowWineMasterDetail
                            }
                            handleWineAdd={this.handleWineAdd}
                            wineName={wine.wineName}
                            wineId={wine.wineId}
                            wineacidity={wine.wineacidity}
                            wineAgeability={wine.wineAgeability}
                            wineAlcohol={wine.wineAlcohol}
                            wineBody={wine.wineBody}
                            wineDecant={wine.wineDecant}
                            wineGlassType={wine.wineGlassType}
                            winePairings={wine.winePairings}
                            winePrimaryFlavors={wine.winePrimaryFlavors}
                            winePronunciation={wine.winePronunciation}
                            wineRegion={wine.wineRegion}
                            wineSummary={wine.wineSummary}
                            wineSweetness={wine.wineSweetness}
                            wineTannin={wine.wineTannin}
                            wineTemp={wine.wineTemp}
                            wineVarietal={wine.wineVarietal}
                          ></Wine>
                        ))}
                      </List>
                    ) : (
                      <div className="backToRestBtn">
                        <button
                          onClick={() => this.props.homeButton()}
                          className="btnadminpage"
                        >
                          <i className="fas fa-wine-glass-alt">
                            <span> Your Restaurant</span>
                          </i>
                        </button>
                      </div>
                    )}
                  </Card>
                </div>
              </div>
              <div className="backToRestBtn">
                <button
                  onClick={() => this.props.homeButton()}
                  className="btnadminpage"
                >
                  <i className="fas fa-wine-glass-alt">
                    <span> Your Restaurant</span>
                  </i>
                </button>
              </div>
            </div>
          </div>
          {/* -------------------- */}
        </div>
        {/*         
        <Footer /> */}
      </Container>
    );
  }
}

export default Wines;
