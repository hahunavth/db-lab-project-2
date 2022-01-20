import React, { ReactElement, useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import TableCard from "../../components/Admin/TableCard";
import { ApiProductT } from "../../types/api";
import StatusCard from "../../components/Admin/StatusCard";
import { ApiReportT } from "../api/statistic/report";

interface Props {}

export default function Index({}: Props): ReactElement {
  const [data, setData] = useState<ApiProductT[]>([]);
  const [report, setReport] = useState<ApiReportT>();

  useEffect(() => {
    console.log("data");
    (async () => {
      const result = await fetch("/api/statistic/bestShellingWeek").then(
        (res) => res.json()
      );
      if (result?.data) setData(() => result?.data || []);

      const result2 = await fetch("/api/statistic/report").then((res) =>
        res.json()
      );
      if (result2?.data) setReport(() => result2?.data);
    })();
  }, []);
  console.log(data);

  return (
    <>
      <Sidebar />

      <div className="md:ml-64 mt-16 max-w-6xl ml-60">
        <TableCard name={"Thong ke doanh thu"} list={data} />
        <div className="container mx-auto max-w-full grid grid-cols-4 mt-12">
          <StatusCard
            color="pink"
            icon="trending_up"
            title="Don hang"
            amount={report?.donHang}
            percentage="3.48"
            percentageIcon="arrow_upward"
            percentageColor="green"
            date="Since last month"
          />
          <StatusCard
            color="orange"
            icon="groups"
            title="Nguoi dung moi"
            amount={report?.ngDung}
            percentage="3.48"
            percentageIcon="arrow_downward"
            percentageColor="red"
            date="Since last month"
          />
          <StatusCard
            color="purple"
            icon="paid"
            title="Het hang"
            amount={report?.hetHang}
            percentage="1.10"
            percentageIcon="arrow_downward"
            percentageColor="orange"
            date="Since last month"
          />
          <StatusCard
            color="blue"
            icon="poll"
            title="Nhap hang"
            amount={report?.nhapHang}
            percentage="12"
            percentageIcon="arrow_upward"
            percentageColor="green"
            date="Since last month"
          />
        </div>
      </div>
    </>
  );
}
