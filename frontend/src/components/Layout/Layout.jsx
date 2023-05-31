import './Layout.css';
import Header from '../header/Header';

const Layout = ({ children }) => {
  return (
    <div className="Layout-container">
      <Header />
      <div className="Layout-content">{children}</div>
    </div>
  );
};

export default Layout;
