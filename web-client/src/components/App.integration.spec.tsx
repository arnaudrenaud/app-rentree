import { render, screen, waitFor, within } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import App, { GET_WILDERS } from "./App";
import { BrowserRouter } from "react-router-dom";
import { GetWilders } from "../schemaTypes";

const GET_WILDERS_MOCK: MockedResponse<GetWilders> = {
  request: { query: GET_WILDERS },
  result: {
    data: {
      wilders: [
        {
          id: "1",
          name: "Nouveau",
          city: "Paris",
          skills: [],
          __typename: "Wilder",
          missingSignatureCount: 0,
        },
        {
          id: "2",
          name: "Nouvelle",
          city: "Bordeaux",
          skills: [],
          __typename: "Wilder",
          missingSignatureCount: 2,
        },
      ],
    },
  },
};

const renderApp = () => {
  render(
    <MockedProvider mocks={[GET_WILDERS_MOCK]}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MockedProvider>
  );
};

describe("App", () => {
  it("renders title and subtitle", () => {
    renderApp();
    const title = screen.getByRole("heading", { level: 1 });
    expect(title.textContent).toEqual("Wilders Book");
    const subTitle = screen.getByRole("heading", { level: 2 });
    expect(subTitle.textContent).toEqual("Wilders");
  });

  describe("initially", () => {
    it("renders a loading indicator", () => {
      renderApp();

      const loader = screen.getByRole("progressbar");
      expect(loader).toBeInTheDocument();
    });
  });

  describe("after wilders have been fetched", () => {
    it("renders wilder list", async () => {
      renderApp();

      const wilderList = await waitFor(() => screen.getByTestId("wilderList"));
      const wilders = within(wilderList).getAllByRole("article");
      const firstWilderName = within(wilders[0]).getByRole("heading", {
        level: 3,
      });
      const firstWilderCity = within(wilders[0]).getByText("Paris");

      expect(wilderList).toBeInTheDocument();
      expect(wilders).toHaveLength(2);
      expect(firstWilderName.textContent).toEqual("Nouveau");
      expect(firstWilderCity).toBeInTheDocument();
    });
  });
});
