import React, { useEffect, useState, useRef } from 'react';

function useEventListener(eventType, handler) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    console.log('effect Ran');
    function internalHandler(e) {
      return handlerRef.current(e);
    }

    document.addEventListener(eventType, internalHandler);

    return () => document.removeEventListener(eventType, internalHandler);
  }, [eventType]);
}

export default function UseEventListenerPage() {
  const [count, setCount] = useState(0);

  useEventListener('click', () => {
    console.log('I AM GLOBAL', count);
  });

  return (
    <div>
      <h1>useEventListener</h1>
      <button onClick={() => setCount((c) => c + 1)}>Hello: {count}</button>
    </div>
  );
}
