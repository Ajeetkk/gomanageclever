import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";


import AssignmentServicePartnerComponent from "../app/widget/widgets/service-partner/assignment-servicepartner/assignment-servicepartner.component";


storiesOf("Service Partner", module)
    .addDecorator(withKnobs)
    .add("Assignment Service Partner", () => (
        <AssignmentServicePartnerComponent
            Url={"https://azeuw-apimhived01.azure-api.net/api/v1/"}
        />
    ))
