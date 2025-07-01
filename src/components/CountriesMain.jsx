// components/CountriesMain.jsx
import { Link } from "react-router-dom"

export function CountryMain() {
  return (
    <div className="flex flex-col items-center text-white justify-center gap-[35px]">
      <img src="/logo-white.png" alt="Olympics logo" className="mt-[-30px]"/> {/* Добавьте alt текст */}
      <img src='/frame.png' alt="Decorative frame"></img> {/* Добавьте alt текст */}
      <div className='flex flex-col items-start gap-5'>
        {/* Изменяем Link, чтобы она вела на /countries */}
        <Link to="/countries" className='w-[300px] flex items-center justify-center gap-3 p-4 border-2 border-white rounded-xl text-lg font-semibold shadow-md bg-gray-800 bg-opacity-50'>
          <img src='/ico-countries.svg' alt="Countries icon"></img>Countries
        </Link>
        <Link to="/disciplines" className='w-[300px] flex items-center justify-center gap-3 p-4 border-2 border-white rounded-xl text-lg font-semibold shadow-md bg-gray-800 bg-opacity-50'>
          <img src='/ico-disciplines.svg' alt="Disciplines icon"></img>Disciplines
        </Link>
      </div>
    </div>
  )
}