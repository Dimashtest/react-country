import { Link } from 'react-router-dom';
import countriesData from '../data/countries.json'; // Импорт ваших данных

export function DisciplineList() {

  const uniqueDisciplines = [];
  const seenDisciplineNames = {};

  if (countriesData && countriesData[0] && countriesData[0].countries) {
    countriesData[0].countries.forEach(country => {
      country.disciplines.forEach(discipline => {
        const disciplineNameLower = discipline.name.toLowerCase();
        if (!seenDisciplineNames[disciplineNameLower]) {
          uniqueDisciplines.push({
            name: discipline.name,
            image: discipline.image
          });
          seenDisciplineNames[disciplineNameLower] = true;
        }
      });
    });
  }

  uniqueDisciplines.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }}>
      {/* Логотипы Paris 2024 сверху */}
      <div className="absolute flex justify-center items-center top-4 ">
        {/* Проверьте, что эти файлы существуют в папке public */}
        <img src="/logo-sm-white.png" alt="Paris Logo" />
      </div>

      <h1 className="text-3xl font-bold mb-8 text-white mt-20">Disciplines</h1>

      {/* Кнопка "Назад" для возврата на главную страницу */}
      <Link
        to={`/`}
        className="absolute top-4 left-4 p-2 "
      >
        <img src="/ico-prev.svg" alt="prev" className="h-6" />
      </Link>

      <div className="flex flex-col gap-4">
        {uniqueDisciplines.length > 0 ? (
          uniqueDisciplines.map((discipline, index) => ( // Используем index здесь
            <Link
              key={discipline.name} // Ключ остается именем для стабильности React
              to={`/disciplines/${index}`} // !!! ИЗМЕНЕНО: Передаем индекс как id !!!
              className="flex h-[60px] items-center p-4 bg-gray-700 bg-opacity-70 rounded-lg shadow-md w-[300px]
                                       hover:bg-amber-700 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              {/* Иконка дисциплины слева */}
              {discipline.image && (
                <img
                  src={`/${discipline.image}`}
                  alt={`${discipline.name} icon`}
                  className="w-10 h-auto mr-4 object-contain"
                />
              )}
              {/* Название дисциплины */}
              <span className="text-white text-lg font-medium">
                {discipline.name}
              </span>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-400">Нет доступных дисциплин.</p>
        )}
      </div>
    </div>
  );
}