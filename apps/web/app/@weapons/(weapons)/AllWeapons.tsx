import { Card } from "@repo/ui";
import Image from "next/image";
import React from "react";

const AllWeapons = () => {
  return (
    <>
      <Card>
        <div className="flex items-center gap-x-2">
          <p className="text-sm font-semibold text-red-500">Weapons</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="space-y-2">
            <Image
              className="w-full  object-cover"
              height={200}
              width={200}
              src=""
              alt="Image Description"
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default AllWeapons;
