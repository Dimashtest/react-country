import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CountryMain } from './components/CountriesMain'
import { CountryPage } from './components/CountriesPage'
import { CountryList } from './components/CountriesList'
import { CountryPageDetail } from './components/CountriesPageDetail'
import { DisciplineList } from './components/DisciplinesList'
import { DisciplineDetailsPage } from './components/DisciplineDetailsPage'
import { DisciplinesPage } from './components/DisciplinesPage'


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
          <Route path='/country/:countryId/medal/:type' element={<CountryPageDetail />} /> {/* Маршрут для деталей страны */}
          <Route path='/disciplines' element={<DisciplineList />} />
          <Route path='/disciplines/:disciplineId' element={<DisciplinesPage />} />
          <Route path='/disciplines/:disciplineId/medal/:type' element={<DisciplineDetailsPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App