import { handleData } from '../adapter/viatom-pulse-oximetry.js';

const demo = document.body.querySelector('demo-view');

//const DEVICE_NAME = 'PC-60F_SN033668';
const DEVICE_NAME = 'VTM 20F';
const SERVICE_UUID = '0000ffe0-0000-1000-8000-00805f9b34fb';

// did not work
//const SERVICE_UUID = '0000ffc0-0000-1000-8000-00805f9b34fb'; // characteristic 2 notifies
//const SERVICE_UUID = '0000fd00-0000-1000-8000-00805f9b34fb'; // characteristic 1 notifies

let isConnected = false;
let device = null;

function onDisconnected(e) {
  const t = event.target;
  alert('Device ' + t.name + ' is disconnected.');
  isConnected = false;
  device = null;
  demo.disconnected();
}

function disconnect() {
  isConnected = false;
  if (!device) throw new Error('no device found');
  if (!device.gatt.connected) throw new Error('already disconnected');
  device.gatt.disconnect();
  console.log('device disconnected');
}

async function connect() {
  console.log('connecting...');
  device = await navigator.bluetooth.requestDevice({
    optionalServices: [SERVICE_UUID],
    filters: [{ name: DEVICE_NAME }],
    //acceptAllDevices: true,
  });
  const server = await device.gatt.connect();
  const service = await server.getPrimaryService(SERVICE_UUID);
  const characteristics = await service.getCharacteristics();

  for (let i = 0; i < characteristics.length; i++) {
    const c = characteristics[i];
    console.log(i, c);
    if (c.properties.notify) {
      c.addEventListener('characteristicvaluechanged', handleData);
      c.startNotifications();

    }
  }

  console.log('characteristics', characteristics);

  isConnected = true;
  device.addEventListener('gattserverdisconnected', onDisconnected);
}
async function toggleConnection() {
  try {
    if (isConnected) disconnect();
    else await connect();
    return isConnected;
  } catch (error) {
    console.error(error);
  }
}

export default toggleConnection;
