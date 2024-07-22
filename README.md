# Mitt React

`mitt-react` is a lightweight utility for integrating the mitt event emitter with React functional components. It provides hooks for listening to and emitting events in a React-friendly way. <br />

In more detail, this package offers a hook that automatically handles event subscription and unsubscription using the `useEffect` hook. This simplifies the process of managing event listeners in React components, ensuring they are properly set up and cleaned up to avoid memory leaks.

## Installation

```bash
npm install mitt-react
```

## Usage

### useEventListener (hook)

The `useEventListener` hook allows you to listen to custom events in your React components.

```jsx
import React, { useState } from 'react';
import { useEventListener } from 'mitt-react';

const MyComponent = () => {
  const [message, setMessage] = useState('');

  useEventListener('customEvent', (data) => {
    setMessage(data);
  });

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default MyComponent;
```

### eventEmit (function)

The `eventEmit` function allows you to emit custom events.

```jsx
import React from 'react';
import { eventEmit } from 'mitt-react';

const MyEmitterComponent = () => {
  const handleClick = () => {
    eventEmit('customEvent', 'Hello, World!');
  };

  return <button onClick={handleClick}>Emit Event</button>;
};

export default MyEmitterComponent;
```

## API

### useEventListener

A hook to listen for a custom event.

| Param     | Type   | Nullable | Desc                                |
| --------- | ------ | -------- | ----------------------------------- |
| eventName | string | &cross;  | The name of the event to listen for |
| eventName | string | &cross;  | The name of the event to listen for |

eventName: The name of the event to listen for.
handler: The function to call when the event is emitted.
eventEmit(eventName: string, data: any)
A function to emit a custom event.

eventName: The name of the event to emit.
data: The data to pass to the event handler.
