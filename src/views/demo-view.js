import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import toggleConnection from '../logic/bluetooth.js';
import audio from '../logic/sound.js';
import wakeLock from '../logic/wakelock.js';

const CONNECT = 'Connect';
const DISCONNECT = 'Disconnect';

/*
  https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web
*/
class DemoView extends LitElement {
  static get properties() {
    return {
      _deviceConnected: { type: Boolean },
      _graph: { type: Object },
      data: { type: Array },
      bpm: { type: Number },
      sats: { type: Number },
      bar: { type: Number },
      beep: { type: Number },
    };
  }

  constructor() {
    super();
    this._deviceConnected = false;

    this._graph = {};
    this.data = [];
    this.bpm = null;
    this.sats = null;
    this.bar = 0;
    this.beep = 0.3;
  }

  firstUpdated() {
    this._canvas();
  }
  drawLine(x, y, height) {
    const ctx = this._ctx;
    const BASELINE = 150;
    const WIDTH = 2;
    const startX = x * WIDTH;
    const endX = startX + WIDTH;
    const newY = BASELINE - height;
    ctx.clearRect(startX, 0, x, BASELINE);
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, newY);
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.sats < 98 ? '#f44336' : '#2196f3';
    ctx.stroke();
    ctx.closePath();
    return newY;
  }
  async _canvas() {
    const canvas = this.shadowRoot.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    this._ctx = ctx;
  }
  disconnected() {
    this._graph = {};
    this.data = [];
    this.bpm = null;
    this.sats = null;
    this.bar = 0;
    this.beep = 0.3;
  }
  async _toggleConnection(e) {
    this._deviceConnected = await toggleConnection();
    if (this._deviceConnected) wakeLock();
  }
  render() {
    const isHypoxic = this.sats !== null && this.sats < 98 ? true : false;
    const isAbnormalRate = this.bpm !== null && this.bpm < 50 || this.bpm > 80 ? true : false;
    const hasAlarm = isHypoxic || isAbnormalRate;
    const classList = {
      alarm: hasAlarm,
      animated: hasAlarm,
      shake: hasAlarm,
      sats: isHypoxic,
      bpm: isAbnormalRate,
    };
    if (hasAlarm) {
      audio('alarm');
    } else {
      audio('alarm', false);
    }
    return html`
      <section class="controls">
        <button @click="${this._toggleConnection}">
          ${this._deviceConnected ? DISCONNECT : CONNECT}
        </button>
      </section>
      <section class="container vitals ${classMap(classList)}">
        <figure class="green">
          <section class="bpm">
            <figcaption>HR
                <svg style="opacity: ${this.beep}" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </figcaption>
            <div>${this.bpm}</div>
          </section>
        </figure>
        <figure class="blue">
          <progress max="15" value="${this.bar}">${this.bar}</progress>
          <section class="sats">
            <figcaption>SpO2</figcaption>
            <div>${this.sats}</div>
          </section>
          <canvas width="600" height="150"></canvas>
        </figure>
      </section>
      <section class="container">
        <main>
          <div>Time</div>
          <div>SpO2</div>
          <div>HR</div>
          ${this.data.map((col) => html`
            <div>${col[0]}</div>
            <div>${col[1]}</div>
            <div>${col[2]}</div>
          `)}
        </main>
      </section>
    `;
  }
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
          background-color: #000;
        }
        textarea:focus,
        button:focus,
        select:focus,
        input:focus {
          outline: none;
        }
        textarea,
        button,
        input,
        select {
          font-family: inherit;
          font-size: inherit;
          border: 0;
        }
        button {
          display: block;
          text-align: left;
          color: inherit;
          background-color: transparent;
          padding: 0px;
          line-height: 20px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        summary {
          -webkit-tap-highlight-color: transparent;
        }
        section {
          width: 100%;
        }
        section.container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          height: calc(100vh - 80px);
          width: 100%;
          max-width: 500px;
          color: #fff;
        }
        .controls {
          color: #fff;
          width: 100%;
          position: sticky;
          top: 0;
          height: 60px;
          padding-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vitals figure {
          flex: 1 1 100%;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          background-color: #000;
          transition: color 0.5s ease;
        }
        progress {
          display: block;
          width: 80%;
          align-self: flex-start;
        }
        progress::-webkit-progress-bar {
          background-color: #272727;
        }
        progress::-webkit-progress-value {
          background-color: #2196f3;
          transition: width 0.1s linear;
        }
        progress[value] {
          height: 5px;
          -webkit-appearance: none;
        }
        figure {
          text-align: center;
          margin: 0;
        }
        figure div {
          font-size: 15vh;
          line-height: 15vh;
        }
        figcaption {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        figcaption svg {
          transition: opacity 0.2s;
        }
        svg {
          fill: #F44336;
          margin: 0px 10px;
        }
        main {
          display: grid;
          grid-template-columns: repeat(3, auto);
          grid-gap: 10px 100px;
          padding: 20px;
          justify-content: center;
          overflow: hidden;
          max-height: 80vh;
          align-content: flex-start;
          text-align: center;
        }
        button {
          padding: 5px 12px;
          border: 2px solid #673AB7;
          border-radius: 1rem;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05rem;
          font-weight: 500;
          color: #D1C4E9;
          background-color: #000;
        }
        .bar {
          padding: 0px 3px;
          background-color: ;
          transition: height 0.3s linear;
          border-radius: 0.3em;
        }
        .graph {
          width: 100%;
          height: 150px;
          display: flex;
          align-items: flex-end;
        }
        .indicator {
          height: 100px;
        }
        .bar-narrow {
          width: 1%;
          background-color: #2196f3;
          box-shadow: 0px 0px 4px #2196f3;
        }
        .metric-group {
          display: flex;
          width: 100%;
          justify-content: center;
        }
        .metric-group div.fig {
          display: inline-block;
          font-size: 0.7rem;
          line-height: 1.3em;
          margin: 10px 0px;
          padding: 0px 15px;
          text-align: center;
        }
        .metric-group span {
          font-size: 0.8rem;
        }
        .metric-group figure {
          margin: 0;
          width: 100%;
          font-size: 4rem;
          line-height: 5rem;
          min-width: 100px;
        }
        .green {
          color: #4caf50;
          align-items: center;
        }
        .blue {
          color: #2196f3;
          padding-bottom: 90px;
        }
        .alarm.bpm figure.green,
        .alarm.sats figure.blue {
          color: #f44336 !important;
        }
        canvas {
          width: calc(100% - 40px);
          margin: 0px 10px;
        }
        .animated {
          animation-duration: 1.5s;
          animation-fill-mode: both;
          animation-iteration-count: infinite;
        }
        @-webkit-keyframes shake {
          from,
          to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            -webkit-transform: translate3d(-10px, 0, 0);
            transform: translate3d(-10px, 0, 0);
          }
          20%,
          40%,
          60%,
          80% {
            -webkit-transform: translate3d(10px, 0, 0);
            transform: translate3d(10px, 0, 0);
          }
        }
        @keyframes shake {
          from,
          to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            -webkit-transform: translate3d(-10px, 0, 0);
            transform: translate3d(-10px, 0, 0);
          }
          20%,
          40%,
          60%,
          80% {
            -webkit-transform: translate3d(10px, 0, 0);
            transform: translate3d(10px, 0, 0);
          }
        }
        .shake {
          -webkit-animation-name: shake;
          animation-name: shake;
        }
      `,
    ];
  }
}
customElements.define('demo-view', DemoView);
