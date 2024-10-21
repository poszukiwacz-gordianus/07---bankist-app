import MainHeader from "../_components/MainHeader";
import Operations from "../_components/Operations";
import Actions from "../_components/Actions";
import Sort from "../_components/Sort";
import { useEffect, useState } from "react";

export default function Account({ currentUser }) {
  const movements = currentUser?.movements || [];

  const [sortMovements, setSortMovements] = useState(movements);

  useEffect(() => {
    setSortMovements(movements);
  }, [movements]);

  return (
    <>
      <div className="flex flex-col gap-6 p-4 md:grid md:grid-cols-[1.5fr_1fr] lg:mx-auto lg:max-w-screen-lg lg:grid-cols-[1.25fr_0.75fr] lg:gap-x-5 lg:gap-y-10 lg:px-10 lg:py-8">
        <MainHeader balance={currentUser?.balance} />

        <div className="py-4 md:py-0">
          <Operations operations={sortMovements} />
          <Sort arr={sortMovements} onSet={setSortMovements} />
        </div>

        <Actions />
      </div>
    </>
  );
}
