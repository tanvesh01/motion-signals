import { createSignal } from "solid-js";
// import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { createAnimation } from 'motion-signals'
import './AnimatingCounter.css';

const ICON_STYLES = { color: 'white', width: '1.4rem', height: 'auto' };

function AnimatedCounter() {
    let refCurrentCounter
    const { play } = createAnimation(
        refCurrentCounter,
        { y: [5, 20, -10, 0], opacity: [1, 0, 0, 1] },
        { duration: 0.5 },
    );
    const { play: playDecrease } = createAnimation(
        refCurrentCounter,
        { y: [0, -10, 20, 0], opacity: [1, 0, 0, 1] },
        { duration: 0.5 },
    );

    const [counter, setCounter] = createSignal(0);

    const increase = () => {
        play();
        setTimeout(() => {
            setCounter(counter() + 1);
        }, 100);
    };
    const descrease = () => {
        playDecrease();
        setTimeout(() => {
            setCounter(counter() - 1);
        }, 100);
    };

    return (
        <div className="CounterContainer">
            <div className="container">
                <button onClick={increase}>
									^
                    {/* <ChevronUpIcon style={ICON_STYLES} /> */}
                </button>

                <p ref={refCurrentCounter}>{counter()}</p>

                <button onClick={descrease}>
									v
                    {/* <ChevronDownIcon style={ICON_STYLES} /> */}
                </button>
            </div>
        </div>
    );
}

export default AnimatedCounter;
