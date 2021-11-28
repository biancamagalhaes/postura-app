import React, { useEffect } from "react";
import logo from "../../../public/images/logo.png";
import { Container, StyledImage, ContainerSecond } from "./style";
import YoutubeEmbed from "../../components/Youtube";  
import Chart from "../../components/Chart";
import TcpServerServer from '../../util/tcpServer';
import {getSensor, SetSensorValue} from '../../ducks/user';
import { connect } from "react-redux";

const Reopening = ({setSensorValue}: any): React.ReactElement => {

  const showNotification = () => {
        // create a new notification
        const notification = new Notification('JavaScript Notification API', {
            body: 'This is a JavaScript Notification API demo'
        });
        console.log(notification);
        // close the notification after 10 seconds
        setTimeout(() => {
            notification.close();
        }, 10 * 1000);

        // navigate to a URL when clicked
        notification.addEventListener('click', () => {

            window.open('https://www.javascripttutorial.net/web-apis/javascript-notification/', '_blank');
        });
    }


  useEffect(() => {
    let granted = Notification.permission;
    console.log(granted);
    granted === 'granted' && showNotification();
  }, []);

  useEffect(() => {
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
            <Chart/>
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}> 
                <YoutubeEmbed embedId="i3d5vBz0l-g" />
            </div>
        </ContainerSecond>
    </Container>
  );
};

export default connect(getSensor, (dispatch: any) => ({
    setSensorValue: (code: string) => dispatch(SetSensorValue(code))
}))(Reopening);