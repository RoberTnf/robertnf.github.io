import Link from "next/link";

export default function Projects() {
	return <div>
		<h1>Projects</h1>
		<ul>
			<li className="caret">
				<Link href="/projects/bullet_chess_heaven/play">Bullet Chess Heaven</Link> is a Vampire Survivors inspired bullet hell roguelike with chess mechanics.
			</li>
		</ul>
	</div>;
}
