import Link from "next/link";

export default function About() {
	return <div>
		<h2>About me</h2>
		<hr className="border-dashed border-2 my-4" />

		<h3>Summary</h3>

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

		<h3>Programming</h3>

		<p>
			I have been programming since I was a kid. I started with bat and then moved to python and to using linux as my daily driver.
			I have always been fascinated by how things work and how to make them better.
		</p>

		<h3>Interests</h3>

		<p>
			My main hobby is gaming and game development. I hope to soon release my own game, check out my progress at my <Link href="/blog">blog</Link>.
		</p>

		<h3>Family</h3>

		<p>
			I am married to the most wonderful woman in the world and have the best Yorkie in the world. How lucky am I?
		</p>

	</div>;
}

