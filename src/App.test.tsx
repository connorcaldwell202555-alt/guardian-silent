import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Guardian title', () => {
  render(<App />)
  expect(screen.getByText(/GUARDIAN/i)).toBeInTheDocument()
})
