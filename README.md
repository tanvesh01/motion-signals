# motion-signals

A wrapper over [Motion One](https://motion.dev/), An animation library, built on the Web Animations API for the smallest filesize and the fastest performance. Works with [solid-js](https://www.solidjs.com/)

[![npm version](https://badge.fury.io/js/motion-signals.svg)](https://www.npmjs.com/package/motion-signals) ![npm](https://img.shields.io/npm/dt/motion-signals) [![Twitter Follow](https://img.shields.io/twitter/follow/Sarve___tanvesh?label=Chat)](https://twitter.com/Sarve___tanvesh)

[Demo examples at netify](https://motion-signals.netlify.app/)

## Installation

```
npm install motion-signals motion
```

## Functions

As of now, motion-signals has 2 Functions that wrap around `animate` and `timeline` of motion one respectively

-   [`createAnimation`](https://github.com/tanvesh01/motion-signals#createAnimation)
-   [`createTimeline`](https://github.com/tanvesh01/motion-signals#createTimeline)

## Example usage

**Things You could do with [`createAnimation`](https://github.com/tanvesh01/motion-signals#createanimation)**

<!-- Animating List - [Link to codesandbox](https://codesandbox.io/s/divine-mountain-qelct?file=/src/App.js) -->

![createAnimation List Example](https://media1.giphy.com/media/JNMxjkEipIurs5RaQb/giphy.gif)

<!-- Animating Counter - [Link to codesandbox](https://codesandbox.io/s/nice-browser-d4ds3?file=/src/App.js) -->

![createAnimation Counter Example](https://media3.giphy.com/media/80wDwOyRlnS1woHcF0/giphy.gif)

**Things You could do with [`createTimeline`](https://github.com/tanvesh01/motion-signals#createtimeline)**

<!-- Animating elements independently - [Link to codesandbox](https://codesandbox.io/s/dazzling-dawn-f48sm?file=/src/App.js) -->

![createTimeline Example Usage](https://media1.giphy.com/media/RxCRUxJgi4nuM7b7yv/giphy.gif)

### `createAnimation`

Returns all the properties returned by [`animate`](https://motion.dev/dom/animate) and some helper functions and state

> Props returned my [`animate`](https://motion.dev/dom/animate) are `null` initially

<!-- You may view this example [here on codesandbox](https://codesandbox.io/s/divine-mountain-qelct?file=/src/App.js). -->

```jsx
function App() {
    const { play, getIsFinished, replay } = createAnimation(
        '.listItem',
        { y: -20, opacity: 1 },
        {
            delay: stagger(0.3),
            duration: 0.5,
            easing: [0.22, 0.03, 0.26, 1],
        },
    );

    // Play the animation on mount of the component
    onMount(() => {
        play();
    });

    return (
        // Replay the animation anytime by calling a function, anywhere
        <div class="App">
            <button disabled={!getIsFinished()} onClick={() => replay()}>
                Replay
            </button>

            <ul class="list">
                <li class="listItem">Item 1</li>
                <li class="listItem">Item 2</li>
                <li class="listItem">Item 3</li>
            </ul>
        </div>
    );
}
```

Instead of passing strings to select elements, you can also pass a `ref` :point_down:

```jsx
let boxRef;
const { play, getIsFinished, replay } = createAnimation(
    () => boxRef, // Pass a Function that returns the ref
    { y: -20, scale: 1.2 },
    { duration: 1 },
);

return <div ref={boxRef}>BOX</div>;
```

**API**

```js
const { play, replay, reset, getIsFinished, getAnimateInstance } = createAnimation(
    selector,
    keyframes,
    options,
    events,
);
```

`createAnimation` returns:

-   `play`: plays the animation
-   `replay`: Resets and plays the animation
-   `reset`: resets the element to its original styling
-   `getIsFinished`: is `true` when animation has finished playing
-   `getAnimateInstance`: Animation Controls. Refer to [motion one docs](https://motion.dev/dom/controls) for more.

`createAnimation` accepts:

-   `selector` - The target element, can be string or a ref
-   `keyframes` - Element will animate from its current style to those defined in the keyframe. Refer to [motion's docs](https://motion.dev/dom/animate#keyframes) for more.
-   `options` - Optional parameter. Refer to [motion doc's](https://motion.dev/dom/animate#options) for the values you could pass to this.
-   `events` - Pass functions of whatever you want to happen when a event like `onFinish` happens.

    **`events` usage example**

    ```jsx
    const { play, getIsFinished, replay } = createAnimation(
        '.listItem',
        { y: -20, opacity: 1 },
        {
            delay: stagger(0.3),
            duration: 0.5,
        },
        {
            onFinish: () => {
                // Whatever you want to do when animation finishes
            },
        },
    );
    ```

### `createTimeline`

Create complex sequences of animations across multiple elements.

returns `getTimelineInstance` (Animation Controls) that are returned by [`timeline`](https://motion.dev/dom/timeline) and some helper functions and state

> Props returned by [`timeline`](https://motion.dev/dom/timeline) are `null` initially

<!-- You may view this example [here on codesandbox](https://codesandbox.io/s/dazzling-dawn-f48sm?file=/src/App.js). -->

```jsx
function App() {
    let gifRef;
    const { play, getIsFinished, replay } = createTimeline(
        [
            // You can use Refs too!
            [() => gifRef, { scale: [0, 1.2], opacity: 1 }],
            ['.heading', { y: [50, 0], opacity: [0, 1] }],
            ['.container p', { opacity: 1 }],
        ],
        { duration: 2 },
    );

    onMount(() => {
        play();
    });

    return (
        <div class="App">
            <button disabled={!getIsFinished()} onClick={() => replay()}>
                Replay
            </button>

            <div class="container">
                <img ref={gifRef} class="gif" src={Image} alt="mind explosion gif" />
                <div>
                    <h1 class="heading">Tanvesh</h1>
                    <p>@sarve__tanvesh</p>
                </div>
            </div>
        </div>
    );
}
```

**API**

```js
const { play, replay, reset, getIsFinished, getTimelineInstance } = createTimeline(
    sequence,
    options,
    events,
);
```

`createTimeline` returns:

-   `play`: plays the animation
-   `replay`: Resets and plays the animation
-   `reset`: resets the element to its original styling
-   `getIsFinished`: is `true` when animation has finished playing
-   `getTimelineInstance`: Animation Controls. Refer to [motion one docs](https://motion.dev/dom/controls) for more.

`createTimeline` accepts:

-   `sequence` - `sequence` is an array, defines animations with the same settings as the animate function. In the arrays, Element can be either a string or a ref. You can refer to [sequence docs](https://motion.dev/dom/timeline#sequence) for more on this.
-   `options` - Optional parameter. Refer to [motion doc's](https://motion.dev/dom/animate#options) for the values you could pass to this.
-   `events` - Pass functions of whatever you want to happen when a event like `onFinish` happens. Exactly same as createAnimation's `onFinish`.

---

## Local Installation & Contributing

-   Fork [motion-signals](https://github.com/tanvesh01/motion-signals)

```sh
git clone https://github.com/:github-username/motion-signals.git
cd motion-signals
npm install # Installs dependencies for motion-signals
cd examples # React app to test out changes
npm install # Installs dependencies for example app
npm run dev # To run example on localhost:3000
```

The contributing guidelines along with local setup guide is mentioned in [CONTRIBUTING.md](https://github.com/tanvesh01/motion-signals/blob/main/CONTRIBUTING.md)

Any Type of feedback is more than welcome! This project is in very early stage and would love to have contributors of any skill/exp level.

You can contact me on my [Twitter handle @Sarve\_\_\_tanvesh](https://twitter.com/Sarve___tanvesh)
