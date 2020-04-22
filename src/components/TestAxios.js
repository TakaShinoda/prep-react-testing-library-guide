import React, { useState } from 'react'
import axios from 'axios'

export const TestAxios = ({ url }) => {
    const [data, setData] = useState()

    const fetchData = async () => {
        const response = await axios.get(url)
        setData(response.data.greeting)
    }

    return (
        <>
            <button onClick={fetchData} data-testid="fetch-data">
                Load Data
            </button>
            {data ? (
                <div data-testid="show-data">{data}</div>
            ) : (
                <h1 data-testid="loading">Loading...</h1>
            )}
        </>
    )
}
