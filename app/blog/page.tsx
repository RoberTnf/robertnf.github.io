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
            ideas to share.
            What I write might not be the highest quality material, or novel, or even interesting. But, it is something that
            <span className="emphasis"> I</span> wrote. And I&apos;ve learned that writing is crucial to learning. It forces me to
            think about what I&apos;m writing and understand it in a deeper way.
        </p>
    </div>;
}
