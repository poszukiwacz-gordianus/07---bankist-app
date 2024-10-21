export default function Sort({ sortOrder, onSort }) {
  return (
    <div className="mt-2">
      <label htmlFor="sort">Sort by: </label>
      <select
        name="sort"
        id="sort"
        className="rounded-lg px-2 py-1"
        onChange={onSort}
        defaultValue={sortOrder}
      >
        <option value="dateDesc">Date Desc</option>
        <option value="dateAsc">Date Asc</option>
        <option value="desc">Transaction Desc</option>
        <option value="asc">Transaction Asc</option>
      </select>
    </div>
  );
}
