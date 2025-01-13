import { Link } from 'react-router-dom';
import './headerItem.scss';

interface HeaderItemProps {
  name: string;
}
const HeaderItem: React.FC<HeaderItemProps> = (props) => {
  return (
    <Link className="header_item" to={`/${props.name}`}>
      {props.name}
    </Link>
  );
};
export default HeaderItem;
