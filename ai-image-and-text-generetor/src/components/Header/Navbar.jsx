

import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/image-generator">Image Generator</Link>
        </li>
        <li>
          <Link to="/text-generator">Text Generator</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

