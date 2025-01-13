import { fetchStory, fetchTopStories, Story } from '~API/hacker-news-rest-api';
import { Pagination, Time } from '~constant/consts';
import Icon from '~ui/Icon/Icon';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

const HomePage = () => {
  const [news, setNews] = useState<Story[]>([]);
  const [displayCount, setDisplayCount] = useState(Pagination.storiesPerPage);
  const [newsIds, setNewsIds] = useState<number[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const fetchInitialNews = useCallback(async () => {
    const fetchedNewsIds = await fetchTopStories();
    setNewsIds(fetchedNewsIds);
    fetchNews(fetchedNewsIds.slice(0, 30));
  }, []);
  useEffect(() => {
    fetchInitialNews();
    const interval = setInterval(fetchInitialNews, Time.refreshInterval);
    return () => clearInterval(interval);
  }, [fetchInitialNews]);
  const fetchNews = async (ids: number[]) => {
    const newsPromises = ids.map(fetchStory);
    const newsResults = await Promise.all(newsPromises);
    setNews(newsResults);
    setIsFetching(false);
  };
  const loadMoreNews = useCallback(async () => {
    if (isFetching) {
      return;
    }
    setIsFetching(true);
    const newIds = newsIds.slice(
      displayCount,
      displayCount + Pagination.storiesPerPage,
    );
    await fetchNews(newIds);
    setDisplayCount(displayCount + Pagination.storiesPerPage);
  }, [isFetching, displayCount, newsIds]);
  return (
    <div className="home-page">
      <div className="home-page__news-list">
        {news.map((item) => (
          <div className="news-list__item" key={item.id}>
            <Icon height="10px" icon={'triangle'} width="10px" />
            <Link to={`/news/${item.id}`}>
              <div className="news-list__item-title">{item.title}</div>
              <div className="news-list__item-sub-info">
                {item.score} points by {item.by}{' '}
                {moment(item.time * 1000).fromNow()}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="home-page__more" onClick={loadMoreNews}>
        More
      </div>
    </div>
  );
};
export default HomePage;
