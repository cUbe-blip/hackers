import axios from 'axios';
import {
  fetchComments,
  fetchStory,
  fetchTopStories,
  HackerNewsAPIError,
} from '../hacker-news-rest-api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Hacker News API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchTopStories', () => {
    it('должен успешно получать топ историй', async () => {
      const mockStories = [1, 2, 3];
      mockedAxios.get.mockResolvedValueOnce({ data: mockStories });

      const result = await fetchTopStories();
      expect(result).toEqual(mockStories);
    });

    it('должен выбрасывать ошибку при неудачном запросе', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchTopStories()).rejects.toThrow(HackerNewsAPIError);
    });
  });

  describe('fetchStory', () => {
    const mockStory = {
      by: 'user1',
      id: 1,
      kids: [1, 2],
      score: 100,
      time: 1_234_567_890,
      title: 'Test Story',
      url: 'http://example.com',
    };

    it('должен успешно получать историю', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockStory });

      const result = await fetchStory(1);
      expect(result).toEqual(mockStory);
    });

    it('должен выбрасывать ошибку при отсутствии ID', async () => {
      await expect(fetchStory(0)).rejects.toThrow('ID истории обязателен');
    });
  });

  describe('fetchComments', () => {
    const mockComments = [
      {
        by: 'user1',
        id: 1,
        text: 'Test comment',
        time: 1_234_567_890,
      },
    ];

    it('должен успешно получать комментарии', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockComments });

      const result = await fetchComments(1);
      expect(result).toEqual(mockComments);
    });

    it('должен выбрасывать ошибку при отсутствии ID', async () => {
      await expect(fetchComments(0)).rejects.toThrow(
        'ID комментария обязателен',
      );
    });
  });
});
