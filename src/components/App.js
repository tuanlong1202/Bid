import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import BidList from "../pages/BidList";
import NewBid from "../pages/NewBid";
import Message from "../pages/Message";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/new">
            <NewBid user={user} />
          </Route>
          <Route path="/message">
            <Message user={user} />
          </Route>
          <Route path="/">
            <BidList user={user} />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
