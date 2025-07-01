import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import countriesData from '../data/countries.json'; // Импорт ваших данных

const medalColors = {
    gold: 'text-yellow-400',
    silver: 'text-gray-300',
    bronze: 'text-orange-500',
};

const medalIcons = {
    gold: '/gold.png',
    silver: '/silver.png',
    bronze: '/bronze.png',
};

export function DisciplineDetailsPage() {
    const { disciplineId, type } = useParams(); // Получаем индекс дисциплины и тип медали
    const [disciplineInfo, setDisciplineInfo] = useState(null);
    const [countriesWithSpecificMedals, setCountriesWithSpecificMedals] = useState([]);
    const [totalMedalsOfType, setTotalMedalsOfType] = useState(0);

    useEffect(() => {
        if (!countriesData || !countriesData[0] || !countriesData[0].countries) {
            return;
        }

        // 1. Формируем список уникальных дисциплин, как в DisciplineList и DisciplinesPage
        const uniqueDisciplines = [];
        const seenDisciplineNames = {};

        countriesData[0].countries.forEach(country => {
            country.disciplines.forEach(discipline => {
                const disciplineNameLower = discipline.name.toLowerCase();
                if (!seenDisciplineNames[disciplineNameLower]) {
                    uniqueDisciplines.push({
                        name: discipline.name,
                        image: discipline.image,
                        // Можете добавить сюда полный путь к изображению, если нужно
                        // fullImagePath: `/${discipline.image}` 
                    });
                    seenDisciplineNames[disciplineNameLower] = true;
                }
            });
        });
        uniqueDisciplines.sort((a, b) => a.name.localeCompare(b.name));

        // 2. Находим выбранную дисциплину по индексу
        const selectedDiscipline = uniqueDisciplines[parseInt(disciplineId, 10)];

        if (selectedDiscipline) {
            setDisciplineInfo(selectedDiscipline);

            let currentTotalMedals = 0;
            const countriesMedalData = [];

            // 3. Перебираем страны, чтобы найти медали выбранного типа для этой дисциплины
            countriesData[0].countries.forEach((country, countryIndex) => {
                const disciplineInCountry = country.disciplines.find(
                    d => d.name.toLowerCase() === selectedDiscipline.name.toLowerCase()
                );

                if (disciplineInCountry && disciplineInCountry[type] > 0) {
                    countriesMedalData.push({
                        name: country.name,
                        flag: country.flag,
                        medalsOfType: disciplineInCountry[type],
                        countryIndex: countryIndex // Сохраняем индекс страны для ссылки обратно на CountryPage
                    });
                    currentTotalMedals += disciplineInCountry[type];
                }
            });

            // 4. Сортируем страны по количеству медалей выбранного типа (от большего к меньшему)
            countriesMedalData.sort((a, b) => b.medalsOfType - a.medalsOfType);

            setCountriesWithSpecificMedals(countriesMedalData);
            setTotalMedalsOfType(currentTotalMedals);

        } else {
            setDisciplineInfo(null);
            setCountriesWithSpecificMedals([]);
            setTotalMedalsOfType(0);
        }
    }, [disciplineId, type]); // Перезапускаем эффект при изменении disciplineId или type

    // Если дисциплина не найдена
    if (!disciplineInfo) {
        return (
            <div className="p-4 flex flex-col items-center justify-center min-h-screen text-white bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }}>
                <div className="absolute flex justify-center items-center top-4 ">
                    <img src="/logo-sm-white.png" alt="Paris Logo" className="h-8" />
                </div>
                <Link
                    to={`/disciplines/${disciplineId}`}
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
        <div className="p-4 flex flex-col items-center text-white min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }}>
            <div className="absolute flex justify-center items-center top-4 ">
                <img src="/logo-sm-white.png" alt="Paris Logo" className="h-8" />
            </div>
            {/* Кнопка "Назад" для возврата на страницу деталей дисциплины */}
            <Link
                to={`/disciplines/${disciplineId}`}
                className="absolute top-4 left-4 p-2"
            >
                <img src="/ico-prev.svg" alt="prev" className="h-6" />
            </Link>

            <div className="w-full max-w-md relative flex flex-col items-center gap-6 mt-16">
                <h1 className="text-3xl font-bold mb-2 uppercase">{disciplineInfo.name}</h1>
                <img 
                    src={disciplineInfo.image ? `/${disciplineInfo.image}` : '/default-discipline-icon.png'} // Путь к изображению дисциплины
                    alt={`${disciplineInfo.name} icon`} 
                    className="w-40 h-40 object-contain rounded-full mb-4" // object-contain для иконок
                />

                {/* Медаль и число */}
                <div className="flex flex-col items-center mb-4">
                    <p className="uppercase text-xl tracking-wider">{type} medals</p>
                    <p className={`text-5xl font-bold ${medalColors[type]}`}>{totalMedalsOfType}</p>
                </div>

                {/* Таблица стран */}
                <div className="w-full max-w-md bg-gray-800 bg-opacity-75 rounded-lg shadow-xl p-4">
                    <div className="grid grid-cols-2 font-semibold py-2 border-b border-gray-600 uppercase text-sm">
                        <span className='text-xl'>Country</span>
                        <span className="text-right text-xl">Medals</span>
                    </div>

                    {countriesWithSpecificMedals.length > 0 ? (
                        <div className="flex flex-col gap-2">
                            {countriesWithSpecificMedals.map((country, index) => (
                                <Link
                                    key={country.name} // Используем имя страны как ключ
                                    to={`/country/${country.countryIndex}`} // Ссылка на страницу страны
                                    className="grid grid-cols-2 items-center py-2 px-2 bg-gray-700 bg-opacity-50 rounded-md
                                               hover:bg-amber-700 hover:scale-105 transition-all duration-300 ease-in-out"
                                >
                                    <div className="flex items-center gap-2">
                                        {country.flag && (
                                            <img
                                                src={`/${country.flag}`} // Путь к флагу страны
                                                alt={`${country.name} flag`}
                                                className="w-6 h-auto rounded-sm"
                                            />
                                        )}
                                        <span className='text-xl'>{country.name}</span>
                                    </div>
                                    <span className="text-right text-xl">{country.medalsOfType}</span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm mt-4 text-gray-400 text-center">Нет медалей данного типа по этой дисциплине.</p>
                    )}
                </div>
            </div>
        </div>
    );
}