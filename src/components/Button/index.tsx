import React from "react";
import { Button } from "./style";

const Header = ({onClick, text}: any): React.ReactElement => {
  return (
    <Button onClick={onClick}>
      {text}
    </Button>
  );
};
export default Header;
