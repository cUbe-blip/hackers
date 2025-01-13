import HomePage from '~pages/Home/Home';
import NewsPage from '~pages/News/News';
import Header from '~ui/Header/Header';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';
import './reset.scss';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<NewsPage />} path="/news/:id" />
          <Route element={<HomePage />} path="/:page" />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
