import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import { useXmlData } from "@/hooks/use-xml-data";

type Props = { name: string; field: string };
const SortButton = ({ name, field }: Props) => {
  const {
    sortBy,
    sort,
    setSortBy,
    changeSort,
    page,
    getAllXmlData,
    setSort,
    filter,
    filterBy,
  } = useXmlData();

  const Arrow = sort === 1 ? ArrowUp : ArrowDown;
  const isSelected = field === sortBy;

  const onClick = async () => {
    await getAllXmlData(page, sortBy, sort, filter, filterBy);
    if (isSelected) {
      changeSort();
      return;
    }
    setSortBy(field);
    setSort(-1);
  };

  return (
    <Button variant="ghost" onClick={onClick}>
      {name}
      {isSelected && <Arrow className="ml-2 h-4 w-4" />}
    </Button>
  );
};
export default SortButton;
