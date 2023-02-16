import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";

const SBottomBox = styled(BaseBox)`
  padding: 25px 0px;
  text-align: center;

  a {
    font-weight: 600;
    color: #2e9ef7;
  }
`;

function BottomBox({cta, link, linkText}) {
    return (
        <SBottomBox>
          <span>
            {cta}<Link to={link}>{linkText}</Link>
          </span>
        </SBottomBox>
    )
}

export default BottomBox;