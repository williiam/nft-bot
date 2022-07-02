import { render, screen } from '@testing-library/react'
import LandingPage from '../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<LandingPage />)

    const heading = screen.getByRole('heading', {
      name: /Home Page/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
