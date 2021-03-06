import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

const styles = { fontSize: "1.5rem" };
const Header = () => {
  return (
    <div>
      <Navbar color="light">
        <NavbarBrand style={styles}>
          <span>ATLAN COLLECT</span>
        </NavbarBrand>
      </Navbar>
    </div>
  );
};

export default Header;
