import { NavLink } from "react-router-dom";
import { Page, pages } from "../../router"; 

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand">Delivery App</a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    {pages.filter(page => !page.isNotRenderedInNavbar).map((page: Page) => (
                        <li className="nav-item" key={page.name}>
                            <NavLink
                                to={page.path}
                                className={({ isActive }) =>
                                [isActive ? "active" : "text-secondary", "nav-link"].join(" ")
                                }
                            >
                                {page.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};
