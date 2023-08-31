import React from "react";

interface CustomDropdownProps {
  value: string | number;
  defaultValue?: string;
  placeholder: string;
  name: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  optionsList: { name: string; value: any }[];
  disabled?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  onChange = () => {},
  value,
  defaultValue,
  placeholder,
  name,
  optionsList,
  disabled
}) => {
  return (
    <div className="w-full">
      <select
        className="w-full py-3 px-4 text-[#6E8877] border border-grey focus:outline-none rounded"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onClick={onChange}
        disabled={disabled}
      >
        {defaultValue && (
          <option value="" disabled>
            {defaultValue}
          </option>
        )}
        {optionsList.map((optionItem: any, index: number) => {
          return (
            <option
              key={index}
              value={optionItem.value}
              id={optionItem.value?.toString()}
            >
              {optionItem.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CustomDropdown;
