import { render, waitFor, fireEvent } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { setupServer } from "msw/node";
import { rest } from "msw";

import reducers from "./redux/reducers";
import App from "./App";

describe("<App />", () => {
  const resList = [
    {
      position: [500, 65],
    },
    {
      name: "Dragontail",
      type: "village",
      population: 565,
      wealth: 11360,
      authority: "constable",
      numGuards: 5,
      position: [83, 65],
    },
  ];

  const initStore = () => createStore(reducers, applyMiddleware(thunk));

  const handlers = [
    rest.get("/api/map-data.json", (req, res, ctx) => {
      const { username } = req.body;

      return res(ctx.json(resList));
    }),
  ];

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders loading screen", async () => {
    const { queryByTestId } = render(
      <Provider store={initStore()}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(queryByTestId("screen-loading")).toBeTruthy();
    });
  });

  it("renders failed screen", async () => {
    server.use(
      rest.get("/api/map-data.json", (res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { queryByTestId } = render(
      <Provider store={initStore()}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(queryByTestId("screen-failed")).toBeTruthy();
    });
  });

  it("clicks pin to open detail info and then click map to close it", async () => {
    const { queryByTestId, getAllByTestId, queryByText, getByTestId } = render(
      <Provider store={initStore()}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(queryByTestId("map")).toBeTruthy();
    });

    fireEvent.click(getAllByTestId("pin")[0]);

    fireEvent.click(getByTestId("map"));

    await waitFor(() => {
      expect(queryByTestId("modal")).toBeFalsy();
    });
  });

  it("clicks pin to show empty detail info", async () => {
    const { queryByTestId, getAllByTestId, queryByText } = render(
      <Provider store={initStore()}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(queryByTestId("map")).toBeTruthy();
    });

    fireEvent.click(getAllByTestId("pin")[0]);

    await waitFor(() => {
      expect(queryByText("Name: Not provided")).toBeTruthy();
    });
  });

  it("clicks pin to show detail info", async () => {
    const { queryByTestId, getAllByTestId, queryByText } = render(
      <Provider store={initStore()}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(queryByTestId("map")).toBeTruthy();
    });

    fireEvent.click(getAllByTestId("pin")[1]);

    await waitFor(() => {
      expect(queryByText(`Name: ${resList[1].name}`)).toBeTruthy();
    });
  });
});
