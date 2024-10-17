import Link from "next/link";

export default function Nav() {
    return (
        <nav className="flex justify-between items-center py-4">
            <Link href="/">
                <h1>robertnf</h1>
            </Link>
            <ul className="flex gap-4">
                <li>
                    <Link href="/projects">Projects</Link>
                </li>
                <li>
                    <Link href="/blog">Blog</Link>
                </li>
                <li>
                    <Link href="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    );
}

