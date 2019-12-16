import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import UserComponent from "../app/widget/widgets/user/user.component";

storiesOf("User Component", module)
  // .addDecorator(withKnobs)
  .add("data", () => (
    <UserComponent
      Url={"https://azeuw-apimhivet01.azure-api.net/api/hiveadmin/v1/ "}
    />
  ));


