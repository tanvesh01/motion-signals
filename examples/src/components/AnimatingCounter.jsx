import { createSignal } from "solid-js";
import { createAnimation } from 'motion-signals'
// import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';

import './AnimatingCounter.css';

export default function AnimatedCounter() {
	let refCounterOutput
	const { play } = createAnimation(
		// ref on the element inserts animation directly into 'style' attribute
		()=>refCounterOutput,
		{ y: [5, 20, -10, 0], opacity: [1, 0, 0, 1] },
		{ duration: 0.5 },
	);
	const { play: playDecrease } = createAnimation(
		()=>refCounterOutput,
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
		<section class="CounterContainer">
			<div class="container">
				<button onClick={increase}>
					<svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" src="heroicons.com">
						<path fill="#ead5f8" fill-rule="evenodd" clip-rule="evenodd" d="M14.7071 12.7071C14.3166 13.0976 13.6834 13.0976 13.2929 12.7071L10 9.41421L6.70711 12.7071C6.31658 13.0976 5.68342 13.0976 5.29289 12.7071C4.90237 12.3166 4.90237 11.6834 5.29289 11.2929L9.29289 7.29289C9.68342 6.90237 10.3166 6.90237 10.7071 7.29289L14.7071 11.2929C15.0976 11.6834 15.0976 12.3166 14.7071 12.7071Z" />
					</svg>
				</button>

				<p ref={refCounterOutput}>{counter()}</p>

				<button onClick={descrease}>
					<svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" src="heroicons.com">
						<path fill="#ead5f8" fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z" />
						</svg>
				</button>
			</div>
		</section>
	);
}
