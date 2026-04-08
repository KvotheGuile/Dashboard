import { NavLink } from "react-router-dom"

const Navbar = () =>
{
    return (
        <nav
            className="flex flex-wrap items-center gap-1 sm:gap-2"
            aria-label="Principal"
          >
            <NavLink to="/start" end>
              Inicio
            </NavLink>
            <NavLink to="/dashboard" end>
              Dashboard
            </NavLink>
            <NavLink to="/products">
              Productos
            </NavLink>
          </nav>
    )
}

export default Navbar;
