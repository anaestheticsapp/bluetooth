import timely from '../logic/datetime.js';
import audio from '../logic/sound.js';

const demo = document.body.querySelector('demo-view');

let cache = [];
let previousMinute = 0;
let xAxis = 0;
let yAxis = 100;

let dataTable = [];

function parseVitals(arr) {
  const now = timely().format('HH:mm');
  const sats = arr[5];
  const bpm = arr[6];

  demo.sats = sats;
  demo.bpm = bpm;
  if (now !== previousMinute) {
    previousMinute = now;
    dataTable = [[now, sats, bpm], ...dataTable];
    demo.data = dataTable;
  }
}
function parseSignal(arr) {
  const intensity = arr.slice(10);
  if (intensity > 260) console.error('intensity more than 260', intensity);
  demo.bar = Math.trunc((intensity / 300) * 100);
}
function parseGraph(arr) {
  arr
  .filter((int) => int < 150) // filter anomalies
  .map((int) => {
    if (int > 80) audio('beep', true);
    //this._graph[this._graphCounter] = int;
    demo.beep = int / 150;
    const height = int;
    yAxis = demo.drawLine(xAxis, yAxis, height);
    xAxis++;
    if (xAxis > 300) xAxis = yAxis = 0;
  });
}
/**
 * Parse stream from pulse oximeter
 * @param {Array} arr index 5 = SpO2; 6 = HR; 8 = PI; 9 = ?
 */
function parseData(arr) {
  console.log(arr);
  switch (arr[3]) {
    case 3:
    case 6:
      return;
    case 8:
      return parseVitals(arr);
    case 7:
      parseSignal(arr);
      return parseGraph(arr.slice(5, 10));
    default:
      console.error('unknown flag', arr);
  }
}

const NEW_LINE_FLAG = 170;

export function handleData(e) {
  const t = e.target;
  let receivedData = new Uint8Array(t.value.byteLength);

  //let rawData = [];
  for (let i = 0; i < t.value.byteLength; i++) {
    receivedData[i] = t.value.getUint8(i);
    const value = t.value.getUint8(i);
    //rawData.push(value);
    if (value == NEW_LINE_FLAG) {
      parseData(cache);
      cache = [value];
    } else {
      cache = [...cache, value];
    }
  }
  //console.log(rawData);
}
