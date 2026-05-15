"use client";

import { Fragment, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: ReactNode;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  /** Custom separator. Defaults to a chevron. */
  separator?: ReactNode;
};

/**
 * Accessible breadcrumb trail. Each linked crumb has an animated accent
 * underline on hover; the final crumb is marked `aria-current="page"`.
 */
export function Breadcrumbs({ items, className, separator }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-xs", className)}
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-foreground-muted">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={i}>
              <li className="flex items-center">
                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={cn(isLast && "text-foreground")}
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className="group relative inline-flex items-center transition-colors duration-200 hover:text-foreground"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </a>
                )}
              </li>
              {!isLast && (
                <li
                  aria-hidden
                  className="flex items-center text-foreground-muted/60"
                >
                  {separator ?? <ChevronRight className="h-3 w-3" />}
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
