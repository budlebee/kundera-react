import { Route, Switch, Link } from "react-router-dom";
import { GetSentence } from "./pages/GetSentence";
import { AddSentence } from "./pages/AddSentence";
import { UserFeed } from "./pages/UserFeed";

function App() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <header className="App-header">
        <button>noti</button>
      </header>
      <main style={{ flex: 1 }}>
        <section>
          <Switch>
            <Route path="/" exact={true} component={GetSentence} />
            <Route path="/add" exact={true} component={AddSentence} />
            <Route path="/feed" exact={true} component={UserFeed} />
          </Switch>
        </section>
        <section>
          <Link to="/">Get Sentence. 유리병 아이콘</Link>
          <Link to="/add">Add Sentence. 플러스 아이콘</Link>
          <Link to="/feed">My Feed. 사람아이콘</Link>
        </section>
      </main>
      <footer>kundera.so ©</footer>
    </div>
  );
}

export default App;
