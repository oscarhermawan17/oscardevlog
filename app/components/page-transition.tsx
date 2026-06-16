"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const PAGE_ORDER = ["/", "/about", "/blog", "/projects"];

function getIndex(path: string) {
  const idx = PAGE_ORDER.findIndex((p) =>
    p === "/" ? path === "/" : path.startsWith(p)
  );
  return idx === -1 ? 0 : idx;
}

type Direction = "left" | "right" | "none";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);
  const [direction, setDirection] = useState<Direction>("none");
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (prevPathRef.current === pathname) return;

    const prevIdx = getIndex(prevPathRef.current);
    const nextIdx = getIndex(pathname);
    setDirection(nextIdx > prevIdx ? "right" : "left");
    setKey((k) => k + 1);
    prevPathRef.current = pathname;
  }, [pathname]);

  const animation =
    direction === "right"
      ? "animate-slide-from-right"
      : direction === "left"
        ? "animate-slide-from-left"
        : "";

  return (
    <div key={key} className={animation}>
      {children}
    </div>
  );
}
