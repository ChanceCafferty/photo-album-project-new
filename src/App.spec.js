import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import App from "./App";

// Mocking the Image class because Jest does not natively support it.
global.Image = class {
  onload() {}
  onerror() {}
  decode() {}
};

describe("App", () => {
  test("renders without errors", () => {
    render(<App />);
    const albumIdElement = screen.getByText("Current Album ID: 1");
    expect(albumIdElement).toBeInTheDocument();
  });

  test("initial state", () => {
    render(<App />);
    const albumIdElement = screen.getByText("Current Album ID: 1");
    expect(albumIdElement).toBeInTheDocument();
  });

  test('clicking "Next Album" button', async () => {
    render(<App />);
    const nextButton = screen.getByText("Next Album");
    fireEvent.click(nextButton);
    const albumIdElement = await screen.findByText("Current Album ID: 2");
    expect(albumIdElement).toBeInTheDocument();
  });

  test("entering invalid album ID", async () => {
    render(<App />);
    const input = screen.getByLabelText("Album ID:");
    const button = screen.getByText("Enter");
    fireEvent.change(input, { target: { value: "101" } });
    fireEvent.click(button);
    const errorMessage = await screen.findByText(
      "Please enter a value between 1-100"
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
