import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../src/components/footer/footer";
import Header from "@/components/header/header";
import Nav from "@/components/nav/nav";

describe("Footer", () => {
  test("renders footer content", () => {
    render(<Footer />);

    const content = screen.getByText("La mejor aplicación !");

    expect(content).toBeInTheDocument();
  });
});

describe("Header", () => {
  test("renders header width pageTitle", () => {
    render(<Header pageTitle="Toto" />);

    const content = screen.getByText("Toto");

    expect(content).toBeInTheDocument();
  });
});

describe("Nav", () => {
  test("renders nav when isAdmin have good item", () => {
    render(<Nav isAdmin />);

    const content = screen.getByText("Create event");

    expect(content).toBeInTheDocument();
  });

  test("renders header when isAdmin is false have not good item", () => {
    render(<Nav isAdmin={false} />);

    const content = screen.queryByText("Create event");

    expect(content).not.toBeInTheDocument();
  });
});
