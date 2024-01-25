import { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col border rounded dark:border-gray-800">
      <div className="p-4 md:p-5">{children}</div>
    </div>
  );
};

export default Card;
