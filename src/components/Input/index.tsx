import React from "react";
import {Container, Title, Input} from "./style";

const InfoCard = ({onChange, error}: any): React.ReactElement => {

  return (
    <Container>
      <Title>
        Digite sua chave de acesso
      </Title>
      <Input onChange={(e) => onChange(e.target.value)}/>
      {error && <h5 style={{fontWeight: 300, color: 'red', marginTop: '5px'}}>{error}</h5>}
    </Container>
  );
}
  
  export default InfoCard;