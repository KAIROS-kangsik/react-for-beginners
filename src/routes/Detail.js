import { use, useEffect, useState } from "react";
// useParams는 React Router에서 제공하는 Hook으로,
// URL의 파라미터 값을 가져올 수 있게 해줌 (예: /movie/:id에서 id 값을 추출)
import { useParams } from "react-router-dom";

import ReactPlayer from "react-player";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        .then((response) => response.json())
        .then((json) => {
          setMovie(json.data.movie);
          setLoading(false);
        });
    }, 200);
  }, []);

  useEffect(() => {
    console.log(movie);
    console.log(typeof movie.genres);
    console.log(Array.isArray(movie.genres));
  }, [movie]);

  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h3>{movie.title}</h3>
          <ul>
            {movie.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          {/* <img src={movie.medium_cover_image} /> */}
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${movie.yt_trailer_code}`}
          />
        </div>
      )}
    </div>
  );
}

export default Detail;
