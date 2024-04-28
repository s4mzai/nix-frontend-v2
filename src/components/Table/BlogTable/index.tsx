import { TagIcon } from "@/assets/TagIcon";
import MoreMenu, { Option } from "@/components/MoreMenu";
import { Blog } from "@/types/blog";
import BlogCategory from "@/types/blogCategory";
import BlogPageType from "@/types/blogPages";
import BlogStatus from "@/types/blogStatus";
import { Link } from "react-router-dom";
import Table from "..";

function table_header(page: BlogPageType) {
  switch (page) {
    case BlogPageType.YourStories:
      return ["Last Updated", "Title", "Category", "Status"];
    case BlogPageType.PendingStories:
      return ["Last Updated", "Author", "Title", "Category", "Status"];
    case BlogPageType.ApprovedStories:
      return ["To Publish On", "Author", "Title", "Category", "Status"];
    case BlogPageType.PublishedStories:
      return ["Published On", "Author", "Title", "Category", "Status"];
  }
}

interface BlogRender extends Blog {
  show_date: Date;
}

interface BlogTableProps {
  page_type: BlogPageType;
  paginatedBlogs: Blog[];
  more_menu_options: (blog: Blog) => Option[];
}

export default function BlogTable({
  paginatedBlogs,
  more_menu_options,
  page_type: page,
}: BlogTableProps) {
  const blogs: BlogRender[] = paginatedBlogs.map((blog) => {
    let date = new Date();
    switch (page) {
      case BlogPageType.YourStories:
      case BlogPageType.PendingStories:
        date = new Date(blog.updatedAt);
        break;
      case BlogPageType.ApprovedStories:
      case BlogPageType.PublishedStories:
        date = new Date(blog.published_at);
        break;
    }
    return {
      ...blog,
      show_date: date,
    };
  });

  const content = blogs.map((blog) => [
    <div key={blog._id} className="max-w-24">
      {new Date(blog.show_date).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })}
    </div>,
    <Link key={blog.user._id} to={`/member/member-profile/${blog.user._id}`}>
      {blog.user.name}
    </Link>,
    <Link
      key={`read-${blog._id}`}
      to={`/story/${blog._id}`}
      state={{ blog: blog }}
    >
      {blog.title}
    </Link>,
    BlogCategory[blog.category_id],
    <span
      // tailwind is compiled to real css, so we can't use dynamic tailwind wale class names
      // alternative fix is to re-export these class names in index.css
      // i'm lazy, so i just did this impl instead
      className={`px-2 py-1 inline-block rounded-md ${BlogStatus[blog.status]}`}
      key={blog.category_id}
    >
      <TagIcon className="w-4 h-4 inline max-lg:hidden mr-1 size-min " />
      {BlogStatus[blog.status]}
    </span>,
    <MoreMenu
      options={more_menu_options(blog)}
      blogId={blog._id}
      key={blog._id}
    />,
  ]);

  if (page === BlogPageType.YourStories) {
    content.forEach((row) => row.splice(1, 1));
  }

  return <Table headers={table_header(page)} content={content} />;
}
