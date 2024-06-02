import './sidebar.css';
import logo from '../../assets/logo/white-logo-full.png';
export default function Header() {
    return (
        <div className="main">
            <div className="component-container">
                <div className="logo">
                    <img src={logo} className="logo" />
                </div>
            </div>
        </div>
    );
}
