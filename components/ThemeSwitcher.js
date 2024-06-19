import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { VisuallyHidden, useSwitch } from '@nextui-org/react';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

export default function ThemeSwitcher(props) {
  const { setTheme } = useTheme();
  const {
    Component,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);

  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setCurrentTheme(savedTheme);
    setTheme(savedTheme);
  }, []);

  const themeChange = (theme) => {
    setTheme(theme);
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div {...getWrapperProps()} className="w-8 h-8 flex items-center justify-center">
          <span className="text-lg text-default-500 cursor-pointer active:opacity-50">
            {currentTheme === 'dark' ? <SunIcon onClick={() => themeChange('light')} /> : <MoonIcon onClick={() => themeChange('dark')} />}
          </span>
        </div>

      </Component>
    </div>
  );
}
