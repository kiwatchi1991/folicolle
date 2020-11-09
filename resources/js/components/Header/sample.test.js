import React from "react";
import { render, screen } from "@testing-library/react";
import Render from "./Render";

describe("Rendering", () => {
    it("should render all the elements correctly", () => {
        render(<Render />);
        screen.debug();
        // expect(screen.getByText("Udemy")).toBeTruthy();
        // screen.debug((screen.getByText("Udemy")))
    });
    it("My Test Case", () => {
        expect(true).toEqual(true);
    });
});

// describe("My Test Suite", () => {
//     it("My Test Case", () => {
//         expect(true).toEqual(true);
//     });
// });
