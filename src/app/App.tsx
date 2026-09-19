import { RouterProvider } from 'react-router'
import { AppProviders, router } from './providers'

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  )
}

export default App
