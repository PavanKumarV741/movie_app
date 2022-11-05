import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './component/movielist';
import MovieListHeading from "./component/movielistheading";
// import SearchBox from './component/search';
import AddFavourites from './component/addfavorites';
import RemoveFavourites from './component/removefavorites';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
  const [query,setquery]=useState("")

	const getMovieRequest = async (searchValue) => {
		// const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
		const url = `https://fake-movie-database-api.herokuapp.com/api?s=batman`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
    // setquery(searchValue)
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className='container-fluid movie-app'>
      <input type="text" placeholder='search here' onClick={(e)=>setquery(e.target.value)}/>
      <h2>Top ten movies</h2>
       {/* <input type="text" placeholder='search here' onClick={(e)=>setquery(e.target.value)}/> */}
        <div className='topmovies'>
        {
                movies.filter((movie)=>movie.Title.includes(query)
                ).map((movie,i)=>{
                    return(
                            <div key={i}>
                                <div className="img-div">
                                <div className='title'>{movie.Title}</div>
                                <img id="img" src={movie.Poster}></img>
                                </div>
                                {/* <div>{movie.Title}</div> */}
                                {/* <div>{movie.Year}</div> */}
                            </div>
                    )
                })
            }
        </div>
        <hr/>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				{/* <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} /> */}
        {/* <input type="text" placeholder='search here' onClick={(e)=>setquery(e.target.value)}/> */}
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList
					movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
		</div>
	);
};

export default App;
