import React, { Component } from "react";
import "./index.css";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 100,
      pause: false,
    };
    // Este enlace es necesario para hacer que `this` funcione en el callback
    this.handleClick = this.handleClick.bind(this);
  }
  timer() {
    this.setState({
      timer: this.state.timer - 1,
    });
    if (this.state.timer < 1) {
      clearInterval(this.intervalId);
    }
  }
  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleClick() {
    console.log("Ingreso al handleClick()");

    this.setState((state) => ({
      pause: !state.pause,
    }));

    if (!this.state.pause) {
      // console.log("Si, Pauso en: ", this.state.timer);
      clearInterval(this.intervalId);
    } else {
      // console.log("Si No, Reanudo en donde quede: ", this.state.timer);
      this.intervalId = setInterval(this.timer.bind(this), 1000);
    }
    console.log("Fin OK, OK");
  }

  render() {
    return (
      <div className="mt-100 layout-column align-items-center justify-content-center">
        <div className="timer-value" data-testid="timer-value">
          {this.state.timer === 0
            ? "Se acabó el tiempo!"
            : `${this.state.timer}`}
        </div>
        <button
          className="large"
          data-testid="stop-button"
          onClick={this.handleClick}
        >
          {this.state.pause ? "Times Up!" : "Stop Timer"}
        </button>
      </div>
    );
  }
}
