import { hen, Hen } from '../util/createReducer';
import { createSelector } from 'reselect';
import { RootState } from './state';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { url } from '../util/url';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  data: {horaDeInicio: number, horas: { dia: string, horas: number}[]};
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
  data: [] as any,
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
    data: state.data,
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
      console.log('Sensor 1: ', this.state.sensorOne);
  }

  setSensorTwo(sensorTwo: string){
      this.state.sensorTwo = sensorTwo;
      console.log('Sensor 2: ', this.state.sensorTwo);
  }

  setSensorThree(sensorThree: string){
      this.state.sensorThree = sensorThree;

      console.log('Sensor 3: ', this.state.sensorThree);
  }

  setSensorFour(sensorFour: string){
      this.state.sensorFour = sensorFour;

      console.log('Sensor 4: ', this.state.sensorFour);
  }

  setSensorFive(sensorFive: string){
      this.state.sensorFive = sensorFive;

      console.log('Sensor 5: ', this.state.sensorFive);
  }

  setFirstInsertion(firstInsertion: number){
    this.state.firstInsertion = firstInsertion;
  }

  updateData(data: any){
    this.state.data = data;
    setTimeout(() => {toast("Qua tal fazer uma pausa e caminhar um pouco!");}, 20*60000);
  }

  updateHour(){
      const d = new Date();
      const dia = `${d.getDate()}/${d.getMonth()+1}`;
      const objIndex = this.state.data.horas.findIndex((obj: any) => obj.dia === dia);
      console.log(this.state.firstInsertion);
      this.state.data.horas[objIndex].horas = (d.getHours() + 1) - this.state.data.horaDeInicio;
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
      .post(url+'user/login', {code: "H¬¶Ô"})
      .then((result: any) => {
        dispatch(actions.setCode(result.data.code));
        dispatch(actions.setLoading(false));
      })
      .catch((e) => {
        console.log(e);
        dispatch(actions.setLoading(false));
        throw Error(e.response.dataJson.error);
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
    const dia = `${d.getDate()}/${d.getMonth()+1}`;
    const data = dispatch(GetJson()) as any;
    data.then((dataJson: any) => {
      const findData = dataJson.horas.find((x: any) => x.dia === `${d.getDate()}/${d.getMonth()+1}`);
      if(!findData){
        dispatch(actions.setFirstInsertion(d.getHours()+1));
        dispatch(UpdateInitialHour(d.getHours()+1));
        dispatch(UpdateChart({dia, horas: 0}));
      }else{
        dispatch(actions.updateHour());
        dispatch(UpdateChart({dia, horas: d.getHours()+1}));
      }
    })
    

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
        throw Error(e?.response?.dataJson?.error);
      });
  };
}

export function UpdateInitialHour(hour: number): ThunkAction<
  Promise<void>,
  RootState,
  any,
  any
> {
  return async (dispatch, _getState) => {
    dispatch(actions.setLoading(true));
    return axios
      .put(url+'user/initialHour', {hour})
      .then(() => {
        dispatch(actions.setLoading(false));
      })
      .catch((e) => {
        dispatch(actions.setLoading(false));
        console.log(e.response);
        throw Error(e.response.dataJson.error);
      });
  };
}

export function UpdateChart(data: any): ThunkAction<
  Promise<void>,
  RootState,
  any,
  any
> {
  return async (dispatch, _getState) => {
    dispatch(actions.setLoading(true));
    return axios
      .put(url+'user/chartData', {data})
      .then(() => {
        dispatch(actions.setLoading(false));
      })
      .catch((e) => {
        dispatch(actions.setLoading(false));
        throw Error(e?.response?.dataJson?.error);
      });
  };
}

export function GetJson(): ThunkAction<
  Promise<void>,
  RootState,
  any,
  any
> {
  return async (dispatch, _getState) => {
    console.log('Fazendo chamada');
    dispatch(actions.setLoading(true));
    return axios
      .get(url+'user/json')
      .then((response) => {
        console.log('recebi a chamada', response);
        dispatch(actions.updateData(response.data.json))
        dispatch(actions.setLoading(false));
        return response.data.json;
      })
      .catch((e) => {
        dispatch(actions.setLoading(false));
        //throw Error(e?.response?.dataJson?.error);
      });
  };
}


