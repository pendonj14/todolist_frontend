import React from 'react';
import {Navigate} from 'react-router-dom';
import { FaSignOutAlt, FaAngleRight, FaUserAlt } from 'react-icons/fa';
import { useTheme } from 'next-themes';

interface SideBarProps {
  closeSidebar: () => void;
  isVisible: boolean;
  username: string;
}

function Logout() {
    localStorage.clear();
    window.location.reload();
    return <Navigate to='/login'/>;
  }

const SideBar: React.FC<SideBarProps> = ({ closeSidebar, isVisible, username }) => {
    const { theme } = useTheme();
 
   return (
    <div className={`h-full w-64  ${theme === `dark` ? `bg-gray-600` : `bg-gray-800`} text-white flex flex-col p-4 fixed top-0 right-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex items-center justify-between mb-8">  
        <div className="flex items-center">
          <FaUserAlt size={30} className="mr-4" />
          <span className="text-xl font-bold">{username}</span>
        </div>
          <FaAngleRight size={20} onClick={closeSidebar} className="text-white hover:scale-115 transition-transform duration-300 ease-out will-change-transform"/>
      </div>
      <nav className="flex flex-col space-y-4 ">
        <button onClick={Logout} className="flex items-center p-2 hover:bg-gray-700 rounded ">
          <FaSignOutAlt className="mr-4" />
          Logout
        </button>
      </nav>
    </div>
  );
}

export default SideBar;