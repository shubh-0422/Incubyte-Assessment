import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('String Calculator', () => {
    it('returns 0 for an empty string', () => {
        render(<App />);
        const inputField = screen.getByTestId('input-field');
        fireEvent.change(inputField, { target: { value: '' } });
        const button = screen.getByTestId('calculate-button');
        fireEvent.click(button);
        const result = screen.getByTestId('result');
        expect(result).toHaveTextContent('Result: 0');
    });

    it('returns the sum of two numbers', () => {
        render(<App />);
        const inputField = screen.getByTestId('input-field');
        fireEvent.change(inputField, { target: { value: '1,2' } });
        const button = screen.getByTestId('calculate-button');
        fireEvent.click(button);
        const result = screen.getByTestId('result');
        expect(result).toHaveTextContent('Result: 3');
    });

    it('ignores numbers larger than 1000', () => {
        render(<App />);
        const inputField = screen.getByTestId('input-field');
        fireEvent.change(inputField, { target: { value: '1001,2' } });
        const button = screen.getByTestId('calculate-button');
        fireEvent.click(button);
        const result = screen.getByTestId('result');
        expect(result).toHaveTextContent('Result: 2');
    });

    it('throws an error for negative numbers', () => {
        render(<App />);
        const inputField = screen.getByTestId('input-field');
        fireEvent.change(inputField, { target: { value: '1,-2,3' } });
        const button = screen.getByTestId('calculate-button');
        fireEvent.click(button);
        const result = screen.getByTestId('result');
        expect(result).toHaveTextContent('Negatives not allowed: -2');
    });

    it('supports custom delimiters', () => {
        render(<App />);
        const inputField = screen.getByTestId('input-field');
        fireEvent.change(inputField, { target: { value: '//;\n1;2' } });
        const button = screen.getByTestId('calculate-button');
        fireEvent.click(button);
        const result = screen.getByTestId('result');
        expect(result).toHaveTextContent('Result: 3');
    });
});
