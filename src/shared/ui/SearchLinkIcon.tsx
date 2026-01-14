"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function SearchLinkIcon() {
  const pathname = usePathname();
  const isSearchPage = pathname === "/search";
  const router = useRouter();

  const animationProps = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.2 },
  };

  return (
    <div className="relative w-6 h-6">
      <AnimatePresence mode="wait">
        {isSearchPage ? (
          <motion.button
            key="x"
            {...animationProps}
            className="absolute inset-0 text-gray-600 hover:text-gray-900"
            onClick={() => router.back()}
          >
            <X size={24} />
          </motion.button>
        ) : (
          <motion.div
            key="search"
            {...animationProps}
            className="absolute inset-0 text-gray-600 hover:text-gray-900"
          >
            <Link href="/search">
              <Search size={24} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
