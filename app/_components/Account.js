import MainHeader from "../_components/MainHeader";
import Movements from "./Movements";
import Actions from "../_components/Actions";
import Sort from "../_components/Sort";
import { useEffect, useState } from "react";
import { sortMovements } from "../_lib/helpers";

export default function Account({ currentUser }) {
  const [sortedData, setSortedData] = useState({
    sortOrder: "dateDesc",
    items: [],
  });

  useEffect(() => {
    const movements = currentUser?.movements || [];

    setSortedData({
      sortOrder: "dateDesc",
      items: sortMovements("dateDesc", movements),
    });
  }, [currentUser]);

  const handleSort = (e) => {
    const sortOrder = e.target.value;

    if (sortOrder !== sortedData.sortOrder) {
      const items = sortMovements(sortOrder, sortedData.items);
      setSortedData({ sortOrder, items });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 p-4 md:grid md:grid-cols-[1.5fr_1fr] lg:mx-auto lg:max-w-screen-lg lg:grid-cols-[1.25fr_0.75fr] lg:gap-x-5 lg:gap-y-10 lg:px-10 lg:py-8">
        <MainHeader currentUser={currentUser} />

        <div className="py-4 md:py-0">
          <Movements currentUser={currentUser} sortedData={sortedData} />
          <Sort sortOrder={sortedData.sortOrder} onSort={handleSort} />
        </div>

        <Actions />
      </div>
    </>
  );
}
