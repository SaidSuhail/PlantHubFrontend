// // Sidebar.jsx
// import React from 'react';
// import {
//   Home,
//   Users,
//   Calendar,
//   Database,
//   UserCheck,
//   Clock,
//   Settings,
//   BadgeCheck,
//   Boxes,
// } from 'lucide-react';

// function Sidebar() {
//   return (
//     <div className="min-h-screen w-64 bg-white border-r p-4 flex flex-col justify-between ">
//       {/* Top Section */}
//       <div>
//         <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2 mb-8">
//           <span>🌱</span> PlantCareHub
//         </h2>

//         <nav className="space-y-2 text-sm text-gray-700">
//           <MenuItem icon={<Home size={18} />} label="Dashboard" active />
//           <MenuItem icon={<Users size={18} />} label="Users Management" />
//           <MenuItem icon={<Calendar size={18} />} label="Service Bookings" />
//           <MenuItem icon={<Database size={18} />} label="Plant Database" />
//           <MenuItem icon={<UserCheck size={18} />} label="Service Providers" />
//           <MenuItem icon={<Clock size={18} />} label="Reports & Analytics" />
//           <MenuItem icon={<Settings size={18} />} label="Settings" />

//           <div className="mt-6 space-y-2">
//             <MenuItem
//               icon={<BadgeCheck size={18} />}
//               label="Provider Requests"
//               highlight
//             />
//             <MenuItem
//               icon={<Boxes size={18} />}
//               label="Plan Management"
//               highlightLight
//             />
//           </div>
//         </nav>
//       </div>

//       {/* Bottom Section */}
//       <div className="flex items-center gap-3 border-t pt-4">
//         <img
//           src="https://randomuser.me/api/portraits/men/32.jpg"
//           alt="User"
//           className="w-10 h-10 rounded-full object-cover"
//         />
//         <div>
//           <p className="text-sm font-medium">John Smith</p>
//           <p className="text-xs text-gray-500">Admin</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// const MenuItem = ({ icon, label, active, highlight, highlightLight }) => {
//   let base =
//     'flex items-center gap-3 px-3 py-2 rounded text-sm cursor-pointer transition';
//   let activeStyle = active
//     ? 'bg-green-700 text-white font-medium'
//     : 'hover:bg-gray-100';
//   let highlightStyle = highlight
//     ? 'bg-green-100 text-green-800 font-medium'
//     : highlightLight
//     ? 'bg-green-50 text-green-800'
//     : '';

//   return (
//     <div className={`${base} ${activeStyle} ${highlightStyle}`}>
//       {icon}
//       {label}
//     </div>
//   );
// };

// export default Sidebar;

// import React from 'react';
// import {
//   Home,
//   Users,
//   Calendar,
//   Database,
//   UserCheck,
//   Clock,
//   Settings,
//   BadgeCheck,
//   Boxes,
// } from 'lucide-react';

// function Sidebar() {
//   return (
//     <div className="fixed top-0 left-0 min-h-screen w-64 bg-white  p-4 flex flex-col justify-between shadow-md">
//       {/* Top Section */}
//       <div>
//         <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2 mb-8">
//           🌱 PlantCareHub
//         </h2>

//         <nav className="space-y-2 text-sm text-gray-700">
//           <MenuItem icon={<Home size={18} />} label="Dashboard" active />
//           <MenuItem icon={<Users size={18} />} label="Users Management" />
//           <MenuItem icon={<Calendar size={18} />} label="Service Bookings" />
//           <MenuItem icon={<Database size={18} />} label="Plant Database" />
//           <MenuItem icon={<UserCheck size={18} />} label="Service Providers" />
//           <MenuItem icon={<Clock size={18} />} label="Reports & Analytics" />
//           <MenuItem icon={<Settings size={18} />} label="Settings" />

//           <div className="mt-6 space-y-2">
//             <MenuItem
//               icon={<BadgeCheck size={18} />}
//               label="Provider Requests"
//               highlight
//             />
//             <MenuItem
//               icon={<Boxes size={18} />}
//               label="Plan Management"
//               highlightLight
//             />
//           </div>
//         </nav>
//       </div>

//       {/* Bottom Section */}
//       <div className="flex items-center gap-3 pt-4">
//         <img
//           src="https://randomuser.me/api/portraits/men/32.jpg"
//           alt="User"
//           className="w-10 h-10 rounded-full object-cover"
//         />
//         <div>
//           <p className="text-sm font-medium">John Smith</p>
//           <p className="text-xs text-gray-500">Admin</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// const MenuItem = ({ icon, label, active, highlight, highlightLight }) => {
//   let base =
//     'flex items-center gap-3 px-3 py-2 rounded text-sm cursor-pointer transition';
//   let activeStyle = active
//     ? 'bg-green-700 text-white font-medium'
//     : 'hover:bg-gray-100';
//   let highlightStyle = highlight
//     ? 'bg-green-100 text-green-800 font-medium'
//     : highlightLight
//     ? 'bg-green-50 text-green-800'
//     : '';

//   return (
//     <div className={`${base} ${activeStyle} ${highlightStyle}`}>
//       {icon}
//       {label}
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState } from 'react';
import {
  Home,
  Users,
  Calendar,
  Database,
  UserCheck,
  Clock,
  Settings,
  BadgeCheck,
  Boxes,
  Menu,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md border border-gray-200"
      >
        <Menu className="text-green-700 w-6 h-6" />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 min-h-screen w-64 bg-gradient-to-b from-white to-green-50 p-4 flex flex-col justify-between shadow-xl z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Logo and close button */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2">
              <span className="bg-white text-white p-1.5 rounded-lg">🌿</span>
              PlantCareHub
            </h2>
            
            {/* Close button for mobile */}
            <button 
              onClick={toggleSidebar}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 text-sm text-gray-700">
            <MenuItem 
              icon={<Home size={18} />} 
              label="Dashboard" 
              active={activeItem === 'Dashboard'}
              onClick={() => {
                setActiveItem('Dashboard');
                navigate('/admin/dashboard');
              }}
            />
            <MenuItem 
              icon={<Users size={18} />} 
              label="Users Management" 
              active={activeItem === 'Users Management'}
              onClick={() => {
                setActiveItem('Users Management')
                navigate("/admin/usermanagement")
              }}
            />
            <MenuItem 
              icon={<Calendar size={18} />} 
              label="Service Bookings" 
              active={activeItem === 'Service Bookings'}
              onClick={() => setActiveItem('Service Bookings')}
            />
            <MenuItem 
              icon={<Database size={18} />} 
              label="Plant Database" 
              active={activeItem === 'Plant Database'}
              onClick={() => setActiveItem('Plant Database')}
            />
            <MenuItem 
              icon={<UserCheck size={18} />} 
              label="Service Providers" 
              active={activeItem === 'Service Providers'}
              onClick={() => setActiveItem('Service Providers')}
            />
            <MenuItem 
              icon={<Clock size={18} />} 
              label="Reports & Analytics" 
              active={activeItem === 'Reports & Analytics'}
              onClick={() => setActiveItem('Reports & Analytics')}
            />
            <MenuItem 
              icon={<Settings size={18} />} 
              label="Settings" 
              active={activeItem === 'Settings'}
              onClick={() => setActiveItem('Settings')}
            />

            <div className="mt-6 space-y-2">
              <MenuItem
                icon={<BadgeCheck size={18} />}
                label="Provider Requests"
                highlight
                active={activeItem === 'Provider Requests'}
                onClick={() => setActiveItem('Provider Requests')}
              />
              <MenuItem
                icon={<Boxes size={18} />}
                label="Plan Management"
                highlightLight
                active={activeItem === 'Plan Management'}
                onClick={() => setActiveItem('Plan Management')}
              />
            </div>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center gap-3 pt-4 pb-4">
          <div className="relative">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
              className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <p className="text-sm font-medium">John Smith</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </>
  );
}

const MenuItem = ({ icon, label, active, highlight, highlightLight, onClick }) => {
  let base =
    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-all duration-200';
//   let activeStyle = active
//     ? 'bg-green-700 text-white font-medium shadow-sm'
//     : 'hover:bg-green-50 text-gray-700';
let activeStyle = active
  ? highlight
    ? 'bg-red-700 text-white font-medium shadow-sm'
    : highlightLight
    ? 'bg-green-700 text-white font-medium shadow-sm'
    : 'bg-green-700 text-white font-medium shadow-sm'
  : 'hover:bg-green-50 text-gray-700';
  let highlightStyle = highlight
    ? 'bg-white-500 text-red-700 border-l-4 border-red-500 '
        // ? 'bg-red-500 text-white font-medium shadow-sm'

    : highlightLight
    ? 'bg-green-50 text-green-800 border-l-4 border-green-500 '
    : '';

  return (
    <div 
      className={`${base} ${activeStyle} ${highlightStyle}`}
      onClick={onClick}
    >
      <span className={active ? 'text-red' : highlight ? 'text-red-600' : highlightLight ? 'text-green-600' : 'text-gray-500'}>
        {icon}
      </span>
      <span>{label}</span>
      {highlight && (
        <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
      )}
      {highlightLight && (
        <span className="ml-auto w-2 h-2 bg-green-500 rounded-full"></span>
      )}
    </div>
  );
};

export default Sidebar;