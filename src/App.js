import { Route, Switch, Link } from "react-router-dom";
import { GetSentence } from "./pages/GetSentence";
import { AddSentence } from "./pages/AddSentence";
import { GurusFeed } from "./pages/GurusFeed";
import { UserFeed } from "./pages/UserFeed";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { GlobalBody } from "./layouts/GlobalBody";
import { Footer } from "./layouts/Footer";
import { Nav } from "./layouts/Nav";

function App() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
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
            <Route path="/signup" exact={true} component={SignUp} />
            <Route path="/login" exact={true} component={Login} />
          </Switch>
        </main>
      </GlobalBody>

      <Footer />
    </div>
  );
}

export default App;
