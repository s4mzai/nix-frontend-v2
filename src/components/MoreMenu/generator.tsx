import API from "@/services/API";
import { Blog } from "@/types/blog";
import BlogStatus from "@/types/blogStatus";
import { CustomError } from "@/types/contextTypes";
import Permission from "@/types/permissions";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { Option } from ".";

interface MoreMenuGeneratorProps {
  blog: Blog;
  navigate: NavigateFunction;
  fetchBlogs: () => void;
  setError: (error: CustomError) => void;
  toast: typeof toast;
}

export function moreMenuOptionsGenerator({
  navigate,
  blog,
  setError,
  fetchBlogs,
  toast,
}: MoreMenuGeneratorProps): Option[] {
  const handleDelete = (blogId: string) => {
    const choice = window.confirm(
      "Are you sure you want to delete this story?",
    );
    if (choice) {
      const deleteEndPoint = `/blog/delete-blog/${blogId}`;

      API.delete(deleteEndPoint)
        .then(() => {
          toast.success("Successfully deleted");
          fetchBlogs();
        })
        .catch((e) => setError(e));
      console.debug("story deleted");
    }
  };

  const handleEdit = (blogId: string) => {
    //TODO edit blog, should open the blog on the new blog view
    console.debug(blogId);
    API.get(`/blog/get-blog/${blogId}`)
      .then((blogResponse) => {
        const blogDetails = blogResponse.data.data;
        navigate("/story/new-story", { state: { key: blogDetails } });
      })
      .catch((e) => setError(e));
    console.debug("story edited");
  };

  const handleSubmit = (blogId: string) => {
    const choice = window.confirm(
      "Are you sure you want to submit this story for approval?",
    );
    if (choice) {
      API.put(`/blog/submit-for-approval/${blogId}`)
        .then((_) => {
          toast.success("Successfully submitted for approval!");
          fetchBlogs();
        })
        .catch((e) => setError(e));
      console.debug("story submitted");
    }
  };

  const handleArchive = (blogId) => {
    //archive is same as takedown dw
    const choice = window.confirm(
      "Are you sure you want to archive this story?",
    );
    if (choice) {
      const archiveEndPoint = `/blog/take-down-blog/${blogId}`;

      API.put(archiveEndPoint)
        .then(() => {
          toast.success("Successfully archived");
          fetchBlogs();
        })
        .catch((e) => setError(e));
      console.debug("story archived");
    }
  };

  const handlePublishNow = () => {
    const choice = window.confirm(
      "Are you sure you want to publish this story?",
    );
    if (choice) {
      const publishEndPoint = `/blog/publish-blog/${blog._id}`;

      API.put(publishEndPoint)
        .then(() => {
          toast.success("Successfully published");
          navigate(0);
        })
        .catch((e) => setError(e));
    }
  };

  const more_menu_options: Option[] = [
    {
      label: "Read",
      handler: () => navigate(`/story/${blog._id}`),
      show: true,
      permissions: [Permission.ReadBlog],
    },
    {
      label: "Delete",
      handler: handleDelete,
      show: blog.status !== BlogStatus.Draft,
      permissions: [Permission.DeleteBlog],
    },
    {
      label: "Delete",
      handler: handleDelete,
      show: blog.status == BlogStatus.Draft,
      permissions: [],
    },
    {
      label: "Archive",
      handler: handleArchive,
      show: blog.status === BlogStatus.Pending,
      permissions: [],
    },
    {
      label: "Archive",
      handler: handleArchive,
      show:
        blog.status === BlogStatus.Approved ||
        blog.status === BlogStatus.Published,
      permissions: [Permission.DeleteBlog],
    },
    {
      label: "Edit",
      handler: handleEdit,
      show:
        blog.status === BlogStatus.Approved ||
        blog.status === BlogStatus.Pending,
      permissions: [Permission.EditBeforeBlogPublish],
    },
    {
      label: "Edit",
      handler: handleEdit,
      show: blog.status === BlogStatus.Draft,
      permissions: [Permission.UpdateBlog],
    },
    {
      label: "Submit",
      handler: handleSubmit,
      show: blog.status === BlogStatus.Draft,
      permissions: [Permission.CreateBlog],
    },
    {
      label: "Publish",
      handler: handlePublishNow,
      show:
        blog.status === BlogStatus.Pending ||
        blog.status === BlogStatus.Approved,
      permissions: [Permission.PublishBlog],
    },
  ];

  return more_menu_options;
}
