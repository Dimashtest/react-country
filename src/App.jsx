import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CountryMain } from './components/CountriesMain'
import { CountryPage } from './components/CountriesPage'
import { CountryList } from './components/CountriesList'

function App() {
  return (
    <div className='min-h-screen text-white flex flex-col items-center justify-center
                    bg-cover bg-center'
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <Router>
        <Routes>
          <Route path='/' element={<CountryMain />} />
          <Route path='/countries' element={<CountryList />} /> {/* НОВЫЙ МАРШРУТ для списка стран */}
          <Route path='/country/:countryId' element={<CountryPage />} /> {/* Маршрут для деталей страны */}
        </Routes>
      </Router>
    </div>
  )
}

export default App