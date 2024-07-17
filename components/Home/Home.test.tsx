import React from "react";
import { fireEvent, render, screen, userEvent, waitFor } from "@testing-library/react-native";
import Home from "../Home/Home";
import nock from "nock";
import { defaultSearch, emptySearch, fullSearch, oneResultSearch } from "./Home.mock";

describe("> Home", () => {
  beforeAll(() => {
    nock("https://v2.jokeapi.dev")
      .get("/joke/Programming?contains=&amount=10")
      .reply(200, defaultSearch)
      .persist()
      .get("/joke/Programming?contains=how&amount=10")
      .reply(200, fullSearch)
      .get("/joke/Programming?contains=xyz&amount=10")
      .reply(200, emptySearch)
      .get("/joke/Programming?contains=cat&amount=10")
      .reply(200, oneResultSearch);
  });

  test("renders correctly", () => {
    const tree = render(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("shows all results when filter is empty", async () => {
    render(<Home />);
    const searchInput = await screen.findByTestId("searchInput");
    const user = userEvent.setup();
    await user.type(searchInput, "");
    const results = await screen.findAllByTestId("jokePreview");
    expect(results).toHaveLength(10);
  });

  test("filters correctly search term 'xyz'", async () => {
    render(<Home />);
    await waitFor(() => expect(screen.getAllByTestId("jokePreview")).toHaveLength(10));
    const searchInput = await screen.findByTestId("searchInput");
    fireEvent.changeText(searchInput, "xyz");
    await waitFor(
      () => {
        expect(screen.queryAllByTestId("jokePreview")).toHaveLength(0);
      },
      { timeout: 20000 }
    );
  }, 20000);

  test("filters correctly search term 'how'", async () => {
    render(<Home />);
    const searchInput = await screen.findByTestId("searchInput");
    let results = await screen.findAllByTestId("jokePreview");
    expect(results).toHaveLength(10);

    fireEvent.changeText(searchInput, "how");

    results = await screen.findAllByTestId("jokePreview");
    expect(results).toHaveLength(10);
  });

  test("filters correctly search term 'cat'", async () => {
    render(<Home />);
    let results = await screen.findAllByTestId("jokePreview");
    expect(results).toHaveLength(10);
    const searchInput = await screen.findByTestId("searchInput");
    fireEvent.changeText(searchInput, "cat");
    await waitFor(
      () => {
        expect(screen.getAllByTestId("jokePreview")).toHaveLength(1);
      },
      { timeout: 20000 }
    );
  }, 20000);
});
