import BasePost from "@/app/components/base_post";

export const metadata = {
  title: "Why I abandoned Bullet Chess Heaven",
  publishedAt: new Date("2026-01-06"),
  updatedAt: new Date("2026-01-06"),
  categories: ["gamedev", "bch", "rust", "bevy"],
};

export default function BulletChessHeavenInBevy() {
  return <BasePost title={metadata.title}>
    <p>
      This is a difficult blog post to publish. It comes 14 months after the last one, to announce that I&apos;m cancelling the project. But, without overcoming the shame there would be no new posts, no showing to the world what else I have been working on! So here I am, writing about my failure.
    </p>

    <h2> Why? </h2>

    <p>
      It wasn&apos;t fun. The basic core loop was just <i>fine</i>, but it wasn&apos;t anything too groundbreaking or fun. Basing the game around the rules of chess gave the game a sense of familiarity that made it easy to pick up, and the first alpha testers (friends and family) were encouraging.
      However, I struggled to make it into anything than a fun 15 minute or so game. Why play a second round if you had seen most of it in the first one? Most Roguelites have randomness and different mechanics that serve to keep the game fresh and interesting. However, I struggled to come up
      with ideas that didn&apos;t fully break chess familiarity.
    </p>

    <p>
      I decided to give myself extra time to think about solutions. And slowly but surely, I stopped thinking about the game altogether. Real life got in the way. I moved from Stockholm to Tenerife. I got married. I got diagnosed with high blood pressure. At work, I even had a short stint as interim CTO. Each of those was a convenient excuse to delay. But honestly? The game just wasn&apos;t fun enough to fight for time.
    </p>

    <p>
      So why write about it? I didn&apos;t write about it for 14 months, I could just have removed the blog. Well, most people hide their failures, but I will wear mine with pride. I had fun, I learned Rust, and I learnt about the ECS paradigm.
    </p>

    <h2>What now? </h2>

    <p>
      I will write about my new projects. Probably. Maybe even before another 14 months pass. No promises. In the meantime, check out my party game, <a href="https://kesslersarena.com/">Kessler&apos;s Arena</a>!
    </p>
  </BasePost >;
}
