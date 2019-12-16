import { configure } from "@storybook/react";
import { addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { addParameters } from "@storybook/react";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: ""
});

axiosInstance.interceptors.request.use(
  request => {
    request.headers.Authorization = localStorage.getItem("token");
    return request;
  },

  error => {
    return Promise.reject({ ...error });
  }
);

localStorage.setItem(
  "token",
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImY2MFJ6U3lQN21iRERIWlA4QVE2NzVxems4MENkM2hEa21OWHR3XzA0a2cifQ.eyJleHAiOjE1NzA2Mjg2MTgsIm5iZiI6MTU3MDYyNTAxOCwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9nb29yZy5iMmNsb2dpbi5jb20vNmQ5Y2FkMmYtN2UwYy00NWY2LThlNWQtNDI5NGE5ODZiZGIwL3YyLjAvIiwic3ViIjoiOGY3YWM0YjItM2UzNS00ZjBhLThiOTAtY2Q0MzMxNmNmY2JmIiwiYXVkIjoiZTZhMTA1NTUtOThhZC00ZDFjLThhYzEtYzJiZmI0OTczYWE5IiwiYWNyIjoiYjJjXzFhX3NpZ251cF9zaWduaW4iLCJub25jZSI6IjJjNmQ1NWRlLWZiN2UtNDUzOS04ZDNkLTlhYWYxODU5ZjYxMCIsImlhdCI6MTU3MDYyNTAxOCwiYXV0aF90aW1lIjoxNTcwNjI1MDE4LCJvaWQiOiI4ZjdhYzRiMi0zZTM1LTRmMGEtOGI5MC1jZDQzMzE2Y2ZjYmYiLCJuYW1lIjoiR2V2ZW5kcmEgU2FodSIsImVtYWlscyI6WyJnZXZlbmRyYUBieW9tLmRlIl0sImdpdmVuX25hbWUiOiJHZXZlbmRyYSIsImZhbWlseV9uYW1lIjoiU2FodSIsInJvbGVzIjpbIkhpdmVBZG1pbiJdLCJpc0FjdGl2ZSI6dHJ1ZSwiaXNBcHByb3ZlZCI6dHJ1ZSwicmVnaXN0cmF0aW9uRGF0ZVRpbWUiOiIxMC8zLzIwMTkgMTI6NDg6NDEgUE0ifQ.aO-FVnWyDfzr9MD-2lzy6SmdUIIMKsYbdC-bi2UFBlFVmeMzwveHNVBFkgt7yAqTKU4d51ueZ3EBQQENwvy7hC-EIJ3udyUzfpyT415mg2UYAsxQlYr_irxU6FE1iVUDhZNGtHuFa6z1wjMV9NWt68uF-CXT76ENNHtCnhL-OSMFi98t9-mIb28BFoDqNSNr3LpRrwJ9eG9I3OJlQPqEDcN9H-6J4AWmS-SFWJzJcb0vmIbpxkP8WeoGfHzf3AvQmIoGoZb9jeXOTzKyS4IAjazftO_GzV5EBKVCF8iDPutmcq5nse9jKpKliPx-mzcHVhVn2wAcWpn_hwsS9G4frw"
);

addParameters({
  docs: {
    container: DocsContainer,

    page: DocsPage
  }
});

addDecorator(withInfo);

// automatically import all files ending in *.stories.js
configure(require.context("../src/stories", true, /\.stories\.js$/), module);
