import { API_URL } from '../../(home)/page';

async function getMovie(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(`Fetching movies: ${Date.now()}`);

  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

async function getVideos(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(`Fetching videos: ${Date.now()}`);

  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
}

export default async function MovieDetail({ params: { id } }: { params: { id: string } }) {
  console.log('=================================');
  console.log('start fetching');

  const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);

  console.log('end fetching');

  return <h1>{movie.title}</h1>;
}
