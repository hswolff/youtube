import React, { useEffect, useState, useRef } from 'react';

interface Options {
  enabled?: boolean;
  target?: GlobalEventHandlers;
}

function useEventListener(
  eventType: keyof GlobalEventHandlersEventMap,
  handler: (e: Event) => void,
  { enabled = true, target = document }: Options = {}
) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    if (!enabled) {
      return;
    }
    function internalHandler(e: Event) {
      return handlerRef.current(e);
    }

    target.addEventListener(eventType, internalHandler);

    return () => {
      target.removeEventListener(eventType, internalHandler);
    };
  }, [eventType, enabled, target]);
}

export default function UseEventListenerPage() {
  const [enabled, setEnabled] = useState(true);
  const [count, setCount] = useState(0);

  useEventListener(
    'click',
    () => {
      //   console.log('I AM GLOBAL', count);
    },
    { enabled }
  );

  useEventListener(
    'scroll',
    () => {
      console.log('THEY SEE ME SCROLLING');
    },
    { target: window }
  );

  return (
    <div style={{ height: '110vh' }}>
      <h1>useEventListener</h1>
      <button onClick={() => setEnabled((e) => !e)}>
        Enabled: {String(enabled)}
      </button>
      <br />
      <button onClick={() => setCount((c) => c + 1)}>Hello: {count}</button>
    </div>
  );
}
