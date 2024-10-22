"use client";

import { useEffect, useMemo, useState } from "react";
import { Sort, AccountHeader, ActionList, Movements } from "../Components";
import { sortMovements } from "@/app/_lib/helpers";

export default function Account({ currentUser }) {
  const [sortOrder, setSortOrder] = useState("dateDesc");
  const [prevMov, setPrevMov] = useState(currentUser?.movements || []);

  const sortedData = useMemo(() => {
    const movements = currentUser?.movements || [];
    return {
      sortOrder,
      items: sortMovements(sortOrder, movements),
    };
  }, [currentUser, sortOrder]);

  // Use useEffect to detect changes in movements
  useEffect(() => {
    const movements = currentUser?.movements || [];
    if (movements.length > prevMov.length) {
      setPrevMov(movements);
      setSortOrder("dateDesc"); // Reset sort order when new movement is added
    }
  }, [currentUser, prevMov]);

  const handleSort = (e) =>
    e.target.value !== sortOrder && setSortOrder(e.target.value);

  return (
    <>
      <div className="flex flex-col gap-6 p-4 md:grid md:grid-cols-[1.5fr_1fr] lg:mx-auto lg:max-w-screen-lg lg:grid-cols-[1.25fr_0.75fr] lg:gap-x-5 lg:gap-y-10 lg:px-10 lg:py-8">
        <AccountHeader />

        <div className="py-4 md:py-0">
          <Movements sortedData={sortedData} />
          <Sort sortOrder={sortOrder} onSort={handleSort} />
        </div>

        <ActionList />
      </div>
    </>
  );
}
