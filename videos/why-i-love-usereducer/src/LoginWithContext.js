import React, { useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { login } from './utils';

function loginReducer(draft, action) {
  switch (action.type) {
    case 'field': {
      draft[action.fieldName] = action.payload;
      return;
    }
    case 'login': {
      draft.error = '';
      draft.isLoading = true;
      return;
    }
    case 'success': {
      draft.isLoggedIn = true;
      draft.isLoading = false;
      draft.username = '';
      draft.password = '';
      return;
    }
    case 'error': {
      draft.error = 'Incorrect username or password!';
      draft.isLoggedIn = false;
      draft.isLoading = false;
      draft.username = '';
      draft.password = '';
      return;
    }
    case 'logOut': {
      draft.isLoggedIn = false;
      return;
    }
    case 'toggleTodoCompleted': {
      const todo = draft.todos.find((item) => item.title === action.payload);
      todo.completed = !todo.completed;
      return;
    }
    default:
      return;
  }
}

const todos = [
  {
    title: 'Get milk',
    completed: true,
  },
  {
    title: 'Make YouTube video',
    completed: false,
  },
  {
    title: 'Write blog post',
    completed: false,
  },
];

const initialState = {
  username: '',
  password: '',
  isLoading: false,
  error: '',
  isLoggedIn: false,
  todos,
};

const StateContext = React.createContext();
const DispatchContext = React.createContext();

export default function LoginUseContext() {
  const [state, dispatch] = useImmerReducer(loginReducer, initialState);
  const { username, password, isLoading, error, isLoggedIn, todos } = state;

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: 'login' });

    try {
      await login({ username, password });
      dispatch({ type: 'success' });
    } catch (error) {
      dispatch({ type: 'error' });
    }
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className='App useContext'>
          <div className='login-container'>
            {isLoggedIn ? (
              <>
                <h1>Welcome {username}!</h1>
                <button onClick={() => dispatch({ type: 'logOut' })}>
                  Log Out
                </button>
              </>
            ) : (
              <form className='form' onSubmit={onSubmit}>
                {error && <p className='error'>{error}</p>}
                <p>Please Login!</p>
                <input
                  type='text'
                  placeholder='username'
                  value={username}
                  onChange={(e) =>
                    dispatch({
                      type: 'field',
                      fieldName: 'username',
                      payload: e.currentTarget.value,
                    })
                  }
                />
                <input
                  type='password'
                  placeholder='password'
                  autoComplete='new-password'
                  value={password}
                  onChange={(e) =>
                    dispatch({
                      type: 'field',
                      fieldName: 'password',
                      payload: e.currentTarget.value,
                    })
                  }
                />
                <button className='submit' type='submit' disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Log In'}
                </button>
              </form>
            )}
          </div>

          <TodoPage todos={todos} />
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

function TodoPage({ todos }) {
  return (
    <div className='todoContainer'>
      <h2>Todos</h2>
      {todos.map((item) => (
        <TodoItem key={item.title} {...item} />
      ))}
    </div>
  );
}

function TodoItem({ title, completed }) {
  const dispatch = useContext(DispatchContext);
  // const state = useContext(StateContext);
  // const { isLoggedIn } = state;
  const isLoggedIn = true;
  return (
    <div className='todoItem'>
      <p>{title}</p>
      <div>
        <input
          type='checkbox'
          checked={completed}
          onClick={() => {
            if (!isLoggedIn) {
              alert('Please login to click this!');
            }
          }}
          onChange={() => {
            if (isLoggedIn) {
              dispatch({ type: 'toggleTodoCompleted', payload: title });
            }
          }}
        />
      </div>
    </div>
  );
}
