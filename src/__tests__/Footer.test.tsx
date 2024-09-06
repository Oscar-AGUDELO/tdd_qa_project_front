import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../components/sections/footer/footer";

describe("Footer", () => {
  test("renders footer content", () => {
    render(<Footer />);

    const footerContent = screen.getByText("La mejor aplicación !");

    expect(footerContent).toBeInTheDocument();
  });
});
