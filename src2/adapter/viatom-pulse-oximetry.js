import timely from '../logic/datetime.js';
import audio from '../logic/sound.js';

const demo = document.body.querySelector('demo-view');

let previousMinute = 0;
let xAxis = 0;
let yAxis = 100;

let dataTable = [];

function parseVitals(arr) {
  const now = timely().format('HH:mm');
  const [bpm, sats] = arr;

  demo.sats = sats;
  demo.bpm = bpm;
  if (now !== previousMinute) {
    previousMinute = now;
    dataTable = [[now, sats, bpm], ...dataTable];
    demo.data = dataTable;
  }
}
function parseSignal(intensity) {
  //if (intensity > 260) console.error('intensity more than 260', intensity);
  demo.bar = Math.trunc((intensity / 70) * 100);
}
function parseGraph(arr) {
  arr
  //.filter((int) => int < 150) // filter anomalies
  .map((int) => {
    if (int > 50) audio('beep', true);
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
 * 254 = new line
 * Vitals (10) => 254 10 85 0 || HR(69) SpO2(98) X(10-17), X(2-234), X(183-201)-TIME, X(10-223)
 * Graph (8) => 254 8 86 || X(16-68) 0 X(3-12) X(0-255)-TIME X(0-255)
 * @param {Array} arr index 5 = SpO2; 6 = HR; 8 = PI; 9 = ?
 */
const isVitals = (f1, f2, f3) => f1 === 254 && f2 === 10 && f3 === 85;
const isGraph = (f1, f2, f3) => f1 === 254 && f2 === 8 && f3 === 86;
let cache;

export function handleData(e) {
  const t = e.target;
  const { value } = t;

  let dataArray = [];
  for (let i = 0; i < t.value.byteLength; i++) {
    dataArray.push(value.getUint8(i));
  }

  if (value.byteLength > 10) console.warn('length', value.byteLength, dataArray);

  if (cache === undefined) cache = dataArray;

  const [f1, f2, f3] = dataArray;
  if (isVitals(f1, f2, f3)) {
    console.log('vitals', dataArray.slice(6, 10));
    parseVitals(dataArray.slice(4, 10));
    parseSignal(dataArray[9]);
    cache = dataArray.slice(10, dataArray.length);
  } else if (isGraph(f1, f2, f3)) {
    console.log(dataArray);
    parseGraph(dataArray.slice(3, 4));
    cache = dataArray.slice(8, dataArray.length);
  } else {
    console.error(dataArray);
  }
}
