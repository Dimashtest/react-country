<div className="countries-page p-10">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Medals by Country</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statistic.map((country, index) => (
          <div key={index} className="bg-gray-700 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <img src={country.flag} alt={`${country.name} Flag`} className="w-20 h-14 object-contain mb-4" />
            <h3 className="text-xl font-semibold mb-2">{country.name}</h3>
            <p className="text-lg">Gold: <span className="font-bold text-yellow-400">{country.medals.gold}</span></p>
            <p className="text-lg">Silver: <span className="font-bold text-gray-300">{country.medals.silver}</span></p>
            <p className="text-lg">Bronze: <span className="font-bold text-orange-400">{country.medals.bronze}</span></p>
          </div>
        ))}
      </div>
    </div>