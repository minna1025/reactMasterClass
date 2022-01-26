import { useState } from "react";
import styled from "styled-components";

const ToggleLabel = styled.label`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 130px;
  display: block;
`;

const Toggle = styled.div<{ isChecked: boolean }>`
  height: 65px;
  width: 130px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 40px;
  border: 2px solid white;
  padding: 12px;
  position: relative;
  margin: auto;
  cursor: pointer;

  &:before {
    position: absolute;
    z-index: 2;
    content: "";
    display: block;
    top: 15%;
    transition: translateY(-50%);
    width: 41px;
    height: 41px;
    border-radius: 30px;
    background-color: ${(props) => props.theme.oppositeBg};
    transform: ${(props) =>
      props.isChecked ? "translateX(65px)" : "translateX(0)"};
    transition: transform 0.5s ease;
  }

  input {
    position: absolute;
    top: -50px;
    opacity: 0;
  }
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3px;
  span {
    font-size: 35px;
  }
`;

function ThemeToggle({ click, themeMode }: any) {
  const [isEnabled, setEnabled] = useState(false);

  const toggleState = (event: any) => {
    setEnabled(event.target.value);
    console.log("tada", event?.target.checked, themeMode);
  };

  return (
    <>
      <ToggleLabel htmlFor="toggle">
        <Toggle isChecked={themeMode === "light" ? false : true}>
          {/* <span>{isEnabled ? "Enabled" : "disabled"}</span> */}
          <Icons>
            <span>☀️</span>
            <span>🌑</span>
          </Icons>
          <input
            id="toggle"
            name="toggle"
            checked={isEnabled}
            onClick={toggleState}
            onChange={click}
            type="checkbox"
          />
        </Toggle>
      </ToggleLabel>
    </>
  );
}

export default ThemeToggle;
