import { Route, Switch, Link } from "react-router-dom";
import { GetSentence } from "./pages/GetSentence";
import { AddSentence } from "./pages/AddSentence";
import { UserFeed } from "./pages/UserFeed";
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
            <Route path="/feed" exact={true} component={UserFeed} />
          </Switch>
        </main>
      </GlobalBody>

      <Footer />
    </div>
  );
}

export default App;
