import React, { useEffect } from "react";
import logo from "../../../public/images/logo.png";
import { Container, StyledImage, ContainerSecond } from "./style";
import YoutubeEmbed from "../../components/Youtube";  
import Chart from "../../components/Chart";
import TcpServerServer from '../../util/tcpServer';
import {getSensor, SetSensorValue, GetJson} from '../../ducks/user';
import { connect } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reopening = ({setSensorValue, data, getJson}: any): React.ReactElement => {

  useEffect(() => {
    getJson();
    async function fetchMySocket() {
      try {
        TcpServerServer.establishSocketConnection();
        TcpServerServer.receiveMessageChart().then((x) => {
          setSensorValue(x).then().catch((error: any) => {
            console.log(error)
          });
        });
        
      } catch (error) {
        alert('desculpe tivemos um erro de conecção, tente novamente!');
      }
    }
    fetchMySocket();
  }, []);

  return (
    <Container style={{flex: 1, padding: '5vh 2vw'}}>
        <StyledImage src={logo} alt="Logo"/>
        <ContainerSecond>
            {data.horas && <Chart data={data}/>}
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}> 
                <YoutubeEmbed embedId="i3d5vBz0l-g" />
            </div>
        </ContainerSecond>
        <ToastContainer
          position="bottom-right"
          autoClose={7000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </Container>
  );
};

export default connect(getSensor, (dispatch: any) => ({
    setSensorValue: (code: string) => dispatch(SetSensorValue(code)),
    getJson: () => dispatch(GetJson()),
}))(Reopening);