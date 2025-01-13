import HeaderItem from '~ui/Header/HeaderItem/HeaderItem';
import Icon from '~ui/Icon/Icon';
import React from 'react';
import { useNavigate } from 'react-router';
import './headerLayout.scss';

interface LayoutProps {
  lastName: string;
  name: string;
}

const pages = {
  new: 'new',
  past: 'past',
}; // Пока не добавил страницы, но хоть что-то чтобы было

const HeaderLayout: React.FC<LayoutProps> = (props) => {
  const navigate = useNavigate();

  const returnToHomePage = () => {
    navigate('/');
  };

  const pagesArray = Object.values(pages);

  return (
    <header className="header">
      <div className="header__left">
        <Icon icon={'logo'} onClick={returnToHomePage} />
        <span className="header__title">Hacker News</span>
      </div>
      <nav className="header__nav">
        {pagesArray.map((page: string, index) => (
          <React.Fragment key={page}>
            <HeaderItem name={page} />
            {index !== pagesArray.length - 1 && (
              <span className="header__separator">|</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </header>
  );
};

export default HeaderLayout;
