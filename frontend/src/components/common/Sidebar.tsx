import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="bg-light vh-100 border-end">
      <div className="p-3">
        <h5 className="text-primary fw-bold">Menu</h5>

        <div className="list-group list-group-flush">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `list-group-item list-group-item-action ${
                isActive ? "active" : ""
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/books"
            className={({ isActive }) =>
              `list-group-item list-group-item-action ${
                isActive ? "active" : ""
              }`
            }
          >
            Books
          </NavLink>

          <NavLink
            to="/members"
            className={({ isActive }) =>
              `list-group-item list-group-item-action ${
                isActive ? "active" : ""
              }`
            }
          >
            Members
          </NavLink>

          <NavLink
            to="/borrow"
            className={({ isActive }) =>
              `list-group-item list-group-item-action ${
                isActive ? "active" : ""
              }`
            }
          >
            Borrow
          </NavLink>

          <NavLink
            to="/return"
            className={({ isActive }) =>
              `list-group-item list-group-item-action ${
                isActive ? "active" : ""
              }`
            }
          >
            Return
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
