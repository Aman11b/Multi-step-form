import { fireEvent, render, screen } from "@testing-library/react";
import AddOns from "./AddOns";

describe("AddOns", () => {
  const defaultProps = {
    selectedAddOns: [],
    interval: "monthly" as const,
    onAddOnToggle: jest.fn(),
    onSubmit: jest.fn(),
    onBack: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all three add-ons", () => {
    render(<AddOns {...defaultProps} />);

    expect(
      screen.getByRole("checkbox", { name: "Online service" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("checkbox", { name: "Larger storage" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("checkbox", { name: "Customizable profile" }),
    ).toBeInTheDocument();
  });

  it("displays monthly prices", () => {
    render(<AddOns {...defaultProps} />);

    expect(screen.getByText("+$1/mo")).toBeInTheDocument();
    expect(screen.getAllByText("+$2/mo")).toHaveLength(2);
  });

  it("displays yearly prices", () => {
    render(<AddOns {...defaultProps} interval="yearly" />);

    expect(screen.getByText("+$10/yr")).toBeInTheDocument();
    expect(screen.getAllByText("+$20/yr")).toHaveLength(2);
  });

  it("reflects previously selected add-ons", () => {
    render(
      <AddOns
        {...defaultProps}
        selectedAddOns={["online-service", "larger-storage"]}
      />,
    );

    expect(
      screen.getByRole("checkbox", { name: "Online service" }),
    ).toBeChecked();

    expect(
      screen.getByRole("checkbox", { name: "Larger storage" }),
    ).toBeChecked();

    expect(
      screen.getByRole("checkbox", { name: "Customizable profile" }),
    ).not.toBeChecked();
  });

  it("calls onAddOnToggle with the add-on ID and checked state", () => {
    render(<AddOns {...defaultProps} />);

    fireEvent.click(screen.getByRole("checkbox", { name: "Online service" }));

    expect(defaultProps.onAddOnToggle).toHaveBeenCalledWith(
      "online-service",
      true,
    );
  });
});
