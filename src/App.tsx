import React from "react";
import { connect } from "react-redux";
import { getTables } from "./store/tables/actions";

import "./App.css";

interface AppProps {
  getTables: Function;
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    this.props.getTables();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getTables
};

export default connect(null, mapDispatchToProps)(App);
