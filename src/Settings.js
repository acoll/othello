import React from "react";
import styled from "styled-components";

const SettingsWrapper = styled.div`
  margin-top: 2vh;
  color: snow;
`;

export default ({ showHints, toggleShowHints }) => (
  <SettingsWrapper>
    <h4>Settings</h4>
    <label htmlFor="show-hints">Show Hints</label>
    <input
      type="checkbox"
      name="show-hints"
      value={showHints}
      onClick={toggleShowHints}
    />
  </SettingsWrapper>
);
