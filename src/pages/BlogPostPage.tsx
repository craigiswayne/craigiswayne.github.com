import { BlogPost } from "../components/BlogPost";
import { useParams, useNavigate } from "react-router-dom";

export function BlogPostPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/blog');
  };

  if (!postId) {
    navigate('/blog');
    return null;
  }

  return <BlogPost postId={postId} onBackClick={handleBackClick} />;
}
