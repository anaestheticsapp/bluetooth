import timely from '../logic/datetime.js';
import audio from '../logic/sound.js';

const demo = document.body.querySelector('demo-view');

let previousMinute = 0;
let xAxis = 0;
let yAxis = 100;

let cache;

let dataTable = [];

/**
 * Parse stream from pulse oximeter
 * 254 = new line
 * Vitals (10) => 254 10 85 || STATUS(1 = no sensor, 0 = ok) || HR SpO2  ? (10-17),  ? (2-234), time (183-201), ? (10-223)
 * Graph (8) => 254 8 86 || X(16-68) 0 X(3-12) X(0-255)-TIME X(0-255)
 */
export function handleData(e) {
  const t = e.target;
  const { value } = t; // ArrayBuffer

  let data = [];
  for (let i = 0; i < value.byteLength; i++) {
    data.push(value.getUint8(i));
  }

  if (value.byteLength > 10) console.warn('length', value.byteLength, data);

  if (cache === undefined) cache = data;

  const [b1, b2, b3] = data;

  if (isVitals(b1, b2, b3)) {
    parseVitals(data.slice(4, 10));

    console.log('vitals',
      `${data[8]}s`, // time
      data[3] === 0 ? 'ok' : `Status ${data[3]}`,
      `HR ${data[4]} SpO2 ${data[5]}`,
      `?${data[6]}`,
      `?${data[7]}`,
      `?${data[9]}`,
    );

    cache = data.slice(10, data.length);
  } else if (isGraph(b1, b2, b3)) {
    parseGraph(data[3]);
    parseSignal(data[5]);

    if (data[5] > 15) console.error(`more than 15 ${data[5]}`);

    console.log('graph',
      data[4] === 0 ? 'ok' : `Status ${data[4]}`,
      `Trace ${data[3]}, ${data[5]}`, // graph height, bar graph
      `Time ${data[6]} ${data[7]}`
    );

    cache = data.slice(8, data.length);
  } else {
    console.error(data);
  }
}

const isVitals = (b1, b2, b3) => b1 === 254 && b2 === 10 && b3 === 85;
const isGraph = (b1, b2, b3) => b1 === 254 && b2 === 8 && b3 === 86;

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

let dir;
function parseSignal(intensity) {
  let trend;
  if (intensity > demo.bar) {
    trend = 'up';
  } else if (intensity < demo.bar) {
    trend = 'down';
  }

  if (trend && dir && trend !== dir) {
    if (trend === 'down') {
      audio('beep', true);
    }
  }

  if (trend) dir = trend;

  //if (intensity > 260) console.error('intensity more than 260', intensity);
  //demo.bar = Math.trunc((intensity / 70) * 100);
  demo.bar = intensity;
}

function parseGraph(graph) {
  demo.beep = graph / 150;

  const height = graph;

  yAxis = demo.drawLine(xAxis, yAxis, height);
  xAxis++;

  if (xAxis > 300) {
    xAxis = yAxis = 0;
  }

  /*
  graph
    //.filter((int) => int < 150) // filter anomalies
    .map((int) => {
      if (int > 50) {
        audio('beep', true);
      }

      demo.beep = int / 150;

      const height = int;

      yAxis = demo.drawLine(xAxis, yAxis, height);
      xAxis++;

      if (xAxis > 300) {
        xAxis = yAxis = 0;
      }
    });
  */
}
