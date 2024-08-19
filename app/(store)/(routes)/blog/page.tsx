import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import BlogCard from './components/BlogCard';

const BlogsMainPage = async () => {
  const blogs = await db.blogs.findMany({
    where: {
      isFeatured: true,
      isArchived: false,
    },
    include: {
      imagesBlog: true,
      category: true,
      // : true, // Include the 'imagesBlog' property
    },
  });

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Featured Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.name.replace(/\s+/g, '-')}`}>
          <BlogCard data={blog} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogsMainPage;
