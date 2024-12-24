import { useState } from 'react';
import './App.css'; 

// Helper function to handle the calculation
function add(numbers) {
    if (!numbers) return 0;

    // Match for custom delimiter(s)
    const customDelimiterMatch = numbers.match(/^\/\/(.+)\n/);
    let delimiter = /,|\n/; // Default delimiters

    // If a custom delimiter is specified
    if (customDelimiterMatch) {
        const delimiterPattern = customDelimiterMatch[1];
        delimiter = new RegExp(delimiterPattern);  // Dynamically set the custom delimiter
        numbers = numbers.slice(customDelimiterMatch[0].length);  // Remove the custom delimiter line
    }

    // Split numbers by the delimiter
    const nums = numbers.split(delimiter).map(Number);
    
    // Filter negative numbers
    const negatives = nums.filter((n) => n < 0);
    if (negatives.length > 0) {
        throw new Error(`Negatives not allowed: ${negatives.join(", ")}`);
    }

    // Ignore numbers greater than 1000
    const filteredNumbers = nums.filter(n => n <= 1000);

    // Return the sum of valid numbers
    return filteredNumbers.reduce((sum, n) => sum + n, 0);
}

const App = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");

    const handleCalculate = () => {
        try {
            const sum = add(input);
            setResult(`Result: ${sum}`);
        } catch (error) {
            setResult(error instanceof Error ? error.message : "An error occurred");
        }
    };

    return (
        <div className="calculator-container" data-testid="calculator-container">
            <h1 data-testid="title">String Calculator</h1>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter numbers (e.g., 1,2 or //;\n1;2)"
                rows={4}
                className="input-textarea"
                data-testid="input-field"
            />
            <button 
                onClick={handleCalculate} 
                className="calculate-button" 
                data-testid="calculate-button"
            >
                Calculate
            </button>
            <p className="result" data-testid="result">{result}</p>
        </div>
    );
};

export default App;
