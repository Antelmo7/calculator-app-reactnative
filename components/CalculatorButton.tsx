import { Colors } from '@/constants/Colors';
import { globalStyles } from '@/styles/global-styles';
import React from 'react';
import { Pressable, Text } from 'react-native';

import * as Haptics from 'expo-haptics';

interface Props {
  label: string;
  color?: string;
  blackText?: boolean;
  onPress: () => void;
  doubleSize?: boolean;
}

export default function CalculatorButton({
  label,
  color = Colors.darkGray,
  blackText = false,
  onPress,
  doubleSize = false
}: Props) {
  return (
    <Pressable
      style={({pressed}) => ({
        ...globalStyles.button,
        backgroundColor: color,
        opacity: pressed ? 0.8 : 1,
        width: doubleSize ? 180 : 80,
      })} 
      onPress={() => {
        Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        );
        onPress();
      } }
    >
      <Text
        style={{
          ...globalStyles.buttonText,
          color: blackText ? 'black' : 'white'
        }}
      >{label}</Text>
    </Pressable>
  );
}