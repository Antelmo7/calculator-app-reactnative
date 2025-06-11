import CalculatorButton from '@/components/CalculatorButton'
import ThemeText from '@/components/ThemeText'
import { Colors } from '@/constants/Colors'
import { useCalculator } from '@/hooks/useCalculator'
import { globalStyles } from '@/styles/global-styles'
import React from 'react'
import { View } from 'react-native'

export default function CalculatorApp() {
  const { 
    formula,
    prevNumber,
    buildNumber,
    clear,
    toggleSign,
    deleteLast,
    divideOperation,
    multiplyOperation,
    substractOperation,
    addOperation,
    calculateSubResult,
    calculateResult
  } = useCalculator();

  return (
    <View style={globalStyles.calculatorContainer}>
      {/* resultados */}
      
      <View style={{paddingHorizontal:30, paddingBottom: 20}}>
        <ThemeText variant='h1'>{formula}</ThemeText>
        {
          formula === prevNumber ? (
            <ThemeText variant='h2'> </ThemeText>
          ) :
            (
              <ThemeText variant='h2'>{prevNumber}</ThemeText>
          )}
      </View>

      {/* filas de botones */}
      <View style={globalStyles.row}> 
        <CalculatorButton
          label='C'
          onPress={() => {
            clear();
          }}
          blackText
          color={Colors.lightGray}
        ></CalculatorButton>
        <CalculatorButton
          label='+/-'
          onPress={() => {
            toggleSign();
          }}
          blackText
          color={Colors.lightGray}
        ></CalculatorButton>
        <CalculatorButton
          label='DEL'
          onPress={() => {
            deleteLast();
          }}
          blackText
          color={Colors.lightGray}
        ></CalculatorButton>
        <CalculatorButton
          label='/'
          onPress={() => {
            divideOperation();
          }}
          color={Colors.orange}
        ></CalculatorButton>
      </View>
      <View style={globalStyles.row}> 
        <CalculatorButton
          label='7'
          onPress={() => {
          buildNumber('7')
          }}
        ></CalculatorButton>
        <CalculatorButton
          label='8'
          onPress={() => {
          buildNumber('8')
          }}
        ></CalculatorButton>
        <CalculatorButton
          label='9'
          onPress={() => {
          buildNumber('9')
          }}
        ></CalculatorButton>
        <CalculatorButton
          label='X'
          onPress={() => {
            multiplyOperation();
          }}
          color={Colors.orange}
        ></CalculatorButton>
      </View>
      <View style={globalStyles.row}> 
        <CalculatorButton
          label='4'
          onPress={() => {
          buildNumber('4')
          }}
        ></CalculatorButton>
        <CalculatorButton
          label='5'
          onPress={() => {
          buildNumber('5')
          }}
        ></CalculatorButton>
        <CalculatorButton
          label='6'
          onPress={() => {
          buildNumber('6')
          }}
        ></CalculatorButton>
        <CalculatorButton
          label='-'
          onPress={() => {
            substractOperation();
          }}
          color={Colors.orange}
        ></CalculatorButton>
      </View>
      <View style={globalStyles.row}> 
        <CalculatorButton
          label='1'
          onPress={() => {
          buildNumber('1')
          }}
        ></CalculatorButton>
        <CalculatorButton
          label='2'
          onPress={() => {
          buildNumber('2')
          }}
        ></CalculatorButton>
        <CalculatorButton
          label='3'
          onPress={() => {
          buildNumber('3')
          }}
        ></CalculatorButton>
        <CalculatorButton
          label='+'
          onPress={() => {
            addOperation();
          }}
          color={Colors.orange}
        ></CalculatorButton>
      </View>
      <View style={globalStyles.row}> 
        <CalculatorButton
          label='0'
          onPress={() => {
          buildNumber('0')
          }}
          doubleSize
        ></CalculatorButton>
        <CalculatorButton
          label='.'
          onPress={() => {
          buildNumber('.')
          }}
        ></CalculatorButton>
        <CalculatorButton
          label='='
          onPress={() => {
            calculateResult();
          }}
        ></CalculatorButton>
      </View>
    </View>
  )
}