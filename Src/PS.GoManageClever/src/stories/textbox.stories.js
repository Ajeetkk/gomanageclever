import React from "react";
import { storiesOf } from "@storybook/react";
import TextBox from "../app/widget/widgets/widget-controls/textBox";

storiesOf("Toolbox", module)
  .add("default checkbox", () => (
    <TextBox textBoxClass="primary-textbox" placeHolder="Engine Portal" />
  ))
  .add("checkbox with classname", () => (
    <TextBox textBoxClass="primary-textbox" />
  ))
  .add("checkbox with placeholder", () => (
    <TextBox placeHolder="Engine Portal" />
  ));
