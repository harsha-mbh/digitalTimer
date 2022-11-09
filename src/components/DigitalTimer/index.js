import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {timeLeft: 25 * 60, isTimerPaused: true}

  render() {
    const {minutes, seconds, isTimerPaused} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="elapsed-time-container">
            <div className="elapsed-time">
              <h1>{`${minutes} : ${seconds}`}</h1>
              <p>{isTimerPaused ? 'Paused' : 'Running'}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
