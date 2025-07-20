import { useState, useEffect } from 'react';
import ContactSection from '../components/forHomeGuest/ContactSection';

export default function Contact() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Sync dengan dark mode dari NavbarGuest
  useEffect(() => {
    // Ambil initial state dari localStorage jika ada
    const storedTheme = localStorage.getItem('isDarkTheme');
    if (storedTheme) {
      setIsDarkTheme(JSON.parse(storedTheme));
    }

    // Listen untuk perubahan theme dari ThemeButton
    const handleThemeChange = (event) => {
      setIsDarkTheme(event.detail.isDark);
    };

    window.addEventListener('themeChanged', handleThemeChange);

    return () => {
      window.removeEventListener('themeChanged', handleThemeChange);
    };
  }, []);

  return (
    <section className={`section-padding transition-colors duration-300 ${
      isDarkTheme ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="container-custom">
        <ContactSection/>
      </div>
    </section>
  );
}
