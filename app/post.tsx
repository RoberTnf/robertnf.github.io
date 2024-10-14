import { readdir } from "fs/promises";

export interface Post {
	slug: string;
	title: string;
	publishedAt: Date;
	updatedAt: Date;
	categories: string[];
	subtitle?: string;
}

export async function getPosts(): Promise<Post[]> {
	// Retrieve slugs from post routes
	const slugs = (
		(await readdir('./app/blog/posts', { withFileTypes: true })).filter(
			(dirent) => dirent.isDirectory()
		)
	);

	// Retrieve metadata from MDX files
	const posts = await Promise.all(
		slugs.map(async ({ name }) => {
			console.log(`./blog/posts/${name}/page.tsx`)
			const { metadata } = await import(`./blog/posts/${name}/page.tsx`);
			return { slug: `./blog/posts/${name}`, ...metadata };
		})
	);

	// Sort posts from newest to oldest
	posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

	return posts;
}