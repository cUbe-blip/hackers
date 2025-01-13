import {
  Comment,
  fetchComments,
  fetchStory,
  Story,
} from '~API/hacker-news-rest-api';
import { ErrorMessages } from '~constant/consts';
import CommentItem from '~pages/News/CommentItem/CommentItem';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './news.scss';

const NewsPage = () => {
  const { id } = useParams<string>();
  const [news, setNews] = useState<Story | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNews = useCallback(async () => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    try {
      const story = await fetchStory(Number(id));
      setNews(story);
      if (story.kids) {
        const commentsResults = await Promise.all(
          story.kids.map(fetchComments),
        );
        setComments(commentsResults.flat());
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(ErrorMessages.failedToFetch, error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleRefreshComments = () => {
    fetchNews();
  };

  if (isLoading) {
    return <div className="news__loading">{ErrorMessages.loading}</div>;
  }

  return (
    <div className="news">
      <div className="news__header">
        <Link className="news__back-link" to="/">
          Back to News List
        </Link>
      </div>

      {news && (
        <div className="news__content">
          <h1 className="news__title">{news.title}</h1>

          <div className="news__meta">
            <span className="news__author">By: {news.by}</span>
            <span className="news__date">
              {new Date(news.time * 1000).toLocaleString()}
            </span>
            <a
              className="news__source-link"
              href={news.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              Read more
            </a>
          </div>

          <div className="news__comments-section">
            <div className="news__comments-header">
              <h2 className="news__comments-title">
                Comments ({comments.length})
              </h2>
              <button
                className="news__refresh-button"
                onClick={handleRefreshComments}
              >
                Refresh Comments
              </button>
            </div>

            <div className="news__comments-list">
              {comments.map((comment) => (
                <CommentItem comment={comment} key={comment.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
