import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import MovieList from './components/MovieList/Movielist';
import Movie from './pages/MovieDetails/MovieDetails';
import About from './pages/About/About';
import Users from './pages/Users/Users';

function App() {
  return (
    <div className="App">
        
          <Header />
            <Routes>
                <Route index element={<Home />}></Route>
                <Route path="users" element={<Users />} ></Route>
                <Route path="about" element={<About />} />
                <Route path="movie/:id" element={<Movie />}></Route>
                <Route path="movies/:type" element={<MovieList />}></Route>
                <Route path="/*" element={<h1>Error Page</h1>}></Route>
                
            </Routes>
        
    </div>
  );
}

export default App;