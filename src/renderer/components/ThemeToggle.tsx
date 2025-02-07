import React, { useState, useEffect } from "react";
import { loadData, saveData } from "../utils/stateUtils";
import "../styles/theme.scss";

type ThemeToggleProps = {
  updateTheme: (newValue: string) => void; // 这里声明 updateTheme 为一个函数，且没有参数，返回类型为 void
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({ updateTheme }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    async function getThemeData(){
      let currentTheme = await loadData('get-theme');
      if (currentTheme){
        document.body.classList.toggle('dark-theme', currentTheme === 'dark');
        setTheme(currentTheme);
        updateTheme(currentTheme);
      }
    }
    getThemeData()
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    saveData('change-theme',newTheme);
    updateTheme(newTheme);
    document.body.classList.toggle('dark-theme', theme !== 'dark');
  };

  return (
    <button className="theme-button" onClick={toggleTheme}>
      {theme === "light" ? "🌞" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
