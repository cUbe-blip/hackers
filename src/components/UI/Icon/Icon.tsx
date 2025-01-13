import { AppConfig } from '~constant/consts';
import './icon.scss';

interface IconProps {
  height?: string;
  icon: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  width?: string;
}

const Icon: React.FC<IconProps> = ({
  height = AppConfig.typography.iconSize,
  icon,
  onClick,
  width = AppConfig.typography.iconSize,
}) => {
  const iconName = `icon icon--${icon}`;
  const style = { height, width };
  return <div className={iconName} onClick={onClick} style={style}></div>;
};

export default Icon;
