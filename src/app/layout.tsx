import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const font = Poppins({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "OpenStack Classroom",
	description: "AI powered classroom management system",
	icons: [
		"/internal/favicon.svg"
	]
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={font.className + ' h-screen relative'}>
				<div className="h-full w-full text-sm flex flex-col">
					<nav className="bg-background dark:bg-background-subtle p-4 w-full flex flex-row items-center px-7 border-b border-border dark:border-border-dark shadow-sm">
						<div className="flex-1">
							<a href="/" className="flex flex-row items-center space-x-1">
								<img src="/internal/favicon.svg" alt="logo" className="w-9" width={36} height={36} />
								<h1 className="text-lg font-semibold text-foreground">studious</h1>
							</a>
						</div>
					</nav>
					<div className="flex-grow text-sm w-full flex justify-center overflow-y-auto">
						<div className="w-full">
							{children}
						</div>
					</div>
				</div>
			</body>
		</html>
	);
}
