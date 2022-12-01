import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import CircleSlider from './CircularSlider';
export default function App() {
  const [sliderValue, setSliderValue] = useState(1 / 6);
  console.log('slidervalue', (sliderValue / 6).toFixed());
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //   backgroundColor: 'black',
      }}>
      <CircleSlider
        value={sliderValue}
        max={359}
        onValueChange={x => x}
        setSliderValue={setSliderValue}>
        <Text>{sliderValue}</Text>
      </CircleSlider>
    </View>
  );
}

const styles = StyleSheet.create({});
