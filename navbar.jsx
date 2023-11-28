import React, {Component} from "react";
import {Link} from "react-router-dom";
class Navbar extends Component {

  render() {
    let {maxResult=""} = this.props.setting;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand fw-bolder mx-3" to="/home">
        <i className="fa-solid fa-book-open fa-xl"></i>
        </Link>
        <div className="" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link fw-medium" to={`/books/v1/volumes?q=Harry Potter&startIndex=0&maxResults=${maxResult}`}>
                Harry Potter
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to={`/books/v1/volumes?q=Agatha Christie&startIndex=0&maxResults=${maxResult}`}>
                Agatha Christie
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to={`/books/v1/volumes?q=Premchand&startIndex=0&maxResults=${maxResult}`}>
                Premchand
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to={`/books/v1/volumes?q=Jane Austen&startIndex=0&maxResults=${maxResult}`}>
                Jane Austen
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/myshelf">My Books</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/settings">Settings</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Navbar;