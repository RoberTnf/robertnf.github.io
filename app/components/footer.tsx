export default function Footer() {
	return <footer>
		<hr />
		<div className="flex justify-between">
			<p>Code in <a href="https://github.com/RoberTnf">GitHub</a>.</p>
			<p>© {new Date().getFullYear()} Soft Santa Cruz SLU</p>
		</div>
	</footer>;
}

