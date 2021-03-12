import React from "react";
import "./style.css";
import Color from "../Color";



class QuestionCard extends React.Component {

    handleBtnDis = (event) => {
        this.setState({disabled: true})
    };

    handleBtnClick = (event) => {
        this.props.handleBtnPoint(event);
        this.handleBtnDis(event)
    };

    handleFlavorClick = (event) => {
        this.props.handleCheckFlavor(event);
        this.handleBtnDis(event)
    };

    handlePairingClick = (event) => {
        this.props.handleCheckPairing(event);
        this.handleBtnDis(event)
    };
    handleVarietalClick = (event) => {
        this.props.handleCheckVarietal(event);
        this.handleBtnDis(event)
    };

    answers = this.props.answers;
    
    falses = this.answers ? this.answers.splice(this.answers.indexOf(this.props[this.props.category]), 1) : null;
    // ans = console.log(this.falses)
    shuffledFalses = this.answers ? this.props.shuffle(this.answers) : null;
    // selections = this.answers ? (this.answers.slice(0, 4)) : null;

    selections = this.answers ? this.answers : null;

    dummThing = this.selections ? (this.selections.push(this.props[`${this.props.category}`])) : null;
    shuffledSelections = this.selections ? this.props.shuffle(this.selections) : null;

    constructor(props) {
        super(props);
        this.state = {

            disabled: false,

            bgColor: [
                '#f89406',
                '#16a085',
                '#68c3a3',
                '#89c4f4',
                '#d5b8ff',
                '#a2ded0',
                '#19b5fe',
                '#f0f0d6',
                '#f4f776',
                '#f2784b',
                '#67809f',
                '#95a5a6',
                '#f1a9a0',
                '#be90d4',
                '#22a7f0',
                '#c8f7c5',
            ],
            selectedColor: '',
             colorsNum: 1,
            colors: [],
            // hexCode
        };

       for (let i = 0; i < this.state.colorsNum; i +=1) {
      this.state.colors.push({hexCode: this.generateColor()});
    }
    }

    componentDidMount() {
        this._getRandomColor()
        console.log(this.props)
        // this.generateColor()
        // this.updateColor(this.state.index)
    }

    _getRandomColor() {
        var item = this.state.bgColor[Math.floor(Math.random() * this.state.bgColor.length)];
        this.setState({
            selectedColor: item,
        })
    }


  generateColor () {
    return '#' +  Math.random().toString(16).substr(-6);
  }
  
  updateColor (index) {
    let colors = this.state.colors.slice();
    const currentColor = this.generateColor();
    colors[index].hexCode = currentColor;
    this.setState({
      colors : colors
    });
 }

    render() {
        console.log(this.answers);
        return (
            <>
            <div className="color-container">
        { this.state.colors.map((color, index) => <Color key={`color-${index}`} index={index} update={this.updateColor.bind(this)} hexCode={color.hexCode}>
        
        
            <div className="qcard" style={{ backgroundColor: "transparent"}}>
                <div className="qcard2">
                    <h2 className="questionName">{this.props.question}{this.props.wineName}?</h2>
                    {/* If false answers are available, render button for each answer, else render a submit (specifically for the flavors question) */}
                    <div>
                        {this.selections ? this.selections.map((answer, index) => {
                            return (
                                answer === this.props[`${this.props.category}`] ?
                                    <div key={index}>
                                        <button className="question" disabled={this.state.disabled} onClick={this.handleBtnClick}
                                            value="1">{answer}</button><br />
                                    </div> : <div key={index}>
                                        <button className="question" disabled={this.state.disabled} onClick={this.handleBtnClick}
                                            value="0">{answer}</button><br />
                                    </div>
                            )
                        }) : this.props.category === "pairings" ? 
                            <div className="AnswerButtons">
                                <input
                                    onChange={this.props.handleInputChange}
                                    value={this.props.submittedPairing}
                                    name="submittedPairing"
                                    type="text"
                                    placeholder="Only submit one pairing"
                                />
                                <button
                                    className="submitAnswer" disabled={this.state.disabled}
                                    onClick={this.handlePairingClick}>
                                    Submit
                                </button>
                            </div>
                            : this.props.category === "primaryFlavors" ?
                            <div className="AnswerButtons">
                                <input
                                    onChange={this.props.handleInputChange}
                                    value={this.props.submittedFlavor}
                                    name="submittedFlavor"
                                    type="text"
                                    placeholder="Only submit one flavor"
                                />
                                <button
                                    className="submitAnswer" disabled={this.state.disabled}
                                    onClick={this.handleFlavorClick}>
                                    Submit
                            </button>
                            </div> 
                            : 
                            <div className="AnswerButtons">
                                <input
                                    onChange={this.props.handleInputChange}
                                    value={this.props.submittedVarietal}
                                    name="submittedVarietal"
                                    type="text"
                                    placeholder="Only submit one varietal"
                                />
                                <button
                                    className="submitAnswer" disabled={this.state.disabled}
                                    onClick={this.handleVarietalClick}>
                                    Submit
                                </button>
                            </div>
                        }

                    </div>
                </div>
            </div>
        
        </Color>) }
      </div>

            </>
        );
    }
}

export default QuestionCard;