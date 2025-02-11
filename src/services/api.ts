import axios from 'axios';

const API_KEY = 'eZsFWG6l5QkNsWEF4_jZIpuFv8XS3zX7pcPI1eYNpT0';
const BASE_URL = 'https://api.unsplash.com';

export interface Image {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
    portfolio_url: string | null;
  };
}

export interface FetchImagesResponse {
  total: number;
  total_pages: number;
  results: Image[];
}

export const fetchImages = async (
  query: string,
  page: number = 1
): Promise<FetchImagesResponse> => {
  const response = await axios.get<FetchImagesResponse>(
    `${BASE_URL}/search/photos`,
    {
      params: {
        query,
        page,
        per_page: 12,
        client_id: API_KEY,
      },
    }
  );
  return response.data;
};
