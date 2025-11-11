import { Navigation } from './components/Navigation'
import { Header } from './components/Header'
import { ProductHighlight } from './components/ProductHighlight'
import { ProductList } from './components/ProductList'
import { InfoSection } from './components/InfoSection'
import { Documentation } from './components/Documentation'
import { Footer } from './components/Footer'
export function App() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Navigation />
      <Header />
      <ProductHighlight />
      <ProductList />
      <InfoSection />
      <Documentation />
      <Footer />
    </div>
  )
}

export default App
