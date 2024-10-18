import BasePost from '@/app/components/base_post';
import Image from 'next/image';

export const metadata = {
    title: "What is Bullet Chess Heaven?",
    publishedAt: new Date("2024-09-26"),
    updatedAt: new Date("2024-09-26"),
    categories: ["gamedev", "bch", "rust", "godot", "bevy"],
};

export default function WhatIsBulletChessHeaven() {
    return <BasePost title={metadata.title}>
        <p>Bullet Chess Heaven is a bullet heaven game, loosely based on chess. You play as buggy king capable of absorbing other pieces, while the chess engine AI tries to kill you.</p>

        <Image src="/blog/posts/what-is-bullet-chess-heaven/img/board.png" className="mx-auto" alt="Board" width={500} height={500} />


        <p>
            The current version is in Godot, written in GDScript. I was learning Godot and
            gamedev and my code was all over the place. I&apos;m working on a newer, much better
            organized version. The main issue with the original code was that entities were calling
            methods on other entities, making the code too interconected and hard to modify.
        </p>

        <Image src="/blog/posts/what-is-bullet-chess-heaven/img/shop.png" className="mx-auto" alt="Board" width={500} height={500} />

        <p>
            The new version is written using game design patterns, such as Observer and Finite State
            Machines. It is such a joy to work with now! However, there are still some things I don&apos;t like about it.
            Mainly, GDScript itself. As a python developer, it feels too much like python, while not being python.
            Writing code in GDScript feels like a chore, and given that this is a hobby project, I don&apos;t want to spend
            time writing code in a language that I don&apos;t like. I know that Godot also allows using C#, but it is not a language
            that attracts me.
        </p>

        <p>
            There is a devil on my shoulder, telling me to migrate the code to Rust, using the Bevy game engine.
            I know that godot is a much more mature engine than bevy, and it has a much larger community, but I just love rust.
            If this was a commercial product, I would probably use Godot, but since this is a hobby project, I can do whatever I want!
            So, I&apos;ve decided to go with the fun option, rather than the optimal one. Go rust! I know it is not a good sign that I am
            on my third rewrite of the game, but I am learning a lot and having a lot of fun!
        </p>

        <p>
            I will aim to release a new blog post every two weeks, and to snapshot the game every two weeks. This is the current state of the codebase:
            <a href="https://github.com/RoberTnf/bullet_chess_heaven_rs/commit/890011a7d4a17564c09aecba26380560d29c6697" target="_blank"> github commit</a>.
            <i>Yes, it is just a new cargo project with nothing in it. Wait for the next update!.</i>
        </p>
    </BasePost>;
}