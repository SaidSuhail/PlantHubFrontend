// import React from 'react';
// import Sidebar from './Sidebar'; // make sure path is correct

// function Admin() {
//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="w-64 hidden md:block -ml-16">
//         <Sidebar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-bold">Hello</h1>
//         {/* Add more admin content here */}
//       </div>
//     </div>
//   );
// }

// export default Admin;

import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function Admin() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="md:w-64 w-full md:block -ml-16">
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

export default Admin;
