import React from "react";
import { render, screen, userEvent } from "@testing-library/react-native";
import JokeList from "./JokeList";

describe("> JokeList", () => {
  test("renders correctly", () => {
    const tree = render(<JokeList />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("shows all results when filter is empty", async () => {
    render(<JokeList />);
    const searchInput = screen.getByTestId("searchInput");
    const user = userEvent.setup();
    await user.type(searchInput, "");
    const results = screen.getAllByTestId("jokePreview");
    expect(results).toHaveLength(20);
  });

  test("filters correctly search term 'xyz'", async () => {
    render(<JokeList />);
    const searchInput = screen.getByTestId("searchInput");
    const user = userEvent.setup();
    await user.type(searchInput, "xyz");
    const results = screen.queryAllByTestId("jokePreview");
    expect(results).toHaveLength(0);
  });

  test("filters correctly search term 'how'", async () => {
    render(<JokeList />);
    const searchInput = screen.getByTestId("searchInput");
    const user = userEvent.setup();
    await user.type(searchInput, "how");
    const results = screen.getAllByTestId("jokePreview");
    expect(results).toHaveLength(2);
  });
});
