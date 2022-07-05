import { Link, useNavigate, useParams } from "react-router-dom";
import "./editMovie.css";
import { Publish } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

type MovieProps = {
    _id: string;
    title: string;
    genres: string;
    image: string;
    imDbRating: string;
    stars: string;
};

const EditMovie = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovieData] = useState<MovieProps>();
    const [updatedMovie, setUpdatedMovie] = useState({
        title: '',
        genres: '',
        imDbRating: '',
        stars: ''
    });

    useEffect(() => {
        const getMovieById = async () => {
            try {
                const url = `http://localhost:4000/movie/${id}`;
                console.log(url);
                const response = await axios.get(url);
                setMovieData(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMovieById();
    }, [id]);

    const updateMovieForm = (value: object) => {
        return setUpdatedMovie((prev) => {
            return { ...prev, ...value };
        });
    };

    const handleMovieFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const movieDetails = { ...updatedMovie };
        // console.log(movieDetails);
        try {
            const response = await axios.post(
                `http://localhost:4000/update-movie/${movie?._id}`,
                JSON.stringify(movieDetails),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.data.status) {
                alert(response.data.msg);
                navigate('/admin/movies');
            } else {
                alert(response.data.msg);
            }
        } catch (err) {
            console.log(err);
        }
        setUpdatedMovie({
            title: '',
            genres: '',
            imDbRating: '',
            stars: ''
        });
    };

    return (
        <div className="edit-movie">
            <div className="movieTitleContainer">
                <h1 className="editMovieTitle">Edit Movie</h1>
            </div>
            <div className="movieTop">
                <div className="movieInfoTop">
                    <img src={movie?.image} alt="" className="movieInfoImg" />
                    <span className="movieName">{movie?.title}</span>
                </div>
                <div className="movieInfoBottom">
                    <div className="movieInfoItem">
                        <span className="movieInfoKey">Id:</span>
                        <span className="movieInfoValue">{movie?._id}</span>
                    </div>
                    <div className="movieInfoItem">
                        <span className="movieInfoKey">Genres:</span>
                        <span className="movieInfoValue">{movie?.genres}</span>
                    </div>
                    <div className="movieInfoItem">
                        <span className="movieInfoKey">Rating:</span>
                        <span className="movieInfoValue">{movie?.imDbRating}</span>
                    </div>
                    <div className="movieInfoItem">
                        <span className="movieInfoKey">Stars:</span>
                        <span className="movieInfoValue">{movie?.stars}</span>
                    </div>
                </div>
            </div>
            <div className="movieBottom">
                <form className="movieForm" onSubmit={handleMovieFormSubmit}>
                    <div className="movieFormLeft">
                        <label>Movie Name</label>
                        <input type="text" placeholder={movie?.title} onChange={(e) => updateMovieForm({ title: e.target.value })}
                            required />
                        <label>Genres</label>
                        <input type="text" placeholder={movie?.genres} onChange={(e) => updateMovieForm({ genres: e.target.value })}
                            required />
                        <label>Rating</label>
                        <input type="text" placeholder={movie?.imDbRating} onChange={(e) => updateMovieForm({ imDbRating: e.target.value })}
                            required />
                        <label>Movie Stars</label>
                        <input type="text" placeholder={movie?.stars} onChange={(e) => updateMovieForm({ stars: e.target.value })}
                            required />
                    </div>
                    <div className="movieFormRight">
                        <button className="movieButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditMovie;
