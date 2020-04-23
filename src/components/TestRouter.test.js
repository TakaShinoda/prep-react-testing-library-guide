import React from 'react'
import { Router } from 'react-router-dom'
import { render, cleanup, fireEvent} from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { TestRouter } from './TestRouter'
import '@testing-library/jest-dom/extend-expect'

const renderWithRouter = (component) => {
    // React Routerをテストするには、最初にナビゲーション履歴を用意する必要がある
    const history = createMemoryHistory()
    return { 
    ...render (
    <Router history={history}>
        {component}
    </Router>
    )
  }
}

afterEach(cleanup)

it('should render the home page', () => {
    const { container, getByTestId } = renderWithRouter(<TestRouter />) 
    const navbar = getByTestId('navbar')
    const link = getByTestId('home-link')
    expect(container.innerHTML).toMatch('Home page')
    expect(navbar).toContainElement(link)
})

it('should navigate to the about page', ()=> {
    const { container, getByTestId } = renderWithRouter(<TestRouter />) 
    fireEvent.click(getByTestId('about-link'))
    expect(container.innerHTML).toMatch('About page')
})
  
it('should navigate to the contact page with the params', ()=> {
    const { container, getByTestId } = renderWithRouter(<TestRouter />)  
    fireEvent.click(getByTestId('contact-link'))
    expect(container.innerHTML).toMatch('John Doe')
})
