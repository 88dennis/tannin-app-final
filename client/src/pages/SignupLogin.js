import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import Footer from "../components/Footer";
import SignupLoginForm from "../components/SignupLoginForm";
import API from "../utils/API";
// import { Container } from "../components/Grid";

class SignupLogin extends Component {
  state = {
    showMe: false,
    restaurant: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    loginemail: "",
    loginpassword: "",
    loggedIn: false,
    loginMessage: "",
    signupMessage: "",
    redirectTo: null,
    currentPage: "LandingPage",
  };

  hideShow = () => {
    const newState = { ...this.state };
    // newState.showMe = !newState.showMe;
    newState.currentPage = "LandingPage";

    this.setState(newState);
  };

  handleSubmitInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSignupFormSubmit = async (event) => {
    event.preventDefault();
    const { restaurant, firstName, lastName, email, password } = this.state;
    const userInfo = { firstName, lastName, restaurant, email, password };
    const loginInfor = { email, password };
    let objVals = Object.values(userInfo);
    console.log(objVals);
    let checker = function (objValsArr) {
      for (let i = 0; i < objValsArr.length; i++) {
        if (objValsArr[i].trim() === "") {
          return false;
        }
      }
      return true;
    };

    if (checker(objVals)) {
      if (firstName && lastName && restaurant && email && password) {
        // console.log(checker(objVals));
        // console.log(userInfo);

        API.signUpSubmit(userInfo).then((response) => {
          if (!response.data.error) {
            console.log("youre good");
            API.logIn(loginInfor)
              .then((response) => {
                console.log("USER OBJ: ", response);
                if (response.status === 200) {
                  if (response.data.isAdmin) {
                    this.setState({
                      redirectTo: "/admin/" + response.data._id + "/userpage",
                    });
                  } else {
                    this.setState({
                      redirectTo:
                        "/employeepage/" + response.data._id + "/employee",
                    });
                  }
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            this.setState({
              redirectTo: null,
              loggedIn: false,
              signupMessage: "Email already exist, please log in",
            });
            console.log(response.data.error);
          }
        });
      }
    } else {
      alert("Complete the Fields");
    }
  };

  handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleLoginFormSubmit = (event) => {
    event.preventDefault();
    const loginInfor = {
      email: this.state.loginemail,
      password: this.state.loginpassword,
    };

    let objVals = Object.values(loginInfor);
    console.log(objVals);
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
      API.logIn(loginInfor)
        .then((response) => {
          console.log("USER OBJ: ", response);
          if (response.status === 200) {
            // update the state
            if (response.data.isAdmin) {
              this.setState({
                // loggedIn: true,
                // user: response.data.user,
                redirectTo: "/admin/" + response.data._id + "/userpage",
              });
            } else {
              this.setState({
                redirectTo: "/employeepage/" + response.data._id + "/employee",
              });
            }
          } else {
            this.setState({
              loginMessage: "Email does not exist!",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            loginMessage: "Email does not exist!",
          });
        });
    } else {
      alert("Complete the Fields");
    }
  };

  renderSignUpLoginFormBtn = () => {
    this.setState({
      currentPage: "SignUpLoginPage",
    });
  };

  renderSignUpAndLoginForm = () => {
    if (this.state.currentPage === "SignUpLoginPage") {
      return (
        <>
          <SignupLoginForm
            handleSubmitInputChange={this.handleSubmitInputChange}
            handleSignupFormSubmit={this.handleSignupFormSubmit}
            id={this.state.id}
            restaurant={this.state.restaurant}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            email={this.state.email}
            password={this.state.password}
            handleLoginInputChange={this.handleLoginInputChange}
            handleLoginFormSubmit={this.handleLoginFormSubmit}
            loginemail={this.state.loginemail}
            loginpassword={this.state.loginpassword}
            loginMessage={this.state.loginMessage}
            signupMessage={this.state.signupMessage}
            // showMe={this.state.showMe}
            hideShow={this.hideShow}
          />
        </>
      );
    } else if (this.state.currentPage === "LandingPage") {
      return (
        <>
          <div className="logoWrapper">
            {/* <div className="tannintextwrap2">Tannin</div>
            <div className="loginsignupbtnmainwrap">
              <div className="loginsignupbtnmainwrap2">
                <button
                  className="loginsignupbtnmain"
                  onClick={() => this.renderSignUpLoginFormBtn()}
                >
                  Log In/ Sign Up
                </button>
              </div>
            </div> */}

            <div className="logoTanninWrapper">
              <div className="logoTannin">
                <div>Tannin</div>
                <div>
                  <button
                    className="loginsignupbtnmain"
                    onClick={() => this.renderSignUpLoginFormBtn()}
                  >
                    {" "}
                    Log In/ Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    }
    return <>{this.renderSignUpAndLoginForm()}</>;
  }
}

export default SignupLogin;
