import { handleData } from '../adapter/viatom-20f.js';

const DEMO_VIEW = document.body.querySelector('demo-view');

/**
 * https://www.viatomtech.com/fs20f
 */
const DEVICE_NAME = 'VTM 20F';
const SERVICE_UUID = '0000ffe0-0000-1000-8000-00805f9b34fb';

/**
 * Older version of sats probe - no longer supported
 * const DEVICE_NAME = 'PC-60F_SN033668';
 * const SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
 */

let isConnected = false;
let device = null;

async function toggleConnection() {
  try {
    if (isConnected) {
      disconnect();
    } else {
      await connect();
    }
    return isConnected;
  } catch (err) {
    console.error(err);
  }
}

function disconnect() {
  isConnected = false;

  if (!device) {
    throw new Error('no device found');
  } else if (!device.gatt.connected) {
    throw new Error('already disconnected');
  }

  device.gatt.disconnect();

  console.log('device disconnected');
}

async function connect() {
  console.log('connecting...');

  device = await navigator.bluetooth.requestDevice({
    filters: [{ name: DEVICE_NAME }],
    optionalServices: [SERVICE_UUID],
    //acceptAllDevices: true,
  });

  console.log(`connected to ${device.name}`);

  const server = await device.gatt.connect();
  const service = await server.getPrimaryService(SERVICE_UUID);
  const characteristics = await service.getCharacteristics();

  for (let i = 0; i < characteristics.length; i++) {
    const characteristic = characteristics[i];

    console.log({ characteristic });

    if (characteristic.properties.notify) {
      characteristic.addEventListener('characteristicvaluechanged', handleData);
      characteristic.startNotifications();
    }
  }

  isConnected = true;
  device.addEventListener('gattserverdisconnected', onDisconnected);
}

function onDisconnected(e) {
  const t = e.target;
  alert('Device ' + t.name + ' is disconnected.');
  isConnected = false;
  device = null;
  DEMO_VIEW.disconnected();
}

export default toggleConnection;
