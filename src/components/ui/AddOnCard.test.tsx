import { fireEvent, render, screen } from "@testing-library/react";
import AddOnCard from "./AddOnCard";
import type { AddOn } from "@/types/add-on";

const mockAddOn: AddOn = {
  id: "online-service",
  name: "Online service",
  description: "Access to multiplayer games",
  monthlyPrice: 1,
  yearlyPrice: 10,
};

describe("AddOnCard", () => {
  it("renders the add-on details", () => {
    render(
      <AddOnCard
        addOn={mockAddOn}
        interval="monthly"
        selected={false}
        onToggle={jest.fn()}
      />,
    );

    expect(screen.getByText("Online service")).toBeInTheDocument();
    expect(screen.getByText("Access to multiplayer games")).toBeInTheDocument();
  });

  it("displays the monthly price", () => {
    render(
      <AddOnCard
        addOn={mockAddOn}
        interval="monthly"
        selected={false}
        onToggle={jest.fn()}
      />,
    );

    expect(screen.getByText("+$1/mo")).toBeInTheDocument();
  });

  it("displays the yearly price", () => {
    render(
      <AddOnCard
        addOn={mockAddOn}
        interval="yearly"
        selected={false}
        onToggle={jest.fn()}
      />,
    );

    expect(screen.getByText("+$10/yr")).toBeInTheDocument();
  });

  it("reflects the selected state", () => {
    render(
      <AddOnCard
        addOn={mockAddOn}
        interval="monthly"
        selected={true}
        onToggle={jest.fn()}
      />,
    );

    expect(
      screen.getByRole("checkbox", { name: "Online service" }),
    ).toBeChecked();
  });

  it("calls onToggle with true when checked", () => {
    const onToggle = jest.fn();

    render(
      <AddOnCard
        addOn={mockAddOn}
        interval="monthly"
        selected={false}
        onToggle={onToggle}
      />,
    );

    fireEvent.click(screen.getByRole("checkbox", { name: "Online service" }));

    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it("calls onToggle with false when unchecked", () => {
    const onToggle = jest.fn();

    render(
      <AddOnCard
        addOn={mockAddOn}
        interval="monthly"
        selected={true}
        onToggle={onToggle}
      />,
    );

    fireEvent.click(screen.getByRole("checkbox", { name: "Online service" }));

    expect(onToggle).toHaveBeenCalledWith(false);
  });
});
