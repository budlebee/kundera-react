import { Route, Switch, Link } from "react-router-dom";
import { GetSentence } from "./pages/GetSentence";
import { AddSentence } from "./pages/AddSentence";
import { GurusFeed } from "./pages/GurusFeed";
import { Notis } from "./pages/Notis";
import { UserFeed } from "./pages/UserFeed";
import { FollowerList } from "./pages/FollowerList";
import { GuruList } from "./pages/GuruList";
import { Support } from "./pages/Support";
import { Post } from "./pages/Post";
import { MyComments } from "./pages/MyComments";

import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Setting } from "./pages/Setting";
import { Guest } from "./pages/Guest";
import { Error } from "./pages/Error";
import { GlobalBody } from "./layouts/GlobalBody";
import { Footer } from "./layouts/Footer";
import { Nav } from "./layouts/Nav";

import Cookies from "universal-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./redux/user";

function App() {
  const dispatch = useDispatch();
  const { loading, error, myId } = useSelector((state) => {
    return {
      loading: state.user.loading,
      error: state.user.error,
      myId: state.user.myId,
    };
  });
  const cookies = new Cookies();
  useEffect(() => {
    if (cookies.get("user-id")) {
      dispatch(refreshToken());
    }
  }, []);
  return (
    <div
      style={{
        height: "100%",
        position: "absolute",
        left: "0px",
        width: "100%",
        margin: "0",
        padding: "0",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",

        whiteSpace: "pre-wrap",
        placeItems: "center",
      }}
    >
      <Nav />

      <GlobalBody>
        <main style={{ width: "100%" }}>
          <Switch>
            <Route path="/" exact={true} component={GetSentence} />
            <Route path="/add" exact={true} component={AddSentence} />
            <Route path="/post/:postId" component={Post} />
            <Route path="/my-comments/:userId" component={MyComments} />
            <Route path="/gurus-feed" component={GurusFeed} />
            <Route path="/user-feed/:userId" component={UserFeed} />
            <Route path="/followers/:userId" component={FollowerList} />
            <Route path="/gurus/:userId" component={GuruList} />
            <Route path="/noti/:userId" component={Notis} />
            <Route path="/setting" exact={true} component={Setting} />
            <Route path="/signup" exact={true} component={SignUp} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/guest" exact={true} component={Guest} />
            <Route path="/support" exact={true} component={Support} />
            <Route path="*" component={Error} />
          </Switch>
        </main>
      </GlobalBody>
      <Footer />
    </div>
  );
}

export default App;
