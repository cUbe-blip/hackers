import { Endpoints, ErrorMessages, HackerNews, Time } from '~constant/consts';
import axios from 'axios';

const api = axios.create({
  baseURL: HackerNews.baseURL,
  timeout: Time.apiTimeout,
});

export class HackerNewsAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = 'HackerNewsAPIError';
  }
}

export const fetchTopStories = async (): Promise<number[]> => {
  try {
    const response = await api.get<number[]>(Endpoints.topStories);
    return response.data;
  } catch (error) {
    throw new HackerNewsAPIError(
      ErrorMessages.failedToFetch,
      (error as { response?: { status: number } })?.response?.status,
    );
  }
};

export const fetchStory = async (id: number): Promise<Story> => {
  try {
    if (!id) {
      throw new HackerNewsAPIError(ErrorMessages.itemNotFound);
    }
    const response = await api.get<Story>(Endpoints.item(id));
    return response.data;
  } catch (error) {
    throw new HackerNewsAPIError(
      ErrorMessages.failedToFetch,
      (error as { response?: { status: number } })?.response?.status,
    );
  }
};

export const fetchComments = async (id: number): Promise<Comment[]> => {
  try {
    if (!id) {
      throw new HackerNewsAPIError('ID комментария обязателен');
    }
    const response = await api.get<Comment[]>(`/item/${id}.json`);
    return response.data;
  } catch (error) {
    throw new HackerNewsAPIError(
      `Не удалось загрузить комментарии ${id}`,
      (error as { response?: { status: number } })?.response?.status,
    );
  }
};

export interface Story {
  by: string;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  url: string;
}
export interface Comment {
  by: string;
  id: number;
  kids?: number[];
  text: string;
  time: number;
}
