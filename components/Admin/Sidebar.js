import { useState } from "react";
// import { NavLink } from 'react-router-dom';
import AdminNavbar from "./AdminNavbar";
// import Icon from "@material-tailwind/react/Icon";
import H6 from "@material-tailwind/react/Heading6";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { RiSettings4Fill } from "react-icons/ri";
// import { BiImport } from "react-icon/bi";
import { MdManageSearch } from "react-icons/md";
import className from "classnames";
import { useRouter } from "next/router";

const list = [
  {
    name: "Dashboard",
    component: MdDashboard,
    path: "/admin",
  },
  {
    name: "Nhap Hang",
    component: BsGrid3X3GapFill,
    path: "/admin/nhapHang",
  },
  {
    name: "QL Don Hang",
    component: MdManageSearch,
    path: "/admin/qlDonHang",
  },
];

export default function Sidebar() {
  const router = useRouter();

  const [showSidebar, setShowSidebar] = useState("-left-64");

  return (
    <>
      <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <Link
            href="https://material-tailwind.com?ref=mtd"
            passHref
            className="mt-2 text-center w-full inline-block"
          >
            <H6 color="gray">WatchStore Admin</H6>
          </Link>
          <div className="flex flex-col">
            <hr className="my-4 min-w-full" />

            <ul className="flex-col min-w-full flex list-none">
              {list.map((Item) => (
                <li
                  className={className(
                    "rounded-lg mb-4 hover:bg-gray-100 shadow-md p-5",
                    {
                      "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md":
                        Item.path === router.pathname,
                    }
                  )}
                  key={Item.name}
                >
                  <Link
                    href={Item.path}
                    passHref
                    onClick={() => setPath(Item.path)}
                    // className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  >
                    <div className="grid grid-cols-4">
                      <Item.component size={24} />
                      <span className="col-span-3">{Item.name}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex-col min-w-full flex list-none absolute bottom-0">
              {/* NOTE: Bottom content */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
