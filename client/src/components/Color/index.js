import React  from 'react'
import "./style.css";

class Color extends React.Component {
  
  render () {
    let style = {
      backgroundColor: this.props.hexCode
    }
    return (
      // <div className="color" onClick={this.props.update.bind(this, this.props.index)} style={style}>
      //   {this.props.children}
      //   <p className="color__code">{this.props.hexCode}</p>
      // </div>

            <div className="color" style={style}>
        {this.props.children}
      
        {/* <p className="color__code">{this.props.hexCode}</p> */}
      </div>
    );
  }
};

export default Color;
