import io from 'socket.io-client';
const events = require('events');
import { LoginArduino } from "../ducks/user";

class ChatSocketServer {
  socket = null;
  eventEmitter = new events.EventEmitter();

  // Connecting to Socket Server
  establishSocketConnection() {
    try {
      this.socket = io(`http://localhost:8000`);
    }catch(error) {
      console.log(error);
    }
  }

  receiveMessageAccess() {
    return new Promise((resolve, reject) => {
      try {
        this.socket.on('access', (data) => {
          resolve({ key: data.key});
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  receiveMessageChart() {
    return new Promise((resolve, reject) => {
      try {
        this.socket.on('data', (data) => {
          resolve({ sensor: data.sensor, value: data.value});
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new ChatSocketServer();