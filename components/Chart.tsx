import React from 'react'
import { View, StatusBar, Dimensions, Text, StyleSheet } from 'react-native'
import {
  LineChart
} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width

const chartConfig = 
  {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 20 // optional, default 3
  }


export default class ChartGraph extends React.Component {
  renderTabBar = () => {
    return <StatusBar hidden/>
  }
  render() {
    const datas = {
      labels: ['1', '2', '3'],
      datasets: [{
        data: this.props.data,
        color: (opacity = 1) => `rgba(61, 176, 215, ${opacity})`, // optional
        strokeWidth: 10 // optional
      }]
   }
    const width = Dimensions.get('window').width
    const height = 220
    return (
      <View>
            <View>
              <Text style={[styles.labelStyle]}>{this.props.name}</Text>
              <LineChart
                data={datas}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
                />
            </View>
    </View> 
    );
  }
}



const styles = StyleSheet.create({
  labelStyle: {
  marginVertical: 10,
  textAlign: 'center',
  fontSize: 16
  },
  graphStyle: {
    marginVertical: 8,
  }
})
