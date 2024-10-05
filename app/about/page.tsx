import Link from "next/link";

export default function About() {
	return <div>
		<h1>About me</h1>
		<hr />

		<h2>Summary</h2>

		<p>
			Hello! I&apos;m Roberto, a data scientist based in Tenerife, Spain. I
			studied a physics degree at ULL, Tenerife, and a MSc in Computational Science
			at SU and KTH, Stockholm.
		</p>
		<p>
			I&apos;ve been working at Myrspoven since 2019, as Lead Data Scientist, Interim CTO and now as Senior Data Scientist
			in a fully remote position.
		</p>
		<p>
			I am a person who breathes technology. I love to learn and build things. I spend most of my time learning about
			programming languages, tuning my setup, reading documentation and playing with code.
		</p>

		<h2>Programming</h2>

		<p>
			I have been programming since I was a kid. I started with bat and then moved to python and to using linux as my daily driver.
			I have always been fascinated by how things work and how to make them better.
		</p>

		<h3>Technologies</h3>

		<div className="grid grid-cols-2 gap-2 ml-8">
			<div className="caret">Python</div>
			<div className="text-accent">★★★★★</div>
			<div className="caret">SQL</div>
			<div className="text-accent">★★★★★</div>
			<div className="caret">Typescript</div>
			<div className="text-accent">★★★★☆</div>
			<div className="caret">GDScript</div>
			<div className="text-accent">★★★☆☆</div>
			<div className="caret">Rust (learning, check out <Link href="/blog/category/rust">my blog posts</Link>)</div>
			<div className="text-accent">★★★☆☆</div>
			<div className="caret">Haskell</div>
			<div className="text-accent">★★☆☆☆</div>
			<div className="caret">Bash</div>
			<div className="text-accent">★★☆☆☆</div>
		</div>

		<h2>Interests</h2>

		<p>
			My main hobby is gaming and game development. I hope to soon release my own game, check out my progress at my <Link href="/blog">blog</Link>.
		</p>

		<h2>Family</h2>

		<p>
			I am married to the most wonderful woman in the world and have the best Yorkie in the world. How lucky am I?
		</p>

	</div>;
}

