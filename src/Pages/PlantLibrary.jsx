import React from 'react';

function PlantLibrary() {
  return (
    <div className="bg-white-50 min-h-screen p-6 ">
      {/* Header Section */}
      <div className="text-center mb-10 pt-16">
        <h1 className="text-4xl font-bold text-green-900">Plant Library</h1>
        <p className="text-gray-600 mt-2">Discover and learn about thousands of plants</p>
        <div className="mt-6 flex justify-center">
          <input type="text" placeholder="Search plants by name, type, or characteristics"
                 className="w-full max-w-xl px-4 py-2 rounded-l-md border border-gray-300" />
          <button className="bg-green-600 text-white px-6 rounded-r-md">Search</button>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {['Indoor', 'Outdoor', 'Low Light', 'Pet-friendly', 'Air Purifying'].map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-200 text-sm rounded-full">{tag}</span>
          ))}
        </div>
      </div>

      {/* Filter and Sort Section */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex gap-2 flex-wrap">
          {['Plant Type', 'Care Level', 'Light Requirements', 'Water Needs'].map(filter => (
            <select key={filter} className="px-4 py-2 border rounded-md text-sm">
              <option>{filter}</option>
            </select>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">Sort By</label>
          <select className="px-4 py-2 border rounded-md text-sm">
            <option>Recommended</option>
          </select>
        </div>
      </div>

      {/* Plant Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {['Monstera Deliciosa', 'Snake Plant', 'Peace Lily', 'Fiddle Leaf Fig',
          'ZZ Plant', 'Chinese Evergreen', 'Pothos', 'Spider Plant'].map((name, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <div className="h-40 bg-gray-200 rounded mb-3"></div>
            <h3 className="text-lg font-semibold text-green-900">{name}</h3>
            <p className="text-sm text-gray-600 italic">Latin name</p>
            <div className="text-xs text-gray-500 my-1">☀ Low to bright ☘ Weekly</div>
            <div className="text-xs text-green-600 font-medium">Easy</div>
            <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-md text-sm">Learn More</button>
          </div>
        ))}
      </div>

      {/* Featured Collections */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-green-900 mb-4">Featured Collections</h2>
        <div className="flex overflow-x-auto gap-4">
          {['Pet-friendly Plants', 'Low Light Plants', 'Desk Plants', 'Tropical Plants', 'Succulents & Cacti'].map((collection, idx) => (
            <div key={idx} className="min-w-[200px] bg-gray-200 h-32 rounded-lg flex items-center justify-center text-sm font-medium text-green-900">
              {collection}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlantLibrary;
