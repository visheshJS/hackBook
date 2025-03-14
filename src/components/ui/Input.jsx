import { Input } from "@/components/ui/input";

const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <div className="relative w-full max-w-lg">
      <Input
        type="text"
        placeholder="Search by book name or ISBN..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
