import React from 'react';
import Header from './pages/header';
import Home from './pages/home';
import Exercises from './pages/exercises';
import SavedExercises from './pages/saved-exercises';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    addEventListener('hashchange', () => {
      parseRoute(window.location.hash);
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'exercises') {
      return <Exercises />;
    } else if (route.path === 'saved-exercises') {
      return <SavedExercises />;
    }
    return <Home />;
  }

  render() {

    return (
    <>
     <Header />
     { this.renderPage() }
    </>
    );
  }
}
