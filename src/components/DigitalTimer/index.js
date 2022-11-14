import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimerPaused: true, timerSet: 25, timerValue: 0}

  componentDidMount() {
    this.renderTimer()
  }

  renderTimer = () => {
    const {timerSet} = this.state
    const timeSetinSeconds = timerSet * 60
    this.setState({
      timerValue: timeSetinSeconds,
    })
  }

  onDecrementTimer = () => {
    const {isTimerPaused} = this.state
    if (isTimerPaused === true) {
      this.setState(prevState => ({
        timerSet: prevState.timerSet - 1,
        timerValue: prevState.timerValue - 60,
      }))
    }
  }

  onIncrementTimer = () => {
    const {isTimerPaused} = this.state
    if (isTimerPaused === true) {
      this.setState(prevState => ({
        timerSet: prevState.timerSet + 1,
        timerValue: prevState.timerValue + 60,
      }))
    }
  }

  tick = () => {
    const {isTimerPaused} = this.state
    if (!isTimerPaused) {
      this.timerId = setInterval(() => {
        this.setState(prevState => ({timerValue: prevState.timerValue - 1}))
      }, 1000)
    } else {
      clearInterval(this.timerId)
    }
  }

  onStartOrPause = () => {
    this.setState(
      prevState => ({isTimerPaused: !prevState.isTimerPaused}),
      this.tick,
    )
  }

  onResetTimer = () => {
    this.setState(
      {isTimerPaused: true, timerSet: 25, timerValue: 25 * 60},
      this.tick,
    )
  }

  renderStartPauseButton = () => {
    const {isTimerPaused} = this.state
    return (
      <button
        type="button"
        className="setting-btn"
        onClick={this.onStartOrPause}
      >
        {isTimerPaused ? (
          <>
            <img
              src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
              className="icon"
              alt="play icon"
            />
            <p>Start</p>
          </>
        ) : (
          <>
            <img
              src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
              className="icon"
              alt="pause icon"
            />
            <p>Pause</p>
          </>
        )}
      </button>
    )
  }

  renderResetButton = () => (
    <button type="button" className="setting-btn" onClick={this.onResetTimer}>
      <img
        src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
        className="icon"
        alt="reset icon"
      />
      <p>Reset</p>
    </button>
  )

  renderMinutes = () => {
    const {timerValue} = this.state
    const minutes = Math.floor(timerValue / 60)
    if (minutes < 10) {
      return `0${minutes.toString()}`
    }
    return minutes.toString()
  }

  renderSeconds = () => {
    const {timerValue} = this.state
    const seconds = timerValue % 60
    if (seconds < 10) {
      return `0${seconds.toString()}`
    }
    return seconds.toString()
  }

  render() {
    const {isTimerPaused, timerSet} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time">
              <h1 className="time">{`${this.renderMinutes()}:${this.renderSeconds()}`}</h1>
              <p className="time-status">
                {isTimerPaused ? 'Paused' : 'Running'}
              </p>
            </div>
          </div>
          <div className="settings-container">
            <div className="buttons-container">
              {this.renderStartPauseButton()}
              {this.renderResetButton()}
            </div>
            <p className="instruction">Set Timer Limit</p>
            <div className="adjust-timer-container">
              <button
                type="button"
                className="adjust-icon"
                onClick={this.onDecrementTimer}
              >
                -
              </button>
              <p className="set-time">{timerSet}</p>
              <button
                type="button"
                className="adjust-icon"
                onClick={this.onIncrementTimer}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
