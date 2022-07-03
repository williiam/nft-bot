import { render, screen } from '@testing-library/react'
import LandingPage from '../pages/index'
import '@testing-library/jest-dom'

// 
describe('Home', () => {
  it('jest is working', () => {
    // // eslint-disable-next-line react/react-in-jsx-scope
    // render(<LandingPage />)

    // const heading = screen.getByRole('generic', {
    //   name: /^(?![\s\S])/,
    // })

    expect(true).toBeTruthy()
  })
})
