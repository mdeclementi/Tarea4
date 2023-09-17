import { createBrowserRouter } from "react-router-dom";
import PostList from "./PostList";
import Login from "./Login";
import Profile from "./Profile";

    const router = createBrowserRouter([
        {
          path: "/",
          element: <PostList></PostList>,
          exact: true,
        },
        {
          path: "/login",
          element: <Login></Login>,
          exact: true,
        },
        {
          path: "/profile",
          element: <Profile></Profile>,
          exact: true,
        },
      ]);

export default router;