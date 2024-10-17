import Link from "next/link";

export default function Nav() {
    return (
        <nav className="flex justify-between items-center py-4">
            <Link href="/">
                <h1>robertnf</h1>
            </Link>
            <ul className="flex gap-4">
                <li>
                    <Link href="/Projects">projects</Link>
                </li>
                <li>
                    <Link href="/Blog">blog</Link>
                </li>
                <li>
                    <Link href="/Contact">contact</Link>
                </li>
            </ul>
        </nav>
    );
}

