import axios from 'axios';
const keycode="112fae00fa01394648433ccbcf71d7c5";

const baseMoviesURL='https://api.themoviedb.org/3';
const featuredMoviesURL = `${baseMoviesURL}/trending/movie/day?api_key=${keycode}`;
const upcomingMoviesURL = `${baseMoviesURL}/movie/upcoming?api_key=${keycode}`;
const highestRatedMoviesURL = `${baseMoviesURL}/movie/top_rated?api_key=${keycode}`;


const movieDetailsURL=id=> `${baseMoviesURL}/movie/${id}?api_key=${keycode}`;
const movieActorURL=id=> `${baseMoviesURL}/movie/${id}/credits?api_key=${keycode}`;
const similarMoviesURL=id=> `${baseMoviesURL}/movie/${id}/similar?api_key=${keycode}`;
const searchMoviesURL= `${baseMoviesURL}/search/movie?api_key=${keycode}`;



const movieStarURL=id=> `${baseMoviesURL}/person/${id}?api_key=${keycode}`;
const TheirMoviesURL=id=> `${baseMoviesURL}/person/${id}/movie_credits?api_key=${keycode}`;


export const image500=path=>path? `https://image.tmdb.org/t/p/w500${path}`:null;
export const image342=path=>path? `https://image.tmdb.org/t/p/w342${path}`:null;
export const image185=path=>path? `https://image.tmdb.org/t/p/w185${path}`:null;




const apiCall=async (endpoint,params)=>{
    const options={
        method:'GET',
        url:endpoint,
        params:params? params:{}
    }
    try{
        const response=await axios.request(options);
        return response.data;
    }catch(error){
        console.log('error: ',error);
        return{}
    }
}
export const retrieveFeaturedMovies=()=>{
    return apiCall(featuredMoviesURL);
}

export const retrieveComingSoonMovies=()=>{
    return apiCall(upcomingMoviesURL);
}

export const retrieveHighestRatedMovies=()=>{
    return apiCall(highestRatedMoviesURL);
}

export const retrieveMovieDetails= id=>{
    return apiCall(movieDetailsURL(id));
}

export const retrieveMovieActor= id=>{
    return apiCall(movieActorURL(id));
}

export const retrieveSimilarMovies= id=>{
    return apiCall(similarMoviesURL(id));
}

export const retrieveMovieStar= id=>{
    return apiCall(movieStarURL(id));
}

export const retrieveTheirMovies= id=>{
    return apiCall(TheirMoviesURL(id));
}

export const searchMovies= params=>{
    return apiCall(searchMoviesURL,params);
}

