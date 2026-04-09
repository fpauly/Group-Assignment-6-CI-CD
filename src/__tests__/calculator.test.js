'use strict';

const { add, subtract, multiply, divide } = require('../calculator');

describe('Calculator', () => {
  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('adds a positive and a negative number', () => {
      expect(add(10, -4)).toBe(6);
    });

    test('adds two negative numbers', () => {
      expect(add(-3, -7)).toBe(-10);
    });

    test('adds zero', () => {
      expect(add(5, 0)).toBe(5);
    });
  });

  describe('subtract', () => {
    test('subtracts two positive numbers', () => {
      expect(subtract(10, 4)).toBe(6);
    });

    test('subtracts resulting in a negative number', () => {
      expect(subtract(3, 8)).toBe(-5);
    });

    test('subtracts zero', () => {
      expect(subtract(7, 0)).toBe(7);
    });
  });

  describe('multiply', () => {
    test('multiplies two positive numbers', () => {
      expect(multiply(6, 7)).toBe(42);
    });

    test('multiplies by zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });

    test('multiplies two negative numbers', () => {
      expect(multiply(-3, -4)).toBe(12);
    });

    test('multiplies a positive and a negative number', () => {
      expect(multiply(5, -2)).toBe(-10);
    });
  });

  describe('divide', () => {
    test('divides two positive numbers', () => {
      expect(divide(15, 3)).toBe(5);
    });

    test('divides resulting in a decimal', () => {
      expect(divide(1, 4)).toBe(0.25);
    });

    test('divides a negative by a positive', () => {
      expect(divide(-12, 4)).toBe(-3);
    });

    test('throws an error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
    });
  });
});
