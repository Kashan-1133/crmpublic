'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { languages, type Language, languageOptions } from '@/lib/i18n/calculator-locales';
import { Combobox } from '../ui/combobox';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const t = languages[language];

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (
    first: number,
    second: number,
    op: string
  ): number => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return first / second;
      default:
        return second;
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleEquals = () => {
    if (operator && firstOperand !== null) {
      const secondOperand = parseFloat(display);
      const result = calculate(firstOperand, secondOperand, operator);
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };

  const buttons = [
    { label: t.clear, handler: clearDisplay, className: 'col-span-2' },
    { label: '%', handler: () => handleOperator('%') },
    { label: '÷', handler: () => handleOperator('/') },
    { label: '7', handler: () => inputDigit('7') },
    { label: '8', handler: () => inputDigit('8') },
    { label: '9', handler: () => inputDigit('9') },
    { label: '×', handler: () => handleOperator('*') },
    { label: '4', handler: () => inputDigit('4') },
    { label: '5', handler: () => inputDigit('5') },
    { label: '6', handler: () => inputDigit('6') },
    { label: '−', handler: () => handleOperator('-') },
    { label: '1', handler: () => inputDigit('1') },
    { label: '2', handler: () => inputDigit('2') },
    { label: '3', handler: () => inputDigit('3') },
    { label: '+', handler: () => handleOperator('+') },
    { label: '0', handler: () => inputDigit('0'), className: 'col-span-2' },
    { label: '.', handler: inputDecimal },
    { label: '=', handler: handleEquals },
  ];

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-muted-foreground">{t.description}</p>
      </div>

      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
                <CardTitle>{t.cardTitle}</CardTitle>
                <CardDescription>{t.cardDescription}</CardDescription>
            </div>
            <Combobox 
              options={languageOptions}
              value={language}
              onValueChange={(value) => setLanguage(value as Language)}
              triggerPlaceholder={t.language}
              searchPlaceholder="Search language..."
              notFoundText="No language found."
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted text-muted-foreground rounded-lg p-4 text-right text-4xl font-mono break-all">
            {display}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {buttons.map((btn, i) => (
              <Button
                key={i}
                variant={
                  ['÷', '×', '−', '+', '='].includes(btn.label)
                    ? 'default'
                    : 'secondary'
                }
                className={`text-2xl h-16 ${btn.className || ''}`}
                onClick={btn.handler}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
