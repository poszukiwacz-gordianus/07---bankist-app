import { sortedArray } from "../_lib/helpers";

export default function Sort({ arr, onSet }) {
  const handleSort = (e) => {
    let sorted;
    switch (e.target.value) {
      case "asc":
        sorted = sortedArray(arr, (a, b) => a.amount - b.amount);
        break;
      case "desc":
        sorted = sortedArray(arr, (a, b) => b.amount - a.amount);
        break;
      case "dateAsc":
        sorted = sortedArray(
          arr,
          (a, b) => new Date(a.date) - new Date(b.date),
        );
        break;
      case "dateDesc":
        sorted = sortedArray(
          arr,
          (a, b) => new Date(b.date) - new Date(a.date),
        );
        break;

      default:
        sorted = arr;
        break;
    }

    onSet(sorted);
  };

  return (
    <div className="mt-2">
      <label>Sort by: </label>
      <select
        name="sort"
        id="sort"
        className="rounded-lg px-2 py-1"
        onChange={handleSort}
      >
        <option value="dateAsc">Date Asc</option>
        <option value="dateDesc">Date Desc</option>
        <option value="asc">Transaction Asc</option>
        <option value="desc">Transaction Desc</option>
      </select>
    </div>
  );
}
