import { SizeType } from "antd/es/config-provider/SizeContext";

export interface MyInputProps {
  id: string;
  field: {
    name: string;
    value: string;
    allowClear: boolean;
    size: SizeType;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  placeholder: string;
  isPassword: boolean;
  icon: React.ReactNode;

}
