import React from "react";

export const CalculatorView = ({
  expression,
  liveResult,
  onButtonClick,
  history,
  isHistoryVisible,
  onHistoryToggle,
  onHistoryItemClick,
}) => {
  const buttons = [
    "AC", "(", ")", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "⌫", "=" ,
  ];

  return (
    <div className="calculator">
      <div className="display">
        <div className="expression">{expression}</div>
        <div className="live-result">{liveResult || " "}</div>
      </div>
      <div className="buttons">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => onButtonClick(button)}
            className={`btn ${button}`}
          >
            {button}
          </button>
        ))}
      </div>
      <button className="history-toggle" onClick={onHistoryToggle}>
        {isHistoryVisible ? "Hide History" : "Show History"}
      </button>
      {isHistoryVisible && (
        <div className="history-dropdown">
          {history.length > 0 ? (
            history.map((item, index) => (
              <div
                key={index}
                className="history-item"
                onClick={() => onHistoryItemClick(item)}
              >
                <span className="expression">{item.expression}</span> ={" "}
                <span className="result">{item.result}</span>
              </div>
            ))
          ) : (
            <p>No history available</p>
          )}
        </div>
      )}
    </div>
  );
};
