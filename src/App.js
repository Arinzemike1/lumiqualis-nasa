import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieListing from './components/MovieListing';
import MovieDetail from './components/MovieDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<MovieListing />} />
          <Route path="/movie/:movieId" exact element={<MovieDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;