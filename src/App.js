import { Route, Switch, Link } from "react-router-dom";
import { GetSentence } from "./pages/GetSentence";
import { AddSentence } from "./pages/AddSentence";
import { GurusFeed } from "./pages/GurusFeed";
import { Notis } from "./pages/Notis";
import { UserFeed } from "./pages/UserFeed";

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
        margin: "0",
        padding: "0",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        //display: "flex",
        minHeight: "100%",
        whiteSpace: "pre-wrap",

        //height: "100%",
        //height: "100vh",
        //flexDirection: "column",
        //WebkitFlexDirection: "column",
      }}
    >
      <Nav />

      <GlobalBody>
        <main>
          <Switch>
            <Route path="/" exact={true} component={GetSentence} />
            <Route path="/add" exact={true} component={AddSentence} />
            <Route path="/gurus-feed" component={GurusFeed} />
            <Route path="/user-feed/:userId" component={UserFeed} />
            <Route path="/noti/:userId" component={Notis} />
            <Route path="/setting" exact={true} component={Setting} />
            <Route path="/signup" exact={true} component={SignUp} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/guest" exact={true} component={Guest} />
            <Route path="*" component={Error} />
          </Switch>
        </main>
      </GlobalBody>

      <Footer />
    </div>
  );
}

export default App;
