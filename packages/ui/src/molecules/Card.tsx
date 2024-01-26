import { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col flex-grow border rounded dark:border-gray-200 w-full h-full shadow overflow-hidden">
      <div className="p-3 md:p-3 flex-grow relative flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default Card;
