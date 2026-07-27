import { cn } from "../../lib/utils";

function Card({ children, className }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-6 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card