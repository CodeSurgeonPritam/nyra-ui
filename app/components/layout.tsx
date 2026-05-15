import { SiteNav } from "@/components/site/site-nav";
import { CatalogSidebar } from "@/components/site/catalog-sidebar";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh">
      <SiteNav />
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-14 max-h-[calc(100dvh-3.5rem)] overflow-y-auto py-8 pr-2">
              <CatalogSidebar />
            </div>
          </aside>
          <main className="min-w-0 py-8 sm:py-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
