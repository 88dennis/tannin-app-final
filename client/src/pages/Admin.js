import React, { Component } from "react";
// import Jumbotron from "../components/Jumbotron";
import Restowine from "../components/Restowine";
import Employees from "../components/Employees";
import Addemployee from "../components/Addemployee";
// // import Footer from "../components/Footer";
import Header from "../components/Header";
import Userinfo from "../components/Userinfo";

import API from "../utils/API";
import { Container } from "../components/Grid";
import { List } from "../components/List";
// import { Link } from "react-router-dom";
import "./style.css";
import WineDetails from "../components/WineDetails";
import EmployeeDetails from "../components/EmployeeDetails";
import Wines from "./Wines";

class Admin extends Component {
  state = {
    restaurants: [],
    employeesList: [],
    winesMaster: [],
    wineCollections: [],

    showMe: false,
    showMe2: false,
    showMe3: false,
    showMeEmp: false,
    // text: "add wine",
    wineId: "",
    wineName: "",
    wineAcidity: "",
    wineAgeability: "",
    wineAlcohol: "",
    wineBody: "",
    wineCountry: "",
    wineDecant: "",
    wineGlassType: "",
    winePairings: [],
    winePrimaryFlavors: [],
    winePronunciation: "",
    wineRegion: "",
    wineSummary: "",
    wineSweetness: "",
    wineTannin: "",
    wineTemp: "",
    wineVarietal: [],

    empId: "",
    empfirstName: "",
    emplastName: "",
    empEmail: '"',
    empScores: [],

    user: "",
    // restaurantId: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    // loginemail: "",
    // loginpassword: "",
    loggedIn: true,
    redirectTo: null,

    greet: "",
    userId: "",
    usefirstName: "",
    uselastName: "",
    useEmail: "",
    userestaurantName: "",
    currentPage: "AdminPage",

    messageEmpExist: "",
  };

  componentDidMount() {
    let userId = {
      userId: this.props.match.params.userId,
    };

    let curPage = {
      currentPage: "userpage",
    };
    this.getUser(userId, curPage);
    console.log(this.props.match.params);

    this.getMaster();
  }

  getUser = (userId, curPage) => {
    API.getUser(userId, curPage).then((response) => {
      console.log("LOGGED IN USER: ", response.data);
      if (response.data) {
        console.log("THERE IS A USER");
        console.log(response.data);
        this.setState({
          loggedIn: true,
          user: response.data,
        });
        this.getSavedWine();
      } else {
        this.setState({
          loggedIn: false,
          user: null,
        });
        this.props.history.push(`/`);
      }
    });
  };

  getMaster = () => {
    API.getMaster()
      .then((res) => {
        console.log("COMEBACK FROM MASTER");
        console.log(res.data);
        console.log("MASTER");
        this.setState({
          winesMaster: res.data,
        });
      })
      .catch(() =>
        this.setState({
          message: "Wine not available",
        })
      );
  };

  getSavedWine = () => {
    console.log("////////////////");
    console.log(this.state.user.restaurantId);
    console.log("////////////////");
    const admin = { restaurantId: this.state.user.restaurantId };
    API.getSavedWine(admin)
      .then((res) => {
        // console.log(res.data);
        console.log("DEDADAEDAEDAEDAEDDA");
        console.log(res.data._id);
        console.log(res.data);

        // console.log(res.data[0]);
        console.log("SAVESTAFF");
        console.log("SAVESTAFF");
        this.setState({
          employeesList: res.data.Employees,
          wineCollections: res.data.Wines,
        });
      })
      .catch(() =>
        this.setState({
          message: "Wine not available",
        })
      );
  };

  handleWineDelete = (id) => {
    console.log("/////");
    console.log(id);
    const delelteWine = { id: id, restaurantId: this.state.user.restaurantId };
    console.log(delelteWine);
    API.deleteWine(delelteWine).then((res) => this.componentDidMount());
  };

  //======================
  //EMPLOYE METHODS
  //======================
  handleAddEmployeeChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleAddEmpolyeeFormSubmit = (event) => {
    event.preventDefault();
    this.addEmployee();
    // this.hideShow2();
  };

  addEmployee = () => {
    // console.log(restaurantId)
    const employeeData = {
      name: this.state.name,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      restaurantId: this.state.user.restaurantId,
      restaurantName: this.state.user.restaurantName,
    };
    console.log("ADDRESNAME?????");
    console.log(employeeData);
    let objVals = Object.values(employeeData);

    let checker = function (objValsArr) {
      for (let i = 0; i < objValsArr.length; i++) {
        if (objValsArr[i].trim() === "") {
          return false;
        }
      }
      return true;
    };
    console.log(checker(objVals));

    if (checker(objVals)) {
      API.addEmployee(employeeData).then((res) => {
        console.log("ADD Employees");
        console.log(res.data.employee);
        // console.log(res.data.restaurant);
        if (res.data === "Employee already exists") {
          this.setState({
            messageEmpExist: employeeData.email + " " + res.data,
          });
          alert(this.state.messageEmpExist);
          this.hideShowEmpForm();
        } else {
          // let email = res.data.email
          alert("added " + employeeData.email);
          this.state.employeesList.unshift(res.data.employee);
          this.setState({
            employeesList: this.state.employeesList,
          });
          this.hideShowEmpForm();
          // this.hideShow2();
        }
      });
      this.setState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        restaurantId: "",
        restaurantName: "",
      });
      this.homeButton();
    } else {
      alert("complete the fields");
    }
  };

  handleEmployeeDelete = (id) => {
    const deleteEmp = { id: id, restaurantId: this.state.user.restaurantId };
    console.log("??????????????");
    console.log(deleteEmp);
    console.log("??????????????");
    // const deleltData = {id: id, restaurantId: this.state.restaurantId}
    API.deleteEmployee(deleteEmp).then((res) => this.componentDidMount());
  };

  //================
  //HIDESHOW METHODS
  //================

  hideShow = (id) => {
    const newState = { ...this.state };
    const wine = this.state.wineCollections.find((wine) => wine._id === id);
    newState.currentPage = "WineDetails";
    newState.wineId = id;
    newState.wineName = wine.name;
    newState.wineAcidity = wine.acidity;
    newState.wineAgeability = wine.ageability;
    newState.wineAlcohol = wine.alcohol;
    newState.wineBody = wine.body;
    newState.wineCountry = wine.country;
    newState.wineDecant = wine.decant;
    newState.wineGlassType = wine.glassType;
    newState.winePairings = wine.pairings;
    newState.winePrimaryFlavors = wine.primaryFlavors;
    newState.winePronunciation = wine.pronunciation;
    newState.wineRegion = wine.region;
    newState.wineSummary = wine.summary;
    newState.wineSweetness = wine.sweetness;
    newState.wineTannin = wine.tannin;
    newState.wineTemp = wine.temp;
    newState.wineVarietal = wine.varietal;
    newState.showMe = !newState.showMe;
    newState.scale = this.state.scale > 1 ? 1 : 1.5;
    this.setState(newState);
  };

  hideShowWineMasterDetail = (id) => {
    const newState = { ...this.state };

    const wine = this.state.winesMaster.find((wine) => wine._id === id);
    newState.currentPage = "WineDetails";
    newState.wineId = id;
    newState.wineName = wine.name;
    newState.wineAcidity = wine.acidity;
    newState.wineAgeability = wine.ageability;
    newState.wineAlcohol = wine.alcohol;
    newState.wineBody = wine.body;
    newState.wineCountry = wine.country;
    newState.wineDecant = wine.decant;
    newState.wineGlassType = wine.glassType;
    newState.winePairings = wine.pairings;
    newState.winePrimaryFlavors = wine.primaryFlavors;
    newState.winePronunciation = wine.pronunciation;
    newState.wineRegion = wine.region;
    newState.wineSummary = wine.summary;
    newState.wineSweetness = wine.sweetness;
    newState.wineTannin = wine.tannin;
    newState.wineTemp = wine.temp;
    newState.wineVarietal = wine.varietal;
    // newState.showMe = !newState.showMe
    // newState.scale = this.state.scale > 1 ? 1 : 1.5
    this.setState(newState);
  };

  hideShowEmp = (id) => {
    const newState = { ...this.state };
    const emp = this.state.employeesList.find((emp) => emp._id === id);
    newState.empId = id;
    newState.empfirstName = emp.firstName;
    newState.emplastName = emp.lastName;
    newState.empEmail = emp.email;
    newState.empScores = emp.scores;
    // newState.showMeEmp = !newState.showMeEmp
    newState.currentPage = "EmployeeDetails";
    this.setState(newState);
    console.log(newState.empScores);
  };

  hideShowEmpForm = () => {
    const newState = { ...this.state };
    // newState.showMe2 = !newState.showMe2
    newState.currentPage = "AddEmployeeForm";
    // newState.scale = this.state.scale > 1 ? 1 : 1.5

    this.setState(newState);
  };

  homeButton = () => {
    this.setState({
      currentPage: "AdminPage",
    });
  };

  showMasterWineList = () => {
    this.setState({
      currentPage: "Wines",
    });
  };

  hideShow3 = (id) => {
    const newState = { ...this.state };

    if (newState.user === null) {
      console.log("you lose");
      newState.greet = "Hello Guest";
    } else if (newState.user.firstName) {
      newState.greet = "Welcome";
      newState.useId = newState.user._id;
      newState.usefirstName = newState.user.firstName;
      newState.uselastName = newState.user.lastName;
      newState.useEmail = newState.user.email;
      newState.userestaurantName = newState.user.restaurantName;
      console.log(newState.useId);
    }

    newState.showMe3 = !newState.showMe3;
    this.setState(newState);
  };

  handleLogout = () => {
    console.log("logging out");
    API.logOut().then((response) => {
      console.log(response.data);
      this.setState({
        loggedIn: false,
        user: null,
      });
      // this.props.history.push(`/`);
      this.props.history.replace({
        pathname: "/",
        state: null,
      });
    });

    // this.setState(newState)
  };

  renderPage = () => {
    if (this.state.currentPage === "AdminPage") {
      return (
        <>
          <Container>
            <Userinfo
              useId={this.state.useId}
              usefirstName={this.state.usefirstName}
              uselastName={this.state.uselastName}
              userestaurantName={this.state.userestaurantName}
              useEmail={this.state.useEmail}
              showMe3={this.state.showMe3}
              hideShow3={this.hideShow3}
              handleLogout={this.handleLogout}
              greet={this.state.greet}
            ></Userinfo>

            {/* MODAL ----------------------- */}
            {/* <Addemployee
          handleAddEmployeeChange={this.handleAddEmployeeChange}
          handleAddEmpolyeeFormSubmit={this.handleAddEmpolyeeFormSubmit}
          id={this.state.id}
          restaurant={this.state.restaurant}
          name={this.state.name}
          lastName={this.state.lastName}
          email={this.state.email}
          password={this.state.password}
          //  loginemail={this.state.loginemail}
          //  loginpassword={this.state.loginpassword}
          showMe2={this.state.showMe2}
          hideShowEmpForm={this.hideShowEmpForm}
        ></Addemployee> */}
            {/* MODAL ----------------------- */}

            <div className="wineandemployeewrapper">
              <div className="brandCol">
                <div className="welcomebtnwrap">
                  <div>
                    <div>
                      <button
                        onClick={() => this.hideShow3()}
                        className="welcomebtn"
                      >
                        <Header user={this.state.user} />
                      </button>
                    </div>

                    <div>
                      <Userinfo
                        useId={this.state.useId}
                        usefirstName={this.state.usefirstName}
                        uselastName={this.state.uselastName}
                        userestaurantName={this.state.userestaurantName}
                        useEmail={this.state.useEmail}
                        showMe3={this.state.showMe3}
                        hideShow3={this.hideShow3}
                        handleLogout={this.handleLogout}
                        greet={this.state.greet}
                      ></Userinfo>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wineCol">
                <div className="wineTitleWrap">
                  <div className="wineTitleWrap1">
                    <div className="textadmin">Wines</div>
                    <div>
                      <button
                        onClick={() => this.showMasterWineList()}
                        className="addwinebtnmain"
                      >
                        <i className="fas fa-wine-bottle"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="wineColWrap">
                  <div className="wineColWrap1">
                    {this.state.wineCollections.length ? (
                      <List>
                        {this.state.wineCollections.map((wine) => (
                          <Restowine
                            key={wine._id}
                            id={wine._id}
                            name={wine.name}
                            // key={wine ? wine._id : null}
                            // id={wine ? wine._id : null}
                            // name={wine ? wine.name : null}
                            handleWineDelete={this.handleWineDelete}
                            showMe={this.state.showMe}
                            hideShow={this.hideShow}
                            wineName={this.state.wineName}
                            wineId={this.state.wineId}
                            wineacidity={this.state.wineacidity}
                            wineAgeability={this.state.wineAgeability}
                            wineAlcohol={this.state.wineAlcohol}
                            wineBody={this.state.wineBody}
                            wineDecant={this.state.wineDecant}
                            wineGlassType={this.state.wineGlassType}
                            winePairings={this.state.winePairings}
                            winePrimaryFlavors={this.state.winePrimaryFlavors}
                            winePronunciation={this.state.winePronunciation}
                            wineRegion={this.state.wineRegion}
                            wineSummary={this.state.wineSummary}
                            wineSweetness={this.state.wineSweetness}
                            wineTannin={this.state.wineTannin}
                            wineTemp={this.state.wineTemp}
                            wineVarietal={this.state.wineVarietal}
                          />
                        ))}
                      </List>
                    ) : (
                      <div className="listitemdiv3">
                        <div className="winecollectiondiv1">
                          <div className="winecollectionname1">
                            <div>
                              <button
                                className="winenamebtn1"
                                onClick={() => this.showMasterWineList()}
                              >
                                ADD WINES
                              </button>
                            </div>
                          </div>

                          <div></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* -----------------EMPLOYEES COLUMN------------------- */}
              <div className="employeeCol">
                <div className="empTitleWrap">
                  <div className="empTitleWrap1">
                    <div className="textadmin">Employees</div>
                    <div>
                      <button
                        className="addempbtnmain"
                        onClick={() => this.hideShowEmpForm()}
                      >
                        <i className="fas fa-user-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="employeeColWrap">
                  <div className="employeeColWrap1">
                    {this.state.employeesList.length ? (
                      <List>
                        {this.state.employeesList.map((employee) => (
                          <Employees
                            key={employee._id}
                            id={employee._id}
                            firstName={employee.firstName}
                            lastName={employee.lastName}
                            handleWineDelete={this.handleWineDelete}
                            empId={this.state.empId}
                            empfirstName={this.state.empfirstName}
                            emplastName={this.state.emplastName}
                            empEmail={this.state.empEmail}
                            empScores={this.state.empScores}
                            showMeEmp={this.state.showMeEmp}
                            hideShowEmp={this.hideShowEmp}
                            handleEmployeeDelete={this.handleEmployeeDelete}
                            // Button={() => (
                            //   <button
                            //     onClick={() => this.handleEmployeeDelete(employee._id)}
                            //     className="btn btn-danger ml-2"
                            //   >
                            //     Delete
                            // </button>
                            // )}
                          />
                        ))}
                      </List>
                    ) : (
                      <div className="listitemdiv4">
                        <div className="empnamediv">
                          <div className="empnamecollectionname1">
                            {/* <div className="fontitalicsmall">{name}</div> */}
                            <div>
                              <button
                                className="empnamebtn1"
                                onClick={() => this.hideShowEmpForm()}
                              >
                                ADD EMPLOYEES
                              </button>
                            </div>
                          </div>

                          <div></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 
        <Footer /> */}
          </Container>
        </>
      );
    } else if (this.state.currentPage === "QuizPage") {
      return <>QuizPage</>;
    } else if (this.state.currentPage === "WineDetails") {
      return (
        <>
          <WineDetails
            handleWineDelete={this.handleWineDelete}
            showMe={this.state.showMe}
            hideShow={this.hideShow}
            wineName={this.state.wineName}
            wineId={this.state.wineId}
            wineacidity={this.state.wineacidity}
            wineAgeability={this.state.wineAgeability}
            wineAlcohol={this.state.wineAlcohol}
            wineBody={this.state.wineBody}
            wineDecant={this.state.wineDecant}
            wineGlassType={this.state.wineGlassType}
            winePairings={this.state.winePairings}
            winePrimaryFlavors={this.state.winePrimaryFlavors}
            winePronunciation={this.state.winePronunciation}
            wineRegion={this.state.wineRegion}
            wineSummary={this.state.wineSummary}
            wineSweetness={this.state.wineSweetness}
            wineTannin={this.state.wineTannin}
            wineTemp={this.state.wineTemp}
            wineVarietal={this.state.wineVarietal}
            homeButton={this.homeButton}
          />
        </>
      );
    } else if (this.state.currentPage === "AddEmployeeForm") {
      return (
        <>
          <Addemployee
            handleAddEmployeeChange={this.handleAddEmployeeChange}
            handleAddEmpolyeeFormSubmit={this.handleAddEmpolyeeFormSubmit}
            id={this.state.id}
            restaurant={this.state.restaurant}
            name={this.state.name}
            lastName={this.state.lastName}
            email={this.state.email}
            password={this.state.password}
            //  loginemail={this.state.loginemail}
            //  loginpassword={this.state.loginpassword}
            showMe2={this.state.showMe2}
            hideShowEmpForm={this.hideShowEmpForm}
            homeButton={this.homeButton}
          />
        </>
      );
    } else if (this.state.currentPage === "EmployeeDetails") {
      return (
        <>
          <EmployeeDetails
            empId={this.state.empId}
            empfirstName={this.state.empfirstName}
            emplastName={this.state.emplastName}
            empEmail={this.state.empEmail}
            empScores={this.state.empScores}
            homeButton={this.homeButton}
          />
        </>
      );
    } else if (this.state.currentPage === "Wines") {
      return (
        <>
          <Wines
            winesMaster={this.state.winesMaster}
            homeButton={this.homeButton}
            user={this.state.user}
            hideShowWineMasterDetail={this.hideShowWineMasterDetail}
            getSavedWine={this.getSavedWine}
          />
        </>
      );
    }
  };

  render() {
    return <>{this.renderPage()}</>;
  }
}

export default Admin;
