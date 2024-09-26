import { type Post } from '../post';
import Link from 'next/link';


export function Posts({ posts }: { posts: Post[] }) {
	return (
		<ul style={{ listStyleType: 'none', padding: 0 }}>
			{posts.map(({ slug, title, publishedAt, categories }) => (
				<li key={slug} className="flex items-center mb-2 caret">
					<Link href={`/${slug}`}>{title}</Link>
					<span className="ml-2 text-gray-600">
						- {categories.map(category => (
							<><Link key={category} href={`/blog/category/${category}`}>
								{`#${category}`}
							</Link> </>
						))}
					</span>
					<span className="ml-2 text-gray-600">
						- {publishedAt.toLocaleDateString()}
					</span>
				</li>
			))}
		</ul>
	);
}