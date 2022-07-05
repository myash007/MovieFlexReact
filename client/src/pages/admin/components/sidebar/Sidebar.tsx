import "./sidebar.css";
import {
  PermIdentity,
  Movie
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/admin/movies" className="link">
              <li className="sidebarListItem">
                <Movie className="sidebarIcon" />
                Movies
              </li>
            </Link>
            <Link to="/admin/tickets" className="link">
              <li className="sidebarListItem">
                <Movie className="sidebarIcon" />
                Tickets
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
