export default function InputFile({
  name,
  value,
  accept,
  multiple,
  onChange,
}) {
  return (
    <input
      type="file"
      name={name}
      value={value}
      accept={accept}
      onChange={onChange}
      multiple={multiple}
      className="file-input file-input-bordered w-full"
      required
    />
  );
}
