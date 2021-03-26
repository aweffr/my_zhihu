import React, {useEffect, useState} from 'react';
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from "reactstrap";
import axios from "axios";

const MyNavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/api/users/current_user/")
      .then(resp => {
        setUser(resp.data);
      })
  }, [])

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color="light" expand="md">
        <div className="container">
          <NavbarBrand href="/">知乎 Pro Plus Max</NavbarBrand>
          <NavbarToggler onClick={toggle}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/questions/">问题列表</NavLink>
              </NavItem>
            </Nav>
            {
              user && user.username && (
                <Nav>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      {user.username}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={() => {
                        sessionStorage.removeItem("userToken");
                        window.location.href = "/login/";
                      }}>
                        切换账号
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              )
            }
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
}


export default MyNavBar;
