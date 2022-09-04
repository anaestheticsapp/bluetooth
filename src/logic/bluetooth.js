import { handleData } from '../adapter/viatom-20f.js';

const DEMO_VIEW = document.body.querySelector('demo-view');

/**
 * https://www.viatomtech.com/fs20f
 */
const DEVICE_NAME = 'VTM 20F';
const SERVICE_UUID = '0000ffe0-0000-1000-8000-00805f9b34fb';
const SERVICES = [
  '00001800-0000-1000-8000-00805f9b34fb',
  '00001801-0000-1000-8000-00805f9b34fb',
  '0000180a-0000-1000-8000-00805f9b34fb',
  '0000fd00-0000-1000-8000-00805f9b34fb',
  '0000ff90-0000-1000-8000-00805f9b34fb',
  '0000ffc0-0000-1000-8000-00805f9b34fb',
  '0000ffe0-0000-1000-8000-00805f9b34fb',
  '0000ffe5-0000-1000-8000-00805f9b34fb',
]

const TEXT_VALUES = new Set([
  '0000ff91',
  '0000ff96',
  '00002a26',
  '00002a27',
  '00002a00',
  '00002a29',
]);
const NUMBER_VALUES = new Set([
  '0000ff92',
  '0000ff93',
  '0000ff95',
  '0000ff97',
  '0000ff98',
  '0000ff9a',
]);

/**
 * Older version of sats probe - no longer supported
 * const DEVICE_NAME = 'PC-60F_SN033668';
 * const SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
 */

let device = null;

async function toggleConnection() {
  try {
    if (device?.gatt?.connected) {
      device.gatt.disconnect();
    } else {
      await connect();
    }
    return !!device?.gatt?.connected;
  } catch (err) {
    console.error(err);
  }
}

async function connect() {
  console.log('connecting...');

  /**
   * Requires user gesture.
   *
   * If not using a ```services``` filter or ```acceptAllDevices: true```, must also use ```optionalServices```.
   *
   * The VIATOM device does not have a company identifier and does not use standardized Bluetooth GATT services
   * - Bluetooth GATT services https://www.bluetooth.com/specifications/specs/
   * - Company identifiers https://www.bluetooth.com/specifications/assigned-numbers/company-identifiers/
   */
  device = await navigator.bluetooth.requestDevice({
    filters: [
      { name: DEVICE_NAME },
    ],
    optionalServices: SERVICES,
    //acceptAllDevices: true,
  });

  console.log(`connected to ${device.name}`);

  const server = await device.gatt.connect();
  const service = await server.getPrimaryService(SERVICE_UUID);
  const characteristics = await service.getCharacteristics();

  const decoder = new TextDecoder('utf-8');

  const services = await server.getPrimaryServices();
  for (const s of services) {
    const characteristics = await s.getCharacteristics();

    console.group(`service ${s.uuid}`);

    for (const characteristic of characteristics) {
      const [uuid] = characteristic.uuid.split('-');

      const availableProps = [];
      for (const key of ['authenticatedSignedWrites', 'broadcast', 'indicate', 'notify', 'read', 'reliableWrite', 'writableAuxiliaries', 'write', 'writeWithoutRespons']) {
        if (characteristic.properties[key]) availableProps.push(key);
      }

      let description;
      try {
        const descriptor = await characteristic.getDescriptor('gatt.characteristic_user_description');
        const value = await descriptor.readValue();
        description = decoder.decode(value).replaceAll('\x00', '');
      } catch (err) {
        // no descriptor
      }

      if (characteristic.properties.read) {
        const read = await characteristic.readValue();

        let value;
        if (TEXT_VALUES.has(uuid)) {
          value = decoder.decode(read).replaceAll('\x00', '');
        } else if (NUMBER_VALUES.has(uuid)) {
          let data = [];
          for (let i = 0; i < read.byteLength; i++) {
            data.push(read.getUint8(i));
          }
          value = data;
        } else {
          let data = [];
          for (let i = 0; i < read.byteLength; i++) {
            data.push(read.getUint8(i));
          }
          value = ['unknown', data, decoder.decode(read)];
        }

        console.log({uuid, description, value}, availableProps);
      } else {
        console.log({uuid, description}, availableProps);
      }
    }

    console.groupEnd();
  }

  for (const characteristic of characteristics) {
    if (characteristic.properties.notify) {
      characteristic.addEventListener('characteristicvaluechanged', handleData);
      characteristic.startNotifications();
    }


    // const userDescription = encoder.encode('Defines the time between measurements.');
    // await descriptor.writeValue(userDescription);
  }

  device.addEventListener('gattserverdisconnected', onDisconnected);
}

function onDisconnected(e) {
  const t = e.target;
  console.log(t.name, 'disconnected');
  device = null;
  DEMO_VIEW.disconnected();
}

export default toggleConnection;
