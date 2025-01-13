export const HackerNews = {
  baseURL: 'https://hacker-news.firebaseio.com/v0/',
};

export const ErrorMessages = {
  commentsLoadError: 'Не удалось загрузить комментарии',
  failedToFetch: 'Failed to fetch data:',
  itemNotFound: 'Элемент не найден',
  loading: 'Loading...',
  networkError: 'Ошибка сети',
};

export const Time = {
  apiTimeout: 20_000,
  commentUpdateInterval: 30_000,
  refreshInterval: 60_000,
};

export const AppConfig = {
  comments: {
    maxDepth: 3,
  },
  typography: {
    iconSize: '24px',
  },
};

export const Pagination = {
  storiesPerPage: 30,
};

export const Endpoints = {
  item: (id: number) => `/item/${id}.json`,
  topStories: '/topstories.json',
};
