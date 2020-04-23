import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { TestEvents } from './TestEvents'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)
// Upボタンがクリックされたときにカウンター+1されるか
it('increments counter', () => {
    const { getByTestId } = render(<TestEvents />)
    // fireEvent.clickによりクリックイベントを発生
    fireEvent.click(getByTestId('button-up'))
    expect(getByTestId('counter')).toHaveTextContent('1')
})

// Downボタンがクリックされたときにカウンターが-1されるか
it('decrements counter', () => {
    const { getByTestId } = render(<TestEvents />)
    fireEvent.click(getByTestId('button-down'))
    expect(getByTestId('counter')).toHaveTextContent('-1')
})