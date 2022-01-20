import React, { ReactElement, useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import TableCard from "../../components/Admin/TableCard";
import { ApiProductT } from "../../types/api";

interface Props {}

export default function Index({}: Props): ReactElement {
  const [data, setData] = useState<ApiProductT[]>([]);
  useEffect(() => {
    console.log("data");
    (async () => {
      const result = await fetch("/api/statistic/bestShellingWeek").then(
        (res) => res.json()
      );
      if (result?.data) setData(() => result?.data || []);
    })();
  }, []);
  console.log(data);

  return (
    <>
      <Sidebar />
      <div className="md:ml-64 mt-16 max-w-6xl ml-60">
        <TableCard name={"aa"} list={data} />
      </div>
    </>
  );
}
