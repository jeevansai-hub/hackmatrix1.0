import type { Metadata } from "next";

// The panel is reachable only by typing /admin — nothing on the site links to
// it, and this keeps it out of search engines and link previews.
export const metadata: Metadata = {
  title: "Admin · HackMatrix 1.0",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
