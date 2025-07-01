import { useParams, Link } from 'react-router-dom';
import countryData from '../data/countries.json';

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

export function CountryPageDetail() {
    const { countryId, type } = useParams();
    const country = countryData[0].countries[parseInt(countryId)];

    if (!country) {
        return <p className="text-red-500 mt-10 text-center">Страна не найдена.</p>;
    }

    const totalMedals = country.medals[type];
    const disciplines = country.disciplines
        .filter((d) => d[type] > 0)
        .sort((a, b) => b[type] - a[type]);

    return (
        <div className="p-4 flex flex-col items-center text-white">
            <div className="absolute flex justify-center items-center top-4 ">
                {/* Проверьте, что эти файлы существуют в папке public */}
                <img src="/logo-sm-white.png" alt="Paris Logo" />
            </div>
            {/* Кнопка "Назад" для возврата на главную страницу */}
            <Link
                to={`/country/${countryId}`}
                className="absolute top-4 left-4 p-2"
            >
                <img src="/ico-prev.svg" alt="prev" />
            </Link>

            <div className="w-full max-w-md relative flex flex-col items-center gap-6">
                <h1 className="text-3xl font-bold mb-2">{country.name}</h1>
                <img src={`/${country.flag}`} alt={`${country.name} flag`} className="w-40 h-40 rounded-full mb-4" />


                {/* Медаль и число */}
                <div className="flex flex-col items-center mb-4">
                    <p className="uppercase text-xl tracking-wider">{type} medals</p>
                    <p className={`text-5xl font-bold ${medalColors[type]}`}>{totalMedals}</p>
                </div>

                {/* Таблица дисциплин */}
                <div className="w-full max-w-md border-white pt-4">
                    <div className="grid grid-cols-2 font-semibold py-2 border-b border-white uppercase text-sm">
                        <span className='text-xl'>Discipline</span>
                        <span className="text-right text-xl">Medals</span>
                    </div>

                    {disciplines.map((d, index) => (
                        <div className='w-[250px]'>
                            <div
                                key={index}
                                className="grid grid-cols-2 py-2 border-b text-sm  hover:bg-opacity-10 transition"
                            >
                                <span className='text-xl'>{d.name}</span>
                                <span className="text-right text-xl">{d[type]}</span>
                            </div>
                        </div>
                    ))}

                    {disciplines.length === 0 && (
                        <p className="text-sm mt-4 text-gray-400 text-center">Нет медалей в этой категории.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
