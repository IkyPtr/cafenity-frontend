import { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Navbar() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // You might want to add theme switching logic here
  };

  return (
    <NavbarContainer $isDark={isDarkTheme} $scrolled={scrolled}>
      <NavContent>
        <Logo>Cafenity</Logo>
        <NavLinks>
          <NavLink>About</NavLink>
          <NavLink>Contact Us</NavLink>
          <NavLink>Menu</NavLink>
          <NavLink>Reservasi</NavLink>
          <ThemeToggle onClick={toggleTheme}>
            {isDarkTheme ? 'LT' : 'DT'}
          </ThemeToggle>
        </NavLinks>
      </NavContent>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1rem 2rem;
  z-index: 1000;
  transition: all 0.3s ease;
  
  /* Liquid glass effect */
  background: ${props => props.$isDark 
    ? 'rgba(9, 107, 104, 0.7)' 
    : 'rgba(255, 251, 222, 0.7)'};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: ${props => props.$scrolled 
    ? '0 4px 20px rgba(0, 0, 0, 0.1)' 
    : 'none'};
  border-bottom: ${props => props.$scrolled 
    ? '1px solid rgba(144, 209, 202, 0.2)' 
    : 'none'};
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.isDark ? '#FFFBDE' : '#096B68'};
  font-family: 'Playfair Display', serif;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    color: #129990;
    cursor: pointer;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled.div`
  position: relative;
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.theme.isDark ? '#FFFBDE' : '#096B68'};
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #129990;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #90D1CA;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const ThemeToggle = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: ${props => props.theme.isDark 
    ? 'rgba(255, 251, 222, 0.2)' 
    : 'rgba(9, 107, 104, 0.2)'};
  color: ${props => props.theme.isDark ? '#FFFBDE' : '#096B68'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.isDark 
      ? 'rgba(255, 251, 222, 0.4)' 
      : 'rgba(9, 107, 104, 0.4)'};
    transform: scale(1.05);
  }
`;