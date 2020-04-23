import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { App } from './App'

afterEach(cleanup)

// App.jsファイルのスナップショットを撮る
it('should take a snapshot', () => {
    const { asFragment } = render(<App />)
    expect(asFragment(<App />)).toMatchSnapshot()
})
 
