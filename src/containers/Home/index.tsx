import React, {useState, useEffect} from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import logo from "../../../public/images/logo.png";
import image from "../../../public/images/image.png";
import { Container, StyledImage, LeftContainer } from "./style";
import Router from "next/router";
import { getCode, LoginUser, GetJson } from "../../ducks/user";
import { connect } from "react-redux";
import TcpServerServer from '../../util/tcpServer';

const Reopening = ({loginUser, loading, code, getJson}: any): React.ReactElement => {

  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const navigate = () => {
    if(text === ''){
      setError('Chave de acesso está em branco');
    }

    loginUser(text).then(() => {
      Router.push({
        pathname: "/inside"
      });
    }).catch((e) => {
      console.log(e);
      setError('Chave de acesso não encontrada');
    });
  }

  useEffect(() => {
    async function fetchMySocket() {
      try {
        TcpServerServer.establishSocketConnection();
        TcpServerServer.receiveMessageAccess().then((x) => {
          loginUser(x.key).then(() => {
            Router.push({
              pathname: "/inside"
            });
          }).catch(() => {
            setError('Chave de acesso não encontrada');
          });
        });
        
      } catch (error) {
        alert('desculpe tivemos um erro de conecção, tente novamente!');
      }
    }
    fetchMySocket();
  }, []);

  useEffect(() => {
    if(code && code !== ''){
      loginUser(code).then(() => {
        getJson();
        Router.push({
          pathname: "/inside"
        });
      }).catch(() => {
        setError('Chave de acesso não encontrada');
      });
    }
  }, [code]);


  return (
    <Container>
      <LeftContainer>
        <StyledImage src={logo} alt="Logo"/>
        <div style={{display: 'flex', flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
          <Input onChange={(text: string) => setText(text)} error={error}/>
          <Button onClick={() => navigate()} text={loading ? 'Carregando ...' : 'Acessar'}/>
        </div>
      </LeftContainer>
      <StyledImage src={image} alt="Image"/>
    </Container>
  );
};

export default connect(getCode, (dispatch: any) => ({
    loginUser: (code: string) => dispatch(LoginUser(code)),
    getJson: () => dispatch(GetJson()),
}))(Reopening);
