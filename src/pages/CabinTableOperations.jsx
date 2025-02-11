import TableOperations from "./../ui/TableOperations.jsx";
import Filter from "./../ui/Filter.jsx";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "no-discount", label: "No discount" },
  { value: "with-discount", label: "With discount" },
];
export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter filterField="discount" options={filterOptions} />
    </TableOperations>
  );
}
