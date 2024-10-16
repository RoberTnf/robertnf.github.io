import Link from "next/link";
import { Posts } from "../components/posts";
import { getPosts } from "../post";

export default async function Blog() {
    return <div>
        <h1>Blog</h1>
        <Posts posts={await getPosts()} />
        <h2>Why have a blog?</h2>
        <p>
            There are many reasons. Having technical material online can help me land a job in the future.
            It can also help other people who are trying to learn the same things. It is a good way to
            practice writing and presenting material in a way that is accessible.
        </p>
        <p>
            However, the main reason is that it forces me to live my technical life in a way that I seek interesting
            ideas to share. I aim to write a new blog post every other week, so I need to keep learning and thinking.
            What I write might not be the highest quality material, or novel, or even interesting. But it is something that
            <span className="emphasis">I</span> wrote. And I&apos;ve learnt that writing is crucial to learning. It forces me to
            think about what I&apos;m writing and understand in a deeper way.
        </p>
        <h2>Did you find my blog?</h2>
        <p>
            I don&apos;t track visitors at all. I also don&apos;t publicize this blog anywhere. If you found it and liked it,
            please let me know about it <Link href="/contact">here</Link>. I&apos;d love to hear from you.
        </p>
    </div>;
}
