import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function Providers() {
  return (
    <div className="flex flex-col md:flex-row  min-h-screen">
      {/* Sidebar */}
      <div className="md:w-64 w-full md:block lg:-ml-37   lg:-mt-7 lg:fixed">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="flex-1 p-4">
        <Outlet/>
      </div>
    </div>
  );
}

export default Providers;
