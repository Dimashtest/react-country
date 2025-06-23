// components/CountryPage.jsx (это ваш компонент CountryDetail)
import { useEffect, useState } from 'react';
import countryData from '../data/countries.json'; // Убедитесь, что путь правильный
import { useParams, Link } from 'react-router-dom';

export function CountryPage() {
    const { countryId } = useParams();
    const [country, setCountry] = useState(null);

    useEffect(() => {
        const foundCountry = countryData.find(c => c.id === countryId);
        setCountry(foundCountry);
    }, [countryId]);

    return (
        <div className="p-4 flex flex-col items-center">
            <Link
                to={`/countries`} // Возвращаемся к списку стран, а не на главную страницу
                className="mb-8 p-3 bg-amber-700 rounded-md hover:bg-amber-900 transition-all"
            >
                Назад к списку стран
            </Link>

            {country && (
                <div className="mt-5 text-center p-6 bg-gray-700 bg-opacity-80 rounded-lg shadow-xl max-w-md w-full">
                    <h2 className="text-3xl font-bold mb-4">{country.name}</h2>
                    {country.flag && (
                        <img
                            src={country.flag}
                            alt={`${country.name} flag`}
                            className="w-24 h-auto mx-auto mb-4 rounded-sm border border-gray-300"
                        />
                    )}
                    <p className="text-lg mb-2"><span className="font-semibold">Столица:</span> {country.capital}</p>
                    <p className="text-lg mb-2"><span className="font-semibold">Население:</span> {country.population}</p>
                    <p className="text-lg mb-4"><span className="font-semibold">Язык:</span> {country.language}</p>
                    <p className="text-base leading-relaxed">{country.description}</p>
                </div>
            )}
            {!country && (
                <div className="mt-5 text-center text-red-500">
                    <p>Страна не найдена.</p>
                </div>
            )}
        </div>
    );
}