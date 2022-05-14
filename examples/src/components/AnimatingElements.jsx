import { onMount } from 'solid-js';
import { createTimeline } from 'motion-signals'
import './AnimatingElements.css';
import Image from './mind-blown-explosion.gif';

export default function AnimatingElements() {
	let refGIF
	const { play, getIsFinished, replay } = createTimeline(
		[
			// You can use Refs too!
			[()=> refGIF, { scale: [0, 1.2], opacity: 1 }],
			['.heading', { y: [50, 0], opacity: [0, 1] }],
			['.container p', { opacity: 1 }],
		],
		{ duration: 2 },
	);

	// Play the animation on rendering of the component
	onMount(() => {
		play();
});

	return (
		<div class="ElementsContainer">
			<button disabled={!getIsFinished} onClick={() => replay()}>
				Replay
			</button>

			<div class="container">
				<img
					ref={refGIF}
					class="gif"
					src={Image}
					alt="mind explosion gif"
				/>
				<div>
					<h3 class="heading">Tanvesh</h3>
					<p><a href="https://twitter.com/Sarve___tanvesh">@sarve__tanvesh</a></p>
				<hr />
					<h3 class="heading">tom byrer</h3>
					<p><a href="https://twitter.com/tombyrer">@tombyrer</a></p>
				</div>
			</div>
		</div>
	);
}