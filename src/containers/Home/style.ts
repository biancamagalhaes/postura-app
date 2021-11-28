import styled from 'styled-components';
import Image from 'next/image';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, #FFFFFF 0%, #F8FDF1 50%, #EAFFFE 100%);
  justify-content: space-between;
  padding: 5vh 2vw;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export const StyledImage = styled(Image)``