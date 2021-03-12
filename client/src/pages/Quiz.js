import React, { Component } from "react";
// importing components
// import EmployeePage from "./pages/EmployeePage";
import API from "../utils/API";
import QuestionCard from "../components/QuestionCard";
import Wrapper from "../components/Wrapper";
// importing the question array from the json file
import questions from "../questions.json";
// importing the wine template for testing purposes
// import wineData from "../franciacorta.json"
// import { Link } from "react-router-dom";
//importing css stylings
import "./style.css";

// console.log(questions)
class Quiz extends Component {
  state = {
    wineData: "",
    user: "",
    questions,
    filteredQs: [],
    correctFlavors: [],
    submittedFlavor: "",
    correctPairings: [],
    submittedPairing: "",
    correctVarietal: [],
    submittedVarietal: "",
    counter: 0,
    score: 0,
    highScore: 0,
    // wineData: []
  };

  // componentWillMount shuffles the CharacterCards before the DOM is loaded

  componentWillMount() {
    this.getClickedWine();
    // let userId = {
    //   userId: this.props.match.params.userId
    // }

    // let curPage = {
    //   currentPage: "quiz"
    // }
    // this.getUser(userId, curPage)
    // console.log(this.props.match.params)
  }

  componentDidMount() {
    // this.getClickedWine()
    console.log(this.props.wineData);
    console.log(this.props.user);
  }
  // getUser = (userId, curPage) => {
  //   API.getUser(userId, curPage).then(response => {
  //     console.log("LOGGED IN USER: ", response.data)
  //     if (response.data) {
  //       console.log('THERE IS A USER');
  //       console.log(response.data);
  //       this.setState({
  //         loggedIn: true,
  //         user: response.data,
  //       })
  //       this.getSavedWine()
  //     }
  //     else {
  //       this.setState({
  //         loggedIn: false,
  //         user: null
  //       });
  //       this.props.history.push(`/`);
  //     }
  //   });
  // }

  // getSavedWine = () => {
  //   // console.log("////////////////");
  //   console.log(this.state.user.restaurantId);
  //   // console.log("////////////////");
  //   const admin = { restaurantId: this.state.user.restaurantId };
  //   API.getSavedWine(admin)
  //     .then(res => {
  //       this.setState({
  //         wineCollections: res.data.Wines,
  //       })
  //       this.getClickedWine()
  //     }
  //     )
  //     .catch(() =>
  //       this.setState({
  //         message: "Wine not available"
  //       })
  //     );
  // }

  getClickedWine = () => {
    const wine = this.props.wineData;

    this.setState({
      wineData: this.props.wineData,
      correctFlavors: wine.primaryFlavors,
      correctPairings: wine.pairings,
      correctVarietal: wine.varietal,
    });

    const categories = Object.keys(this.props.wineData);
    const filteredQs = questions.filter((q) => {
      console.log(categories.includes(q.category));

      return categories.includes(q.category);
    });

    this.shuffle(filteredQs);
    this.setState({ filteredQs: filteredQs });
    console.log("????????????????");
    console.log(filteredQs);
  };

  // Here we use the Fisher-Yates alogrithm to randomize the characters array
  shuffle(arr) {
    var j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
    }
    return arr;
  }

  handleInputChange = (event) => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value,
    });
  };

  // Checks the primary flavor against possible correct answers and add 1 point if a match
  handleCheckFlavor = () => {
    const newState = { ...this.state };

    if (
      this.props.wineData.primaryFlavors.includes(this.state.submittedFlavor)
    ) {
      this.setState({
        counter: newState.counter + 1,
        submittedFlavor: "",
      });
    } else {
      this.setState({
        submittedFlavor: "",
      });
    }
  };

  // Check the input pairing against possible correct answers and add 1 point if a match
  handleCheckPairing = () => {
    const newState = { ...this.state };

    if (this.props.wineData.pairings.includes(this.state.submittedPairing)) {
      this.setState({
        counter: newState.counter + 1,
        submittedPairing: "",
      });
    } else {
      this.setState({
        submittedPairing: "",
      });
    }
  };

  // Check the input varietal against possible correct answers and add 1 point if a match
  handleCheckVarietal = () => {
    const newState = { ...this.state };

    if (this.props.wineData.varietal.includes(this.state.submittedVarietal)) {
      this.setState({
        counter: newState.counter + 1,
        submittedVarietal: "",
      });
    } else {
      this.setState({
        submittedVarietal: "",
      });
    }
  };

  // Checks the value of a multiple choice button and adds that to the user's counter
  handleBtnPoint = (event) => {
    let points = parseInt(event.target.value);
    this.setState({
      counter: this.state.counter + points,
    });

    // this.handleScoreCalc();
  };
  handleScoreCalc = () => {
    const newState = { ...this.state };
    // let hundreds = this.state.counter * 100;
    // let total = this.state.filteredQs.length;
    // newState.counter = newState.counter * 100;
    // let totalScore = hundreds / total;
    // let totalScore = newState.counter *100 / newState.filteredQs.length;

    // newState.score = newState.score + totalScore;

    newState.score =
      newState.score + (newState.counter * 100) / newState.filteredQs.length;

    // this.consoleLogCustom(newState.score)
    this.addScore(newState.score);
    this.setState(newState);

    // this.setState({
    //   score: this.state.score + totalScore
    // });

    this.props.homeButtonWithReload();
  };

  consoleLogCustom = (any) => {
    console.log(any);
  };

  handleQuizPageBtn = (id) => {
    const getQuiz = { id: id, restaurantId: this.state.user.restaurantId };
    API.getQuiz(getQuiz).then((res) => this.componentDidMount());
  };

  addScore = (score) => {
    const scoreData = {
      userId: this.props.user._id,
      wine: this.props.wineData.name,
      score: score,
    };
    console.log("SCORE DATA");
    console.log(scoreData);
    API.addScore(scoreData).then((res) => {
      console.log("ADDSCORE");
      console.log(res);
      console.log(res.data.scores);
      // this.props.history.push('/employeepage');
    });
  };

  // renders react elements into the DOM
  render() {
    console.log("SCORE : " + this.state.score);
    console.log("SCORE : " + this.state.counter);

    console.log(this.state.filteredQs);
    return (
      // the parent div into which our components will be rendered
      <div className="background">
        <div className="submitanswersbtnquizwrap">
          <div className="submitanswersbtnquiz">
            <button className="submitFinal" onClick={this.handleScoreCalc}>
              Submit
            </button>

            {/* <Link onClick={()=>{this.props.homeButton()}} to="/employeepage"><button className="closebtnquiz">maybe next time
            </button></Link>
             */}

            <button
              onClick={() => {
                this.props.homeButtonWithReload();
              }}
              className="closebtnquiz"
            >
              Close
            </button>
          </div>
        </div>

        <Wrapper>
          <div className="qcardwrapper1">
            <div className="qcardwrapper2">
              {/* Map over this.state.characters and render a CharacterCard component for each character object */}
              {this.state.filteredQs.map((filteredQ, index) => (
                <QuestionCard
                  key={index}
                  // functions to be inherited as props
                  handleBtnPoint={this.handleBtnPoint}
                  handleInputChange={this.handleInputChange}
                  handleCheckFlavor={this.handleCheckFlavor}
                  handleCheckPairing={this.handleCheckPairing}
                  handleCheckVarietal={this.handleCheckVarietal}
                  shuffle={this.shuffle}
                  submitFlavor={this.state.submitFlavor}
                  //values to be inherited as props
                  id={filteredQ.id}
                  question={filteredQ.question}
                  category={filteredQ.category}
                  answers={filteredQ.falseAnswers}
                  acidity={this.state.wineData.acidity}
                  ageability={this.state.wineData.ageability}
                  alcohol={this.state.wineData.alcohol}
                  body={this.state.wineData.body}
                  color={this.state.wineData.color}
                  decant={this.state.wineData.decant}
                  pairings={this.state.wineData.pairings}
                  region={this.state.wineData.region}
                  sparkling={this.state.wineData.sparkling}
                  sweetness={this.state.wineData.sweetness}
                  temp={this.state.wineData.temp}
                  tannin={this.state.wineData.tannin}
                  varietal={this.state.wineData.varietal}
                  wineName={this.state.wineData.name}
                  counter={this.state.counter}
                />
              ))}
            </div>
          </div>
        </Wrapper>

        <div className="submitanswersbtnquizwrap">
          <div className="submitanswersbtnquiz">
            <button className="submitFinal" onClick={this.handleScoreCalc}>
              Submit
            </button>

            {/* <Link onClick={()=>{this.props.homeButton()}} to="/employeepage"><button className="closebtnquiz">maybe next time
            </button></Link>
             */}

            <button
              onClick={() => {
                this.props.homeButtonWithReload();
              }}
              className="closebtnquiz"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Quiz;
