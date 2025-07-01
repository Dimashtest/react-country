import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import countriesData from '../data/countries.json'; // Импорт ваших данных

export function DisciplinesPage() { // Имя компонента
    const { disciplineId } = useParams(); // Получаем индекс дисциплины
    const [disciplineInfo, setDisciplineInfo] = useState(null);
    const [countriesWithDisciplineMedals, setCountriesWithDisciplineMedals] = useState([]);

    useEffect(() => {
        if (countriesData && countriesData[0] && countriesData[0].countries) {
            // Сначала формируем список уникальных дисциплин, как в DisciplineList
            const uniqueDisciplines = [];
            const seenDisciplineNames = {};

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
            uniqueDisciplines.sort((a, b) => a.name.localeCompare(b.name));

            // Находим выбранную дисциплину по индексу
            const selectedDiscipline = uniqueDisciplines[parseInt(disciplineId, 10)];

            if (selectedDiscipline) {
                const countriesMedalData = [];

                // Теперь фильтруем страны, чтобы получить медали только для этой дисциплины
                countriesData[0].countries.forEach(country => {
                    const disciplineInCountry = country.disciplines.find(
                        d => d.name.toLowerCase() === selectedDiscipline.name.toLowerCase()
                    );
                    if (disciplineInCountry) {
                        countriesMedalData.push({
                            name: country.name,
                            flag: country.flag ? `/${country.flag}` : null,
                            gold: disciplineInCountry.gold,
                            silver: disciplineInCountry.silver,
                            bronze: disciplineInCountry.bronze,
                            totalMedals: disciplineInCountry.gold + disciplineInCountry.silver + disciplineInCountry.bronze,
                            countryIndex: countriesData[0].countries.findIndex(c => c.name === country.name) // Для ссылки на страницу страны
                        });
                    }
                });

                setDisciplineInfo(selectedDiscipline);
                // Сортируем страны по общему количеству медалей (от большего к меньшему)
                setCountriesWithDisciplineMedals(
                    countriesMedalData.sort((a, b) => b.totalMedals - a.totalMedals)
                );
            } else {
                setDisciplineInfo(null);
                setCountriesWithDisciplineMedals([]);
            }
        }
    }, [disciplineId]); // Зависимость от disciplineId

    // Если дисциплина не найдена, показываем сообщение
    if (!disciplineInfo) {
        return (
            <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }}>
                <div className="absolute flex justify-center items-center ">
                    {/* Проверьте, что эти файлы существуют в папке public */}
                    <img src="/logo-sm-white.png" alt="Paris Logo" />
                </div>
                <Link
                    to={`/disciplines`}
                    className="absolute top-4 left-4 p-2"
                >
                    <img src="/ico-prev.svg" alt="prev" className="h-6" />
                </Link>
                <div className="text-red-500 mt-20 text-center text-xl">
                    Дисциплина не найдена.
                </div>
            </div>
        );
    }

    return (
        <div className="p-10 flex flex-col items-center min-h-screen text-white bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }}>
            <div className="absolute flex justify-center items-center top-4 ">
                <img src="/logo-sm-white.png" alt="Paris Logo" />
            </div>
            {/* Кнопка "Назад" для возврата на список дисциплин */}
            <Link
                to={`/disciplines`}
                className="absolute top-4 left-4 p-2"
            >
                <img src="/ico-prev.svg" alt="prev" className="h-6" />
            </Link>

            <div className="w-full max-w-md relative flex flex-col mt-[100px] items-center gap-6">
                {/* Название дисциплины */}
                <h2 className="text-3xl font-bold text-center mb-3 uppercase">
                    {disciplineInfo.name}
                </h2>

                {/* Иконка дисциплины */}
                {disciplineInfo.image && (
                    <div className="flex justify-center mb-6">
                        <img
                            src={`/${disciplineInfo.image}`}
                            alt={`${disciplineInfo.name} icon`}
                            className="w-40 h-40 object-contain"
                        />
                    </div>
                )}

                {/* Таблица стран с медалями по данной дисциплине */}
                <div className="bg-gray-800 bg-opacity-75 rounded-lg shadow-xl p-4">
                    <div className="grid grid-cols-2 text-center text-lg font-semibold border-b border-gray-600 pb-2 mb-2">
                        <div className="text-left pl-2">COUNTRY</div>
                        <div className="text-right pr-2">MEDALS</div>
                    </div>
                    {countriesWithDisciplineMedals.length > 0 ? (
                        <div className="flex flex-col gap-2">
                            {countriesWithDisciplineMedals.map((country) => (
                                <div
                                    key={country.name}
                                    className="grid grid-cols-2 items-center py-2 px-2 h-17 bg-gray-700 bg-opacity-50 rounded-md"
                                >
                                    <div className="flex items-center gap-2">
                                        {country.flag && (
                                            <img
                                                src={country.flag}
                                                alt={`${country.name} flag`}
                                                className="w-10 h-auto rounded-sm"
                                            />
                                        )}
                                        {/* Ссылка на страницу страны */}
                                        <Link
                                            to={`/disciplines/${disciplineId}/medal/gold`}
                                            className="text-white hover:underline"
                                        >
                                            {country.name}
                                        </Link>
                                    </div>
                                    <div className="text-right pr-2 font-bold">
                                        {country.totalMedals}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400 py-4">Нет данных по странам для этой дисциплины.</p>
                    )}
                </div>
            </div>
        </div>
    );
}