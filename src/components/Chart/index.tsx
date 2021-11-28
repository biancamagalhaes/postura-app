import React, {Component} from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Container, Title } from './style';
import data from "../../ducks/horas.json";

class SimpleLineChart extends Component {
  
  render () {
    console.log(data.horas);
    return (
      <Container>
          <Title>Gráfico em minutos sentados por mês</Title>
          <LineChart
            width={600}
            height={300}
            data={data.horas}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
            <Line
            type='monotone'
            dataKey='horas'
            stroke='#8884d8'
            activeDot={{r: 8}}
            />
            <CartesianGrid strokeDasharray='3 3'/>
            <Tooltip/>
            <YAxis/>
            <XAxis dataKey='dia'/>
            <Legend />
        </LineChart>
      </Container>
      
    );
  }
}

export default SimpleLineChart;