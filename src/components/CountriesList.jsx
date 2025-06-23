// components/CountryList.jsx
import { Link } from "react-router-dom"
import countriesData from '../data/countries.json' // Убедитесь, что путь правильный

export function CountryList() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">Выберите страну</h1>

      {/* Кнопка "Назад" для возврата на главную страницу */}
      <Link
        to={`/`}
        className="mb-8 p-3 bg-amber-700 rounded-md hover:bg-amber-900 transition-all"
      >
        Назад к главному меню
      </Link>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {countriesData.map(country => (
          <Link
            key={country.id}
            to={`/country/${country.id}`}
            className="flex flex-col items-center p-4 bg-gray-700 bg-opacity-70 rounded-lg shadow-md
                       hover:bg-amber-700 hover:scale-105 transition-all duration-300 ease-in-out"
          >
            {/* Добавляем флаг */}
            {country.flag && ( // Проверяем, есть ли поле 'flag'
              <img
                src={country.flag} // Путь к изображению флага
                alt={`${country.name} flag`}
                className="w-16 h-auto mb-2 rounded-sm border border-gray-300" // Стили для флага
              />
            )}
            <span className="text-white text-center font-medium">
              {country.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}