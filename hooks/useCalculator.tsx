import { useEffect, useRef, useState } from "react";

enum Operator {
  add = '+',
  substract = '-',
  multiply = 'x',
  divide = '/'
}

export const useCalculator = () => {
  const [formula, setFormula] = useState('0');
  
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  useEffect(() => {
    if (lastOperation.current) {
      const firstFormulaPart = formula.split(' ').at(0);
      setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
    } else {
      setFormula(number);
    }
  }, [number]);

  useEffect(() => {
    const subResult = calculateSubResult();
    setPrevNumber(subResult.toString());
  }, [formula]);

  const lastOperation = useRef<Operator>();

  const clear = () => {
    setFormula('0');
    setNumber('0')
    setPrevNumber('0');

    lastOperation.current = undefined;
  }

  const toggleSign = () => {
    if (number.includes('-')) {
      return setNumber(number.replace('-',''));
    } else {
      setNumber('-' + number);
    }
  }

  const deleteLast = () => {
    let currentSign = '';
    let temporalNumber = number;

    if (number.includes('-')) {
      currentSign = '-';
      temporalNumber = number.substring(1);
    }

    if (temporalNumber.length > 1) {
      return setNumber(currentSign + temporalNumber.slice(0, -1));
    }

    setNumber('0');
  }

  const setLastNumber = () => {
    // calculateResult();

    if (number.endsWith('.')) {
      setPrevNumber(number.slice(0,-1))
    }
    setPrevNumber(number);
    setNumber('0');
  }

  const divideOperation = () => {
    lastOperation.current = Operator.divide;
    setLastNumber();
  }

  const multiplyOperation = () => {
    lastOperation.current = Operator.multiply;
    setLastNumber();
  }
  
  const substractOperation = () => {
    lastOperation.current = Operator.substract;
    setLastNumber();
  }

  const addOperation = () => {
    lastOperation.current = Operator.add;
    setLastNumber();
  }

  const calculateSubResult = () => {
    const [firstValue, operation, secondValue] = formula.split(' ');

    const num1 = Number(firstValue);
    const num2 = Number(secondValue); // NaN

    if (isNaN(num2)) return num1;

    switch (operation) {
      case Operator.add:
        return num1 + num2;
      case Operator.substract:
        return num1 - num2;
      case Operator.multiply:
        return num1 * num2;
      case Operator.divide:
        return num1 / num2;
      default:
        throw new Error(`Operation ${operation} not implemented`);
    }
  }

  const calculateResult = () => {
    const result = calculateSubResult();
    setFormula(`${result}`);

    lastOperation.current = undefined;
    setPrevNumber('0');
  }

  const buildNumber = (numberStr: string) => {
    // Verificar si existe punto decimal
    if (number.includes('.') && numberStr === '.') return;
    if (number.startsWith('0') || number.startsWith('-0')) {
      if (numberStr === '.') {
        return setNumber(number + numberStr);
      }

      // evaluar si es otro cero y no es punto 
      if (numberStr === '0' && number.includes('.')) {
        return setNumber(number + numberStr)
      };
      
      // Evaluar si es diferente de cero no hay punto decimal y es el primer numero
      if (numberStr !== '0' && !number.includes('.')) {
        return setNumber(numberStr);
      }

      // Evitar 000.000
      if (numberStr === '0' && !number.includes('.')) {
        return;
      }
    }

    setNumber(number + numberStr);
  }

  return {
    // props
    formula,
    number,
    prevNumber,

    // methods
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
  };
}