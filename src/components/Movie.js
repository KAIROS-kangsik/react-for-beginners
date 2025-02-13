import PropTypes from "prop-types";

// Link는 React Router에서 제공하는 컴포넌트로,
// HTML의 <a> 태그 대신 사용되며 페이지 새로고침 없이 다른 route로 이동할 수 있게 해줌
import { Link } from "react-router-dom";

function Movie({ id, title, genres, coverImg, summary }) {
  return (
    <div>
      <h5>
        <Link to={`/movie/${id}`}>{title}</Link>
      </h5>
      <ul>
        {genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
      <img src={coverImg} alt={title} />
      <p>{summary}</p>
      <br />
      <br />
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  coverImg: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
