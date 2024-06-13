import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

type Props = { name: string; field: string };
const SortButton = ({ name }: Props) => {
  return (
    <Button variant="ghost" onClick={() => {}}>
      {name}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};
export default SortButton;
