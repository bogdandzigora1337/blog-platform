import { useParams } from "react-router-dom";

const ArticleExpanded: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return <h1>Hello</h1>;
};

export default ArticleExpanded;
