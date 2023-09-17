import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

function NavBar(props) {

  const items = [];

  const navigate = useNavigate();

  const onLogoClick = () => {
    navigate("/");
  };

  const onProfileClick = () => {
    navigate("/profile");
  };

  const start = <div onClick={onLogoClick} className="nav-logo"><span className="pi pi-bolt" style={{ fontSize: '1.5rem' }}></span><span> Three Pics</span></div>;
  const end = <span onClick={onProfileClick} className="pi pi-user" style={{ fontSize: '1.5rem' }}></span>;

  return (
    <div className="card">
      <Menubar model={items} start={start} end={end} />
    </div>
  )
}

export default NavBar;
