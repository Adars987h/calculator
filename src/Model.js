import Deque from "double-ended-queue";

export class CalculatorModel {
    constructor() {
        this.expression = "";
        this.history = new Deque();
        this.historyLimit = 20;
    }

    appendToExpression(value) {
        const operators = ["+", "-", "*", "/"];
        const lastChar = this.expression.slice(-1);

        if (operators.includes(value) && operators.includes(lastChar)) {
            this.expression = this.expression.slice(0, -1); 
        }

        this.expression += value;
    }

    clearExpression() {
        this.expression = "";
    }

    deleteLast() {
        this.expression = this.expression.slice(0, -1);
    }

    evaluateExpression() {
        if (!this.isValidBrackets()) {
            throw new Error("Invalid Brackets");
        }

        if (this.expression.includes("/0")) {
            throw new Error("Division by Zero");
        }

        const result = eval(this.expression);

        if (this.history.length >= this.historyLimit) {
            this.history.shift(); // Remove the oldest entry if over the limit
        }
        this.history.push({ expression: this.expression, result });

        this.expression = result.toString();
    }

    computeLiveResult() {
        try {
            if (this.expression.trim() === "") return "";
            if (!this.isValidBrackets()) return ""; 
            if (this.expression.includes("/0")) return ""; 

            const result = eval(this.expression);
            return result.toString();
        } catch (error) {
            // console.log(error)
            return ""; // Return empty for invalid cases
        }
    }

    isValidBrackets() {
        const stack = [];
        for (const char of this.expression) {
            if (char === "(") stack.push(char);
            else if (char === ")") {
                if (stack.length === 0) return false; // Unmatched closing bracket
                stack.pop();
            }
        }
        return stack.length === 0; // Ensure no unmatched opening brackets
    }

    getExpression() {
        return this.expression || "0";
    }

    getHistory() {
        return this.history.toArray().reverse(); // Convert deque to array for rendering
    }

    setExpressionAndResult(expression, result) {
        this.expression = expression;
    }
}
