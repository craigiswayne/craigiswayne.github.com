import { BlogList } from "../components/BlogList";
import { useNavigate } from "react-router-dom";

export function BlogListPage() {
  const navigate = useNavigate();

  const handleBlogPostClick = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  return <BlogList onPostClick={handleBlogPostClick} />;
}
