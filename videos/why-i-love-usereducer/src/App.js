import React, { useState, useEffect } from 'react';
import './App.css';
import LoginUseState from './LoginUseState';
import LoginUseReducer from './LoginUseReducer';
import LoginUseReducerImmer from './LoginUseReducerImmer';

function App() {
  const [, forceUpdate] = useState();
  const { hash } = window.location;
  useEffect(() => {
    window.addEventListener('hashchange', () => forceUpdate({}));
  }, []);
  return (
    <>
      {!hash && (
        <div className="App App-Column">
          <a href="#useState">useState</a>
          <br />
          <br />
          <a href="#useReducer">useReducer</a>
          <br />
          <br />
          <a href="#useReducerImmer">useReducerImmer</a>
        </div>
      )}
      {hash === '#useState' && <LoginUseState />}
      {hash === '#useReducer' && <LoginUseReducer />}
      {hash === '#useReducerImmer' && <LoginUseReducerImmer />}
    </>
  );
}

export default App;
