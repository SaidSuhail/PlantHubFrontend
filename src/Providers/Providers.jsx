// import React from 'react'
// import Sidebar from './Sidebar'

// function providers() {
//   return (
//     <div>
//       <h1>Providers</h1>
//       <Sidebar/>
//     </div>
//   )
// }

// export default providers

import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function Providers() {
  return (
    <div className="flex flex-col md:flex-row  min-h-screen">
      {/* Sidebar */}
      <div className="md:w-64 w-full md:block -ml-37 -mt-7 fixed">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Outlet/>
        {/* <h1 className="text-2xl font-bold">Hello</h1> */}
        {/* Add more admin content here */}
      </div>
    </div>
  );
}

export default Providers;
