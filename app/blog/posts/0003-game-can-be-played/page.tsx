import BasePost from "@/app/components/base_post";
import Link from "next/link";

export const metadata = {
    title: "A little polish can go a long way",
    publishedAt: new Date("2024-10-27"),
    updatedAt: new Date("2024-10-27"),
    categories: ["gamedev", "bch", "rust", "bevy"],
};

export default function BulletChessHeavenInBevy() {
    return <BasePost title={metadata.title}>
        <div>
            <Link href="/projects/bullet_chess_heaven/play">
                <h2>Play the alpha</h2>
            </Link>
            <p>
                Right now it consists of a fancy piece defending itself from an onslaught of enemies pieces.
                This piece is capable of moving as multiple pieces at once, and attacking as all of them at the same time.
                Even though it is only pure distilled gameplay, without any story or progression, it is already engaging to <Link href="/projects/bullet_chess_heaven/play">play!</Link>
            </p>
            <h2>What is the basic mechanic of Bullet Chess Heaven?</h2>
            <p>
                The player controls a buggy chess piece, which is capable of moving as one of multiple pieces at once. This piece is also capable of attacking
                as all of the available pieces at the same time, to all the possible targets after completing a move. In the following video, you can see an example
                of the piece moving and attacking, with a king, a queen and a knight.
            </p>
            <video src="/blog/posts/0003-game-can-be-played/attack_animations.mp4"
                controls title="Attack animations in Bullet Chess Heaven"
                aria-label="A fancy chess piece moving and attacking as multiple chess pieces simultaneously" />
            <h2>A little polish can make a game shine</h2>
            <p>
                As I was adding the basic animations that you can see in the video above, Bullet Chess Heaven became fun. It went from a bundle of mechanics to a game,
                and explaining it became much easier. As a developer, it is easy to get so focused on the mechanics and delay adding polish, but it pays off to add
                a little polish early. Before the animations, I wasn&apos;t sure if Bullet Chess Heaven would be fun, but after adding them, now I am confident that it is. It is so
                satisfying to watch the different pieces spawning from the player piece and attacking the enemies!
            </p>
            <p>
                Of course, the attack animations need more polish, there should be indications of impact and the targets should bounce back a little. But I need to be
                careful. As easy as it is to disregard polish and to focus on the core mechanics, it is to overdo it, and add too much polish to features and mechanics
                that are not yet finished, and might not even be implemented in the final game.
            </p>
            <h2>Short term goals</h2>
            <p>
                My main short term goal right now is to <span className="emphasis"> add Bullet Chess Heaven to Steam</span>, so I can start sharing it and hopefully start getting some wishlists. I am sure that I can do
                everything development related with ease, but marketing and networking are not my strong suits. At all. The earlier that I start sharing Bullet Chess Heaven, the
                better.
            </p>
            <p>
                As for game development, I want to add features that will make Bullet Chess Heaven go from a tech demo to a real game. That means:
            </p>
            <ul>
                <li className="caret"><b>A progression system.</b>
                    <ul>
                        <li className="caret">Horizontal Progression. The player should be able to acquire new pieces as they progress. The player should be able to make a choice
                            between unique effects, that will change the way Bullet Chess Heaven is played (for example, pawn attacks spawning allies, rook attacks creating barriers, etc).
                        </li>
                        <li className="caret">Vertical Progression. The player should be rewarded with a stronger piece as they progress. The enemies should also get stronger, keeping
                            the difficulty curve balanced. Bullet Chess Heaven should become more complex, with precise movement being more important as the game progresses.
                        </li>
                    </ul>
                </li>
                <li className="caret"><b>A simple main menu. </b> The player should be able to interrupt the game to change options or restart it.</li>
            </ul>
            <h2>Medium term goals</h2>
            <p>
                In a similar vein to the short term goals, I have a few requirements that Bullet Chess Heaven should meet:

                <ul>
                    <li className="caret"><b>Bullet Chess Heaven should be replayable.</b> Given that it is a roguelite, replayability is key. There should be many distinct
                        ways to play, with different characters and upgrade paths
                    </li>
                    <li className="caret"><b>Bullet Chess Heaven should be easy to understand.</b> Chess is a complex game, and adding mechanics on top of it makes it even more complex.
                        A new player, that knows how chess pieces move, should be able to understand the basic game loop after a minute of playing.
                    </li>
                    <li className="caret"><b>Bullet Chess Heaven should be challenging.</b> Bullet Chess Heaven should be hard, but not impossible. It is a roguelite after all,
                        winning should be something you achieve after playing many games, not after a single one.
                    </li>
                    <li className="caret"><b>Bullet Chess Heaven should be fun.</b> Probably every game has this goal, and it is good to keep it in mind.
                    </li>
                    <li className="caret"><b>Bullet Chess Heaven should be multiplatform seamlessly.</b> Right now, Bullet Chess Heaven is available on Linux, MacOS, Windows and on web
                        through Web Assembly. However, it only works with a mouse, as touch events are not supported yet. This should change, it is the perfect game to play on a phone!
                    </li>
                </ul>
            </p>

            <h2>Metaprogression is the root of all evil</h2>
            <p>
                Most new roguelites have a metaprogression system, where there are upgrades that are unlocked each time you die. These upgrades can be things like
                increasing your max health, increasing your damage, or unlocking new abilities. I am generally against metaprogression, as I believe that the game
                should be winnable from game one, with knowledge and skills being the only things that improve after each death.
            </p>
            <p>
                As an example, <a href="https://store.steampowered.com/app/1105670/The_Last_Spell/">The Last Spell</a> is a really successful roguelite, that
                I was never able to enjoy, even thought I admire it and want to like it. The first game you play is not meant to be won, instead it&apos;s meant to
                start unlocking upgrades that will make future games easier. This approach to difficulty and progression is really popular, and people like it,
                <span className="emphasis"> but I don&apos;t</span>. I am a fan of classic roguelikes like <a href="https://cataclysmdda.org/">Cataclysm: Dark Days Ahead</a>,
                and <a href="https://crawl.develz.org/">Dungeon Crawl Stone Soup</a>, where every game starts from scratch, and the only way to progress is by getting
                stronger and learning from your mistakes. It feels so much better to know that the win you just achieved is due to your skills, and not to the fact that
                your character is much stronger than the first time you played.
            </p>
            <p>
                There is some metaprogression that I like, and that is metaprogression that adds complexity to the game, without significantly changing the difficulty curve.
                A great example of this is <a href="https://store.steampowered.com/app/646570/Slay_the_Spire/">Slay the Spire</a>, where you unlock new cards as you die.
                Another style of metaprogression I enjoy is where games don&apos;t become easier, but instead they become optionally harder, with the player being
                able to take on harder difficulties, as in the ascension system of Slay the Spire.
            </p>

            <h2>Licensing</h2>
            <p>
                Right now, Bullet Chess Heaven is licensed under BSL, a source available license, but not a FOSS license. I want to eventually move it to a FOSS license,
                as I heavily rely on open source software to develop the game, and I believe on FOSS. However, I am (probably irrationally) afraid of someone taking the code,
                and releasing ahead of me. My current plan is to change the license to a FOSS one after release.
            </p>
        </div>
    </BasePost >;
}
