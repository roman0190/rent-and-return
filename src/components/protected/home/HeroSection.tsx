import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="bg-indigo-700 rounded-xl p-8 text-white">
      <h1 className="mb-2 text-lg font-medium">Welcome to Rent & Return</h1>
      <p className="text-indigo-100 mb-6 font-light text-sm">
        Rent items you need, earn from items you own
      </p>
      <div className="flex flex-wrap gap-3 ">
        <Link href={"/items"}>
          <Button
            size={"lg"}
            variant={"secondary"}
            className="cursor-context-menu"
          >
            <Search className="w-4 h-4 mr-2" />
            Browse Items
          </Button>
        </Link>
        <Link href={"/items/add-item"}>
          <Button
            size={"lg"}
            className="border border-white bg-transparent text-white hover:bg-white/10 cursor-cell"
          >
            <Plus className="w-4 h-4 mr-2" />
            List Your Item
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
