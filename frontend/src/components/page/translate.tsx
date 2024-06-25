import { useParams } from "react-router-dom";

export const TranslatePage = () => {
  const { id } = useParams();

  console.log(id);

  return <></>;
};
export default TranslatePage;
