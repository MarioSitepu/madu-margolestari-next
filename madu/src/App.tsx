import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Navigation } from '@/components/Navigation'
import Home from '@/pages/Home'
import { AboutUs } from '@/pages/AboutUs'

export function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen w-full flex-col">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
