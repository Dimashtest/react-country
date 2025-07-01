import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import countryData from '../data/countries.json';

export function CountryPage() {
    const { countryId } = useParams();
    const [country, setCountry] = useState(null);

    useEffect(() => {
        if (countryData && countryData[0] && countryData[0].countries) {
            const foundCountry = countryData[0].countries[parseInt(countryId)];
            setCountry(foundCountry);
        }
    }, [countryId]);

    return (
        <div className="p-4 flex flex-col items-center text-white">
            <div className="absolute flex justify-center items-center top-4 ">
                {/* Проверьте, что эти файлы существуют в папке public */}
                <img src="/logo-sm-white.png" alt="Paris Logo" />
            </div>
            {/* Кнопка "Назад" для возврата на главную страницу */}
            <Link
                to={`/countries`}
                className="absolute top-4 left-4 p-2"
            >
                <img src="/ico-prev.svg" alt="prev" />
            </Link>
            <div className="w-full max-w-md relative">

                {/* Название страны */}
                {country && (
                    <>
                        <h2 className="text-3xl font-bold text-center mb-3">
                            {country.name}
                        </h2>

                        {/* Флаг */}
                        {country.flag && (
                            <div className="flex justify-center mb-6">
                                <img
                                    src={`/${country.flag}`} // путь к флагу
                                    alt={`${country.name} flag`}
                                    className="w-40 h-40 object-cover rounded-full shadow-lg"
                                />
                            </div>
                        )}

                        {/* Медали */}
                        <div className="grid grid-cols-4 text-center text-sm font-semibold mb-6 border-t border-b py-4 border-white">
                            <div>
                                <p className="text-yellow-400">GOLD</p>
                                <p>{country.medals.gold}</p>
                            </div>
                            <div>
                                <p className="text-gray-300">SILVER</p>
                                <p>{country.medals.silver}</p>
                            </div>
                            <div>
                                <p className="text-orange-500">BRONZE</p>
                                <p>{country.medals.bronze}</p>
                            </div>
                            <div>
                                <p className="text-white">TOTAL</p>
                                <p>
                                    {country.medals.gold +
                                        country.medals.silver +
                                        country.medals.bronze}
                                </p>
                            </div>
                        </div>

                        {/* Кнопки медалей */}
                        <div className="flex flex-col gap-3">
                            <Link to={`/country/${countryId}/medal/gold`} className="flex h-[60px] gap-3 items-center p-4 bg-gray-700 bg-opacity-70 rounded-lg shadow-md w-[300px]
                       hover:bg-amber-700 hover:scale-105 transition-all duration-300 ease-in-out">
                                <img src="/gold.png" alt="gold" className="w-6 h-6" />
                                Gold Medals
                            </Link>
                            <Link to={`/country/${countryId}/medal/silver`} className="flex h-[60px] gap-3 items-center p-4 bg-gray-700 bg-opacity-70 rounded-lg shadow-md w-[300px]
                       hover:bg-amber-700 hover:scale-105 transition-all duration-300 ease-in-out">
                                <img src="/silver.png" alt="silver" className="w-6 h-6" />
                                Silver Medals
                            </Link>
                            <Link to={`/country/${countryId}/medal/bronze`} className="flex h-[60px] gap-3 items-center p-4 bg-gray-700 bg-opacity-70 rounded-lg shadow-md w-[300px]
                       hover:bg-amber-700 hover:scale-105 transition-all duration-300 ease-in-out">
                                <img src="/bronze.png" alt="bronze" className="w-6 h-6" />
                                Bronze Medals
                            </Link>
                        </div>
                    </>
                )}

                {!country && (
                    <div className="text-red-500 mt-10 text-center">
                        Страна не найдена.
                    </div>
                )}
            </div>
        </div>
    );
}
