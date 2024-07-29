export default function Input({
  type,
  name,
  value,
  maxLength,
  onChange,
  placeholder,
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className="input input-bordered w-full"
      placeholder={placeholder ? placeholder : "Enter a value"}
      required
    />
  );
}
