import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Home from "./components/Home";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import MovieManagement from "./components/MovieManagement";
import AdminHome from "./components/AdminHome";
import ProtectedRoute from "./components/ProtectedRoute";
import TvShowList from "./components/TvShowList";
import MediaDetail from "./components/MediaDetail";
import HeaderConditionalRenderer from "./components/HeaderConditionalRenderer";
import AdminCuratedMovies from "./components/AdminCuratedMovies";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <HeaderConditionalRenderer />
        <div className="App min-h-screen">
          {" "}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<AdminCuratedMovies />} />
            <Route
              path="/movies/:id"
              element={<MediaDetail mediaType="movie" />}
            />
            <Route path="/tvshows" element={<TvShowList />} />
            <Route
              path="/tvshows/:id"
              element={<MediaDetail mediaType="tvshow" />}
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminHome />} />
              <Route path="movies" element={<MovieManagement />} />
              <Route path="movies/create" element={<MovieManagement />} />
            </Route>

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
