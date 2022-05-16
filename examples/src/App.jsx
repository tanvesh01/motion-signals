import AnimatingCounter from "./components/AnimatingCounter"
import AnimatingElements from "./components/AnimatingElements"
import AnimatingList from "./components/AnimatingList"

import './App.css'

export default function App() {

	return (
		<div class="App">
			<div class="card">
				<section id="about">
					<div>
						<h1><a href="https://www.npmjs.com/package/motion-signals" rel="nofollow">motion-signals</a></h1>
						<p>A <a href="https://www.solidjs.com/" rel="nofollow">SolidJS</a> wrapper over <a href="https://motion.dev/" rel="nofollow">Motion One</a>, an animation library built on the <a href="https://blog.logrocket.com/the-web-animations-api-vs-css/" rel="nofollow">Web Animations API</a> for the smallest filesize and the fastest performance.</p>
					</div>
				</section>
			</div>
			<div class="card">
				<AnimatingCounter />
			</div>
			<div class="card">
				<AnimatingElements />
			</div>
			<div class="card">
				<AnimatingList />
			</div>
		</div>
	)
}
