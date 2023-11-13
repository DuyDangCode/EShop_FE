import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
import Search from "../search/Search";

const redressed = Redressed({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const NavBar = () => {
  return (
    <div className="sticky w-full z-30 bg-slate-200 top-0 shadow-sm">
      <Container>
        <div className="flex w-full justify-between items-center gap-3 md:gap-0">
          <Link
            href={"/"}
            className={`${redressed.className} font-bold text-2xl`}
          >
            E-Shop
          </Link>
          <div className="hidden sm:block">
            <Search />
          </div>
          <div className="flex gap-8 md:gap-12 justify-between">
            <div className="">Card</div>
            <div className="">Avatar</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
