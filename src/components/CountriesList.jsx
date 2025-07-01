import { Link } from "react-router-dom";
import countriesData from '../data/countries.json'; // Убедитесь, что путь правильный

export function CountryList() {
  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }}>
      {/* Логотипы Paris 2024 сверху */}
      <div className="absolute flex justify-center items-center top-4 ">
        {/* Проверьте, что эти файлы существуют в папке public */}
        <img src="/logo-sm-white.png" alt="Paris Logo"/>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-white mt-20">Countries</h1>

      {/* Кнопка "Назад" для возврата на главную страницу */}
      <Link
        to={`/`}
        className="absolute top-4 left-4 p-2 "
      >
        <img src="/ico-prev.svg" alt="prev"/>
      </Link>

      <div className="flex flex-col gap-4" > {/* Используем flex-col для вертикального списка */}
        {/* Здесь происходит итерация по данным. Если countriesData пуст или не массив, ничего не отобразится. */}
        {countriesData[0].countries.map((country, index) => (

          <Link
            key={country.id} // Убедитесь, что у country.id есть значение
            to={`/country/${index}`} // используем индекс как id, если id нет
            className="flex items-center p-4 bg-gray-700 bg-opacity-70 rounded-lg shadow-md w-[300px]
                       hover:bg-amber-700 hover:scale-105 transition-all duration-300 ease-in-out"
          >
            {/* Флаг слева */}
            {country.flag && ( // Проверяем наличие country.flag
              <img
                src={country.flag} // Путь к изображению флага
                alt={`${country.name} flag`}
                className="w-10 h-auto mr-4 rounded-sm"
              />
            )}
            {/* Название страны */}
            <span className="text-white text-lg font-medium">
              {country.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}