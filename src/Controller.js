import React, { useState } from "react";
import { CalculatorView } from "./View";
import { CalculatorModel } from "./Model";

const CalculatorController = () => {
  const [calculator] = useState(new CalculatorModel());
  const [expression, setExpression] = useState(calculator.getExpression());
  const [liveResult, setLiveResult] = useState("");
  const [history, setHistory] = useState(calculator.getHistory());
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const handleButtonClick = (input) => {
    try{
        if (!isNaN(input) || ["+", "-", "×", "÷", ".", "(", ")"].includes(input)) {
        const sanitizedInput = input === "×" ? "*" : input === "÷" ? "/" : input;
        calculator.appendToExpression(sanitizedInput);
        } else if (input === "AC") {
        calculator.clearExpression();
        } else if (input === "=") {
        calculator.evaluateExpression();
        setHistory([...calculator.getHistory()]);
        } else if (input === "⌫") {
        calculator.deleteLast();
        }
        setExpression(calculator.getExpression());
        setLiveResult(calculator.computeLiveResult());
    } catch(error){
        setExpression("Error")
        if(error.message === 'Invalid Brackets' || error.message === 'Division by Zero')
            setLiveResult(error.message)
        else
            setLiveResult("Error")
    }

  };

  const toggleHistory = () => {
    setIsHistoryVisible(!isHistoryVisible);
  };

  const handleHistoryClick = (item) => {
    calculator.setExpressionAndResult(item.expression, item.result);
    setExpression(item.expression);
    setLiveResult(item.result);
    setIsHistoryVisible(false); // Close the dropdown
  };

  return (
    <CalculatorView
      expression={expression}
      liveResult={liveResult}
      onButtonClick={handleButtonClick}
      history={history}
      isHistoryVisible={isHistoryVisible}
      onHistoryToggle={toggleHistory}
      onHistoryItemClick={handleHistoryClick}
    />
  );
};

export default CalculatorController;
