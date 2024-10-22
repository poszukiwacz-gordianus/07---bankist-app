const sortOptions = [
  { value: "dateDesc", label: "Date Descending" },
  { value: "dateAsc", label: "Date Ascending" },
  { value: "desc", label: "Transaction Descending" },
  { value: "asc", label: "Transaction Ascending" },
];

export default function Sort({ sortOrder, onSort }) {
  return (
    <div className="mt-6 sm:mt-4">
      <label htmlFor="sort" className="text-lg">
        Sort by:
      </label>
      <select
        name="sort"
        id="sort"
        className="rounded-lg px-2 py-1"
        onChange={onSort}
        value={sortOrder}
        aria-label="Select sort order"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
