import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './index.css';

import FramerMotion from './demo/framer-motion';
import AsyncHooks from './demo/async-hooks';

const routes = [
  {
    path: '/framer-motion',
    name: 'Framer Motion',
    component: FramerMotion,
  },
  {
    path: '/async-hooks',
    name: 'Async React Hooks',
    component: AsyncHooks,
  },
];

function App() {
  return (
    <Router>
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <h1>React Demos</h1>
              {routes.map((route, i) => (
                <React.Fragment key={i}>
                  <div>
                    <Link to={route.path}>{route.name}</Link>
                  </div>
                  <br />
                </React.Fragment>
              ))}
            </div>
          )}
        />

        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
