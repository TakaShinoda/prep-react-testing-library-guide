import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { TestElements } from './TestElements'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

// カウンターが0に等しいか
it('should equal to 0', () => {
    const { getByTestId } = render(<TestElements />)
    expect(getByTestId('counter')).toHaveTextContent(0)
})

// ボタンが有効か無効か
it('should be disabled', () => {
    const { getByTestId } = render(<TestElements />)
    expect(getByTestId('button-down')).toBeDisabled()
})
