export default function InputComponent({
  label,
  placeholder,
  onChange,
  value,
  type,
}) {
  return (
    <div className="relativa">
      <p className="pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-bold text-dark-600 bg-white">
        {label}
      </p>
      <input
        placeholder={placeholder}
        type={type || "text"}
        value={value}
        onChange={onChange}
        className="border placeholder-gray-400 focus:outline-none focus:border-orange-300 w-full pt-4 pr-4 pb-2 pl-4 mr-0 mt-4 ml-0 text-base block bg-white border-black rounded-md"
      />
    </div>
  );
}
