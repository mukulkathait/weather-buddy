interface DisplayApiKeysProps {
  keyName: string;
  keyValue: string;
  onChange: (value: string) => void;
}

function DisplayApiKeys({ keyName, keyValue, onChange }: DisplayApiKeysProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-medium text-gray-700" htmlFor={keyName}>
        {keyName}
      </label>
      <input
        id={keyName}
        className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        value={keyValue}
        placeholder={`Enter ${keyName}`}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default DisplayApiKeys;
