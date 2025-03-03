import Title from "antd/es/typography/Title";

interface Props {
  text: string;
  color?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  font?: string;
  type?: "secondary" | "primary" | "warning" | "danger";
}

function TitleComponent(props: Props) {
  const { text, color, level } = props;
  return (
    <Title color={color} level={level}>
      {text}
    </Title>
  );
}
function TextComponent() {}

export { TitleComponent, TextComponent };
