import { ChangeEvent, CSSProperties, ReactNode } from "react";
import { InputType } from "zlib";

type inputLabelProps = {
  label: string;
  inputProps: {
    children?: ReactNode;
    className?: string;
    id?: string;
    label?: string;
    name?: string;
    onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    style?: CSSProperties;
    type: string;
    value?: any;
    required?: boolean;
  };
};

const InputLabel = ({ label, inputProps }: inputLabelProps) => {
  return (
    <div className="flex flex-col">
      <span className="text-xs capitalize">
        {label}
        {inputProps.required && <span className="text-red-300 text-xs">*</span>}
      </span>
      <input
        className="border border-gray-400 rounded p-2 focus:border-gray-600"
        {...inputProps}
      />
    </div>
  );
};

export default InputLabel;
