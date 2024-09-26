import { Posts } from '@/app/components/posts';
import { getPosts } from "@/app/post";


export default async function CategoryPage({ params }: { params: { slug: string } }) {
	const posts = await getPosts();
	const category_posts = posts.filter(post => post.categories.includes(params.slug));
	return (
		<Posts posts={category_posts} />
	);
}

export async function generateStaticParams() {
	const posts = await getPosts();
	const categories = Array.from(new Set(posts.map(post => post.categories).flat()));
	return categories.map(category => ({ slug: category }));
}
