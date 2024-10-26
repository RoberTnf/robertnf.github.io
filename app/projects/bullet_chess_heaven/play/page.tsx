import Link from "next/link";

export default async function BulletChessHeavenGame() {
    return <div>
        <h1>Bullet Chess Heaven</h1>
        <p className="wip">This game is heavily WIP, follow the <Link href="/blog">blog</Link> for updates. It does not work on mobile devices (yet). Check out the code in <a href="https://github.com/RoberTnf/bullet_chess_heaven_rs">GitHub</a>.</p>
        <iframe id="bch-iframe" src="https://robertnf.github.io/bullet_chess_heaven_rs/" width="1280" height="720" className="overflow-hidden border-0" scrolling="no"></iframe>
    </div>;
}
