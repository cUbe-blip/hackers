import HeaderLayout from '~ui/Header/HeaderLayout/HeaderLayout';

const Header = () => {
  const name = 'Ilya';
  const lastName = 'Yasinski';
  return <HeaderLayout lastName={lastName} name={name} />;
};
export default Header;
