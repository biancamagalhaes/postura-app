import { hen, Hen } from '../util/createReducer';
import { createSelector } from 'reselect';
import { RootState } from './state';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { url } from '../util/url';
import data from "./horas.json";

export type User = {
    code: string;
};

export interface UserState {
  code: string;
  sensorOne: string;
  sensorTwo: string;
  sensorThree: string;
  sensorFour: string;
  sensorFive: string;
  loading: boolean;
  lastUpdate: string;
  firstInsertion: number;
  error: string | null;
}

export type InitialState = UserState;

const initialState: InitialState = {
  code: '',
  sensorOne: '',
  sensorTwo: '',
  sensorThree: '',  
  sensorFour: '',
  sensorFive: '',
  lastUpdate: '',
  firstInsertion: 24,
  loading: false,
  error: null,
};

const mainSelector = (state: RootState) => state.user;

export const getCode = createSelector(mainSelector, (state) => {
  return {
    loading: state.loading,
    code: state.code,
    error: state.error
  };
});

export const getSensor = createSelector(mainSelector, (state) => {
  return {
    loading: state.loading,
    sensorOne: state.sensorOne,
    sensorTwo: state.sensorTwo,
    sensorThree: state.sensorThree,
    sensorFour: state.sensorFour,
    sensorFive: state.sensorFive,
    lastUpdate: state.lastUpdate,
    firstInsertion: state.firstInsertion,
    error: state.error
  };
});

class EditorReactions extends Hen<InitialState> {
  setLoading(a: boolean) {
    this.state.loading = a;
  }

  setCode(code: string){
      this.state.code = code;
  }

  setSensorOne(sensorOne: string){
      this.state.sensorOne = sensorOne;
  }

  setSensorTwo(sensorTwo: string){
      this.state.sensorTwo = sensorTwo;
  }

  setSensorThree(sensorThree: string){
      this.state.sensorThree = sensorThree;
  }

  setSensorFour(sensorFour: string){
      this.state.sensorFour = sensorFour;
  }

  setSensorFive(sensorFive: string){
      this.state.sensorFive = sensorFive;
  }

  setFirstInsertion(firstInsertion: number){
      const d = new Date();
      const dia = `${d.getDate()}/${d.getMonth()}`;
      if(this.state.firstInsertion === 24 || firstInsertion === 0){
        this.state.firstInsertion = firstInsertion+1;
        data.horas.push({dia, horas: firstInsertion+1});
      }
  }

  updateHour(){
      const d = new Date();
      const dia = `${d.getDate()}/${d.getMonth()}`;
      const objIndex = data.horas.findIndex((obj: any) => obj.dia === dia);
      console.log(this.state.firstInsertion);
      data.horas[objIndex].horas = this.state.firstInsertion - (d.getHours() + 1);
  }
}

//Reducers
export const [menuReducer, actions] = hen(new EditorReactions(initialState));
export default menuReducer;

export function LoginUser(code: string): ThunkAction<
  Promise<void>,
  RootState,
  any,
  any
> {
  return async (dispatch, _getState) => {
    dispatch(actions.setLoading(true));
    console.log(url+'user/login', code);
    return axios
      .post(url+'user/login', {code})
      .then((result: any) => {
        dispatch(actions.setCode(result.data.code));
        dispatch(actions.setLoading(false));
      })
      .catch((e) => {
        dispatch(actions.setLoading(false));
        throw Error(e.response.data.error);
      });
  };
}

export function SetSensorValue({sensor, value}: any): ThunkAction<
  Promise<void>,
  RootState,
  any,
  any
> {
  return async (dispatch, _getState) => {
    dispatch(actions.setLoading(true));
    const d = new Date();
    const findData = data.horas.find((x: any) => x.dia === `${d.getDate()}/${d.getMonth()}`);
    if(!findData){
      dispatch(actions.setFirstInsertion(d.getHours()));
    }else{
      dispatch(actions.updateHour());
    }

    if(sensor === 1){
      dispatch(actions.setSensorOne(value));
    } else if(sensor === 2){
      dispatch(actions.setSensorTwo(value));
    } else if(sensor === 3){
      dispatch(actions.setSensorThree(value));
    } else if(sensor === 4){
      dispatch(actions.setSensorFour(value));
    } else if(sensor === 5){
      dispatch(actions.setSensorFive(value));
    }
    dispatch(actions.setLoading(false));
  };
}

export function SendNotifictions(code: string): ThunkAction<
  Promise<void>,
  RootState,
  any,
  any
> {
  return async (dispatch, _getState) => {
    dispatch(actions.setLoading(true));
    console.log(url+'user/login', code);
    return axios
      .post(url+'user/login', {code})
      .then(() => {
        if (Notification.permission === 'granted') {
          const notification = new Notification('Conserte sua postura', {
            body: 'Qua tal dar uma pausa de 5min e fazer um alongamento'
          });
          
          notification.onclick = (e) => {
            e.preventDefault();
            window.focus();
            notification.close();
          }
        }
      })
      .catch((e) => {
        dispatch(actions.setLoading(false));
        throw Error(e.response.data.error);
      });
  };
}


