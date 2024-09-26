import { Posts } from "../components/posts";
import { getPosts } from "../post";

export default async function Blog() {
	return <div>
		<h1>Blog</h1>
		<Posts posts={await getPosts()} />
	</div>;
}
