import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import FramerMotion from './demo/framer-motion';

function App() {
  return (
    <div className="app">
      {/* <h1>React Demos</h1> */}
      <FramerMotion />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
