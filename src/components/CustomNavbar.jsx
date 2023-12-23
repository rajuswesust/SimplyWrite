import React, { useContext, useEffect, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { NavLink as ReactLink } from "react-router-dom";
import { doLogout, getCurrentUserDetail, isLoggedIn } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

function CustomNavBar() {
  const userContextData = useContext(userContext);
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);

  let navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const loggedIn = isLoggedIn();
    setLogin(loggedIn);

    if (loggedIn) {
      const currentUser = getCurrentUserDetail();
      setUser(currentUser);

      console.log(currentUser);
      console.log('from local storage: ' + JSON.stringify(currentUser));
    }
  }, []);

  const logoutUser = () => {
    doLogout(()=> {
      setLogin(false);

      //reseting the global state
      userContextData.setUser({
        data: {},
        isLoggedIn: false
      })

      console.log("user logged out..." + login);
      // window.location.href = "/home";
      // navigate("/home");
      console.log("Navigate to /home");
    })
  }

  return (
    <div>
      <Navbar color="info" light expand="md" fixed="" className="px-4">
        <NavbarBrand tag={ReactLink} to="/">
          SimplyWrite
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/home">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">
                About
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Contact us</DropdownItem>
                <DropdownItem>Facebook</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Linkedin</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} onClick={logoutUser} to="/home">
                    Logout
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/create-post">
                    Create post
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={ReactLink} to="/user/posts">
                    Your posts
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={ReactLink} to={`/user/profile/${user.id}`}>
                    {user.username}
                  </NavLink>
                </NavItem>
              </>
            )}
            {!login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    SignUp
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavBar;
