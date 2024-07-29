export default function TextArea({
  name,
  value,
  onChange,
  maxLength,
  placeholder,
}) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className="textarea textarea-bordered min-h-[200px] max-h-[200px]"
      placeholder={placeholder ? placeholder : "Enter a value"}
      required
    />
  );
}
