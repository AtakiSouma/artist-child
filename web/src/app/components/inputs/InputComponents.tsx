import { Input } from "antd";
import { MyInputProps } from "../../models/Input.models";
import { ErrorMessage } from "formik";
import { ConfigProvider } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// const handleInputFocusBlur = (id: string, focused: boolean) => {
//   const element = document.getElementById(id);
//   if (element) {
//     if (focused) {
//       element.classList.add("border-blue-500");
//     } else {
//       element.classList.remove("border-blue-500");
//     }
//   }
// };
function MyInputComponents({
  field,
  placeholder,
  isPassword,
  icon,
}: MyInputProps) {
  const { name, value, onChange, allowClear, size } = field;
  return (
    <>
      {isPassword ? (
        <>
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  colorIcon: "#003C43",
                  activeBorderColor: "#135D66",
                },
              },
            }}
          >
            <div className="relative">
              <Input.Password
                {...field}
                value={value || ""}
                onChange={onChange}
                allowClear={allowClear || true}
                size={size || "middle"}
                className="px-5 py-3"
                prefix={icon}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              <p className="absolute top-0 z-50 px-1 text-xs translate-x-3 -translate-y-2 bg-white">
                {placeholder}
              </p>
              <ErrorMessage
                name={name}
                component="p"
                className="ml-2 text-sm text-red-500"
              />
            </div>
          </ConfigProvider>
        </>
      ) : (
        <ConfigProvider
          theme={{
            components: {
              Input: {
                colorIcon: "#003C43",
                activeBorderColor: "#135D66",
              },
            },
          }}
        >
          <div className="relative">
            <Input
              {...field}
              value={value || ""}
              onChange={onChange}
              allowClear={allowClear || true}
              size={size || "large"}
              className="px-5 py-3"
              prefix={icon}
            />
            <p className="absolute top-0 z-50 px-1 text-xs translate-x-3 -translate-y-2 bg-white">
              {placeholder}
            </p>
            <ErrorMessage
              name={name}
              component="p"
              className="ml-2 text-sm text-red-500"
            />
          </div>
        </ConfigProvider>
      )}
    </>
    // <ConfigProvider
    //   theme={{
    //     components: {
    //       Input: {
    //         hoverBg: "#003C43",
    //       },
    //     },
    //   }}
    // >
    //   <div className="relative">
    //     <Input
    //       {...field}
    //       value={value || ""}
    //       onChange={onChange}
    //       allowClear={allowClear || true}
    //       size={size || "large"}
    //       className="px-5 py-3"
    //       suffix={icon}
    //     />
    //     <p className="absolute top-0 z-50 px-1 text-xs translate-x-3 -translate-y-2 bg-white">
    //       {placeholder}
    //     </p>
    //     <ErrorMessage
    //       name={name}
    //       component="p"
    //       className="ml-2 text-sm text-red-500"
    //     />
    //   </div>
    // </ConfigProvider>
  );
}

export { MyInputComponents };
