export default function BasePost({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
    return (
        <div>
            <div className="mb-4">
                <h1>{title}</h1> {subtitle && <span className="text-gray-500"> - {subtitle}</span>}
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}