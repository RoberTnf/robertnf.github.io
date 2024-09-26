import Link from "next/link";

export default function Nav() {
	return (
		<nav className="flex justify-between items-center py-4">
			<Link href="/">
				<h1>robertnf</h1>
			</Link>
			<ul className="flex gap-4">
				<li>
					<Link href="/about">about</Link>
				</li>
				<li>
					<Link href="/blog">blog</Link>
				</li>
				<li>
					<Link href="/contact">contact</Link>
				</li>
			</ul>
		</nav>
	);
}

