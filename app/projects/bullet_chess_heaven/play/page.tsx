import Link from "next/link";

export default async function BulletChessHeavenGame() {
	return <div>
		<h1>Bullet Chess Heaven</h1>
		<p className="wip">This game is heavily WIP, follow the <Link href="/blog">blog</Link> for updates. Check out the code in <a href="https://github.com/RoberTnf/bullet_chess_heaven_rs">GitHub</a>.</p>
		<iframe id="mygame-iframe" src="/bullet_chess_heaven_rs/wasm/index.html" width="1280" height="720" className="overflow-hidden" scrolling="no"></iframe>
	</div>;
}
