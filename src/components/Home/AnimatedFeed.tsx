"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Card from "@/components/Home/Card";
import { Post } from "@/api";

interface AnimatedFeedProps {
  posts: Post[];
}

export default function AnimatedFeed({ posts }: AnimatedFeedProps) {
  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-8 flex items-center justify-between border-b border-[--text]/10 pb-4"
      >
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[--text] opacity-50">
          Latest Writing
        </h2>
      </motion.div>
      <div className="flex flex-col gap-10">
        {posts.map(({ slug, metaData }, index) => (
          <motion.div
            key={slug}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            <Link href={slug} className="block group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Card metaData={metaData} slug={slug} />
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
