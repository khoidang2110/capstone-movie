import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import MovieDetail from "pages/MovieDetail/MovieDetail";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import Register from "pages/Register/Register";
import HomeTemplate from "template/HomeTemplate/HomeTemplate";
import Purchase from "pages/Purchase/Purchase";
import PurchaseTemplate from "template/PurchaseTemplate/PurchaseTemplate";
import SuccessConfirm from "pages/SuccessConfirm/SuccessConfirm";
import ProtectedRoute from "route/ProtectedRoute";
import AccountTemplate from "template/AccountTemplate/AccountTemplate";
import { useSelector } from "react-redux";
import AccountProfile from "pages/Account/AccountProfile";
import TicketHistory from "pages/Account/TicketHistory";
import UserManagement from "pages/Account/Admin/UserManagement/UserManagement";
import FilmsManagement from "pages/Account/Admin/FilmsManagement/FilmsManagement";
import EditFilm from "pages/Account/Admin/FilmsManagement/EditFilm/EditFilm";
import AddFilm from "pages/Account/Admin/FilmsManagement/AddFilm/AddFilm";
import FilmList from "pages/Account/Admin/FilmsManagement/FilmList/FilmList";
import UserList from "pages/Account/Admin/UserManagement/UserList/UserList";
import EditUser from "pages/Account/Admin/UserManagement/EditUser/EditUser";
import AddUser from "pages/Account/Admin/UserManagement/AddUser/AddUser";
import AddShowtime from "pages/Account/Admin/FilmsManagement/AddShowtime/AddShowtime";

function App() {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<HomeTemplate />}>
        <Route index element={<Home />} />

        <Route path="detail/:movieId" element={<MovieDetail />} />

        <Route path="login" element={<Login />} />

        <Route path="register" element={<Register />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>

      <Route path="/purchase" element={<PurchaseTemplate />}>
        <Route path=":showtimeId" index element={<Purchase />} />

        <Route path=":showtimeId/success" element={<SuccessConfirm />} />
      </Route>

      <Route
        path="/user"
        element={<ProtectedRoute isAuth={currentUser} role="KhachHang" component={<AccountTemplate />} />}
      >
        <Route path="profile" element={<AccountProfile />} />
        <Route path="tickets-history" element={<TicketHistory />} />
      </Route>

      <Route
        path="/admin"
        element={<ProtectedRoute isAuth={currentUser} role="QuanTri" component={<AccountTemplate />} />}
      >
        <Route path="profile" element={<AccountProfile />} />
        <Route path="tickets-history" element={<TicketHistory />} />

        <Route path="films" element={<FilmsManagement />}>
          <Route path="film-list" element={<FilmList />} />
          <Route path="edit-film/:movieId" element={<EditFilm />} />
          <Route path="add-film" element={<AddFilm />} />
          <Route path="add-showtime/:movieId" element={<AddShowtime />} />
        </Route>

        <Route path="user-management" element={<UserManagement />}>
          <Route path="user-list" element={<UserList />} />
          <Route path="edit-user/:accountName" element={<EditUser />} />
          <Route path="add-user" element={<AddUser />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
