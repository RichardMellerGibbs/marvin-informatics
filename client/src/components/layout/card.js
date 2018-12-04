import React, { Component } from "react";
import PropTypes from "prop-types";

class Card extends Component {
  constructor() {
    super();
    this.state = {
      cardFace: "top",
      cardText: "",
      cardClass: "",
      frontCardClass: "card-show",
      backCardClass: "card-hide"
    };
  }

  componentDidMount() {
    this.setState({ cardText: this.props.cardTitle });
  }

  flipFront = () => {
    this.setState({
      frontCardClass: "card-hide",
      backCardClass: "card-show"
    });
  };

  flipBack = () => {
    this.setState({
      frontCardClass: "card-show",
      backCardClass: "card-hide"
    });
  };

  // flipCard = () => {
  //   if (this.state.cardFace === "top") {
  //     this.setState({
  //       cardFace: "bottom",
  //       cardText: this.props.flipText,
  //       cardClass: "info-card-rear-text"
  //     });
  //   } else {
  //     this.setState({
  //       cardFace: "top",
  //       cardText: this.props.cardTitle,
  //       cardClass: ""
  //     });
  //   }
  // };

  render() {
    return (
      <div className="flex-item">
        <div className="flex-item-inner">
          <div
            className={"card-front " + this.state.frontCardClass}
            onClick={this.flipFront}
          >
            <img
              className="card-image"
              src={require(`../../img/${this.props.cardImage}.png`)}
              alt={this.props.cardImage}
            />
            <div className="text-center card-title">{this.state.cardText}</div>
          </div>

          <div
            className={"card-back " + this.state.backCardClass}
            onClick={this.flipBack}
          >
            <div className="rear-text">{this.props.flipText}</div>
            <hr className="style-seven" />
          </div>
        </div>
      </div>

      // <div
      //   className={"info-card"}
      //   //className={"info-card " + this.state.cardClass}
      //   //Leaving out for the moment
      //   // onClick={this.flipCard}
      // >
      //   <div className="card-front">
      //     <div className="card-image-container">
      //       <img
      //         className="card-image"
      //         src={require(`../../img/${this.props.cardImage}.png`)}
      //         alt={this.props.cardImage}
      //       />
      //     </div>
      //     <div className="text-center card-title">{this.state.cardText}</div>
      //   </div>

      //   <div className="card-back">
      //     This is the card rear text
      //     <div className="text-center card-title">{this.state.cardText}</div>
      //   </div>
      // </div>
    );
  }
}

Card.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  flipText: PropTypes.string.isRequired
};

export default Card;
