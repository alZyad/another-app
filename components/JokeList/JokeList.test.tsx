import React from "react";
import { render } from "@testing-library/react-native";
import JokeList from "./JokeList";

test("renders correctly", () => {
  const tree = render(<JokeList />).toJSON();
  expect(tree).toMatchSnapshot();
});
