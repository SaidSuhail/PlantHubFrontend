// import React from 'react'

// function Home() {
//   return (
//     <div>
//       <h1>Home</h1>
//     </div>
//   )
// }

// export default Home
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate  = useNavigate();
  return (
    <div className="font-sans text-gray-800 ">
      {/* Hero Section */}
      <div className="bg-white px-6 py-12 flex flex-col md:flex-row items-center gap-6 pt-20 pb-36">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">Your Personal Plant Care Assistant</h1>
          <p className="mb-6 text-lg">Expert care for your green companions</p>
          <p className="mb-6 text-gray-600">Discover personalized plant care services, expert advice, and a thriving community of plant lovers.</p>
          <div className="flex gap-4">
            <button className="bg-green-600 text-white px-6 py-2 rounded-md">Book a Service</button>
            <button className="border border-green-600 text-green-600 px-6 py-2 rounded-md"onClick={()=>navigate('/library')} >Explore Plant Library</button>
          </div>
        </div>
        <div className="flex-1">
          <img src="/Regsiterimg.jpg" alt="Plant Care" className="rounded-lg" />
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-100 py-12 px-6 ">
        <h2 className="text-2xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            ['Plant Health Check-up', 'Expert assessments and diagnostic care for plants.'],
            ['Regular Maintenance', 'Routine service and maintenance tasks.'],
            ['Plant Emergency Care', '24/7 emergency plant care services.'],
            ['Garden Design Consultation', 'Professional garden layout and design advice.']
          ].map(([title, desc], idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow">
              <div className="text-green-600 text-2xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
              <button className="text-green-600 mt-4">Learn More</button>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Plants */}
      <div className="py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Popular Plants</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            ['Monstera Deliciosa', 'Bright indirect sunlight, weekly watering.', 'https://images.unsplash.com/photo-1606813908881-731c35f5534b'],
            ['Snake Plant', 'Low light, monthly watering.', 'https://images.unsplash.com/photo-1587049352842-e1e6c08f62b7'],
            ['Peace Lily', 'Moderate light, regular watering.', 'https://images.unsplash.com/photo-1587300011570-38acc6df8f0f'],
            ['Fiddle Leaf Fig', 'Bright light, weekly watering.', 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f']
          ].map(([name, care, img], idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow">
              <img src={img} alt={name} className="rounded mb-4 w-full h-48 object-cover" />
              <h4 className="text-lg font-semibold">{name}</h4>
              <p className="text-sm text-gray-600">{care}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Experts Section */}
      <div className="bg-gray-100 py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Connect with Plant Experts</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ['Dr. Sarah Johnson', '120 Reviews', 'https://randomuser.me/api/portraits/women/1.jpg'],
            ['Michael Chen', '105 Reviews', 'https://randomuser.me/api/portraits/men/2.jpg'],
            ['Emma Wilson', '98 Reviews', 'https://randomuser.me/api/portraits/women/3.jpg']
          ].map(([name, reviews, img], idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow flex flex-col items-center text-center">
              <img src={img} alt={name} className="w-20 h-20 rounded-full mb-4" />
              <h4 className="text-lg font-semibold">{name}</h4>
              <p className="text-sm text-gray-500 mb-2">{reviews}</p>
              <div className="text-yellow-500 mb-4">★★★★★</div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md">Book Consultation</button>
            </div>
          ))}
        </div>
      </div>

      {/* Community Stats */}
      <div className="py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-8">Join Our Community</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ['10,000+', 'Plant Lovers'],
            ['5,000+', 'Plant Care Guides'],
            ['1,000+', 'Expert Solutions']
          ].map(([number, label], idx) => (
            <div key={idx} className="text-center">
              <h3 className="text-3xl font-bold text-green-600">{number}</h3>
              <p className="text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
