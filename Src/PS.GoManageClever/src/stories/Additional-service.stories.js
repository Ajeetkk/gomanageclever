import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";


import AdditionalServicePartner from "../app/widget/widgets/service-partner/additional-servicepartner/additional-servicepartner.component";
import ServicePartnerService from "../app/widget/widgets/service/servicepartnerservice";
import AdditionalServicePartnerView from "../app/widget/widgets/service-partner/additional-servicepartner/additional-servicepartner.view";
import {
  Modal,
  Table,
  Button
} from "../app/widget/widgets/widget-controls/constants";


storiesOf("Service Partner", module)
  .addDecorator(withKnobs)
  .add("AdditionalServicePartner", () => (
    <AdditionalServicePartner
      Url={"https://azeuw-apimhivet01.azure-api.net/fleet/api/v1/"}
    />
  ));
