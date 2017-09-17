/**
 * Created by jfhuang on 17/9/12.
 */

import React, { Component } from 'react';


class Clock extends Component {
  constructor (props) {
    super(props);
    this.Constant = {
      button: ['开始', '暂停', '开始'],
      interval: 25
    };
    this.Private = {
      timeId: -1
    };
    this.state = {
      buttonStatus: 0,
      start: -1,
      end: -1
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleCancle = this.handleCancle.bind(this);
  }

  render () {
    const btnText = this.Constant.button[this.state.buttonStatus];
    let cancleBtn = (<span style={{display: 'none'}}></span>);
    if (this.state.buttonStatus) {
      cancleBtn = (<button onClick={this.handleCancle}>取消</button>);
    }
    let timeCost = '0';
    if (this.state.start !== -1 && this.state.end !== -1) {
      timeCost = this.countTime(this.state.end - this.state.start);
    }
    return (
      <div>
        <div>
          <button onClick={this.handleButtonClick}>{btnText}</button>
          {cancleBtn}
        </div>
        <p>{timeCost}</p>
      </div>
    );
  }

  handleButtonClick () {
    let start = this.state.start;;
    let status = 0;
    // 0 -> 1
    if (this.state.buttonStatus === 0) {
      start = Date.now();
      status = 1;
    }
    // 1 -> 2
    if (this.state.buttonStatus === 1) {
      clearInterval(this.Private.timeId);
      status = 2;
    }
    // 2 -> 1
    if (this.state.buttonStatus === 2) {
      status = 1;
    }
    if (this.state.buttonStatus === 0 || this.state.buttonStatus === 2) {
      this.Private.timeId = setInterval(() => {
        this.setState({
          end: Date.now()
        });
      }, this.Constant.interval);
    }
    this.setState({
      buttonStatus: status,
      start
    });
  }

  handleCancle () {
    if (this.state.buttonStatus) {
      clearInterval(this.Private.timeId);
      this.setState({
        buttonStatus: 0,
        start: -1,
        end: -1
      });
    }
  }

  countTime (time) {
    if (time <= 0) {
      return 0;
    }
    const secondMilliSecond = 1000,
          minutesMilliSecond = 60 * secondMilliSecond,
          hoursMilliSecond = 60 * minutesMilliSecond;
    let hours = 0;
    let minutes = 0;
    let second = 0;
    let milliSecond = 0;
    // 获取小时
    hours = Math.floor(time/hoursMilliSecond);
    time %= hoursMilliSecond;

    // 获取分钟
    minutes = Math.floor(time/minutesMilliSecond);
    time %= minutesMilliSecond;

    // 获取秒
    second = Math.floor(time/secondMilliSecond);
    time %= secondMilliSecond;

    // 剩余的毫秒
    milliSecond = time;

    let hoursStr = '';
    if (hours) {
      hoursStr = `${hours ? (hours < 10 ? '0' + hours : hours) : '00'} : `;
    }
    return `${hoursStr}${minutes ? (minutes < 10 ? '0' + minutes : minutes) : '00'}:
            ${second ? (second < 10 ? '0' + second : second) : '00'}:
            ${milliSecond}`;

  }
}

export default Clock;
