import { cn } from "../../lib/utils";

const variants = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white",

  secondary:
    "bg-gray-200 hover:bg-gray-300 text-gray-900",

  danger:
    "bg-red-600 hover:bg-red-700 text-white",

  outline:
    "border border-gray-300 hover:bg-gray-100 text-gray-800",
};

function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg font-medium transition duration-200 cursor-pointer",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;