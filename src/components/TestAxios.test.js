import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react'
import axiosMock from 'axios'
import { TestAxios } from './TestAxios'
import '@testing-library/jest-dom/extend-expect'

// axiosリクエストをモックする
jest.mock('axios')

afterEach(cleanup)

// 表示するデータがないときに読み込みメッセージが表示されるかどうか確認
it('should display a loading text', () => {
    const {getByTestId} = render(<TestAxios />)
    expect(getByTestId('loading')).toHaveTextContent('Loading...')
})

it('should load and display the data', async () => {
    const url = '/greeting'
    const { getByTestId } = render(<TestAxios url={url} />)
    axiosMock.get.mockResolvedValueOnce({
      data: { greeting: 'hello there' },
    })

    fireEvent.click(getByTestId('fetch-data'))
    
    const greetingData = await waitForElement(() => getByTestId('show-data'))
    
    // HTTP リクエストが正しく行われた場合
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    
    // HTTP リクエストが url で行われている場合
    expect(axiosMock.get).toHaveBeenCalledWith(url)

    // フェッチされたデータが期待値と一致した場合
    expect(greetingData).toHaveTextContent('hello there')
})

