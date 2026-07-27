import { cn } from "../../lib/utils";

function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-gray-300 px-3 py-2 outline-none",
        "focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
        className
      )}
      {...props}
    />
  );
}

export default Input;