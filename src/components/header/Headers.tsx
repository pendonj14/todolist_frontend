import { useTheme } from "next-themes";
import { MdDarkMode } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";


interface HeadersProps {
  toggleSidebar: () => void;
}

const Headers: React.FC<HeadersProps> = ({ toggleSidebar }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`flex items-center h-[50px] pl-4  pr-10 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <img 
           src={theme === 'dark' ? "/src/assets/LogoDark.png" : "/src/assets/LogoLight.png"}
          alt="logo" 
          className="h-9 w-9 "
        />
        
      <h2 className="flex-1 text-center text-xl font-bold"></h2>
        <div className="flex items-center space-x-2">  
          <MdDarkMode size={23}onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="hover:scale-115 transition-transform duration-300 ease-out will-change-transform"/>
          <FaUserAlt size={18} onClick={toggleSidebar} className="hover:scale-110 transition-transform duration-300 ease-out will-change-transform"/>
        </div>
    </div>
  );
}

export default Headers;