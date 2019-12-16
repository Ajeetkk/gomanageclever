import React from "react";
import { storiesOf } from "@storybook/react";
import Checkbox from "../app/widget/widgets/widget-controls/checkBox/";

storiesOf("Toolbox", module).add("Checkbox - default", () => (
  <Checkbox checkBoxID="primary" labelName="Engine Portal" />
));