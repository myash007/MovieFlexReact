import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newMovie.css";

export default function NewProduct() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    id: '',
    title: '',
    plot: '',
    contentRating: '',
    genres: '',
    runtimeStr: '',
    stars: '',
    image: '',
  });

  const newMovieForm = (value: object) => {
    return setMovie((prev) => {
      return { ...prev, ...value };
    });
  };

  const handleMovieFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMovie = { ...movie };
    console.log(newMovie);
    try {
      const response = await axios.post(
        'http://localhost:4000/add-movie',
        JSON.stringify(newMovie),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      if (response.data.status) {
        alert(response.data.msg);
        navigate('/admin/movies');
      } else {
        alert(response.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
    setMovie({
      id: '',
      title: '',
      plot: '',
      contentRating: '',
      genres: '',
      runtimeStr: '',
      stars: '',
      image: '',
    });
  };

  return (
    <div className="edit-movie">
      <div className="addMovieTitleContainer">
        <h1 className="addMovieTitle">Add Movie</h1>
      </div>
      <div className="addMovieBottom">
        <form className="addMovieForm" onSubmit={handleMovieFormSubmit}>
          <div className="addMovieFormLeft">
            <label>Movie Title</label>
            <input type="text" placeholder="Enter movie name" onChange={(e) => newMovieForm({ title: e.target.value })} required/>
            <label>Description</label>
            <textarea rows={7} placeholder="Description" onChange={(e) => newMovieForm({ plot: e.target.value })} required/>
            <label>Content Rating</label>
            <input type="text" placeholder="Ratings" onChange={(e) => newMovieForm({ contentRating: e.target.value })} required/>

          </div>
          <div className="addMovieFormRight">
            <label>Movie Id</label>
            <input type="text" placeholder="Enter IMDB Id" onChange={(e) => newMovieForm({ id: e.target.value })} required/>
            <label>Genres</label>
            <input type="text" placeholder="Genres" onChange={(e) => newMovieForm({ genres: e.target.value })} required/>
            <label>Movie Duration</label>
            <input type="number" placeholder="Screen Time" onChange={(e) => newMovieForm({ runtimeStr: e.target.value })} required/>
            <label>Movie Stars</label>
            <input type="text" placeholder="Enter Cast (Seperated by comma)" onChange={(e) => newMovieForm({ stars: e.target.value })} required/>
            <label>Movie Image</label>
            <input type="text" placeholder="Image Url" onChange={(e) => newMovieForm({ image: e.target.value })} required/>
          </div>
          <div className="addMovieButton">
            <button className="movieButton">Add a movie</button>
          </div>
        </form>
      </div>
    </div>
  );
}
