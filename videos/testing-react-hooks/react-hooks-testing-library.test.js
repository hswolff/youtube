import React from 'react';
import MyComponent from './MyComponent';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react';

describe('MyComponent', () => {
  const onCountChange = jest.fn();
  const { getByText } = render(<MyComponent onCountChange={onCountChange} />);

  it('renders default text', () => {
    getByText('Count: 0');
  });

  it('increments count once', () => {
    getByText('Increment Count').click();
    getByText('Count: 1');
  });

  it('increments count 4 times', () => {
    getByText('Increment Count').click();
    getByText('Increment Count').click();
    getByText('Increment Count').click();
    getByText('Count: 4');
  });

  it('calls the mock function', () => {
    getByText('Increment Count').click();
    expect(onCountChange).toBeCalledTimes(1);
  });
});
