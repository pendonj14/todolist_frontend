import { useTheme } from 'next-themes';
import { MdDarkMode } from "react-icons/md";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <MdDarkMode />
    </button>
  );
};

export default ThemeToggle;