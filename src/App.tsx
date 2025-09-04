import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Routes as path } from "./constants/enums";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import MovieDetails from "./pages/Movies/MovieDetails";
import SeriesDetails from "./pages/Series/SeriesDetails";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Pages */}
          <Route path={path.ROOT} element={<Home />} />
          <Route path={path.MOVIES} element={<Movies />} />
          <Route path={path.SERIES} element={<Series />} />
          <Route path={`${path.MOVIES}/:movieId`} element={<MovieDetails />} />
          <Route
            path={`${path.SERIES}/:seriesId`}
            element={<SeriesDetails />}
          />

          {/* Not found */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
