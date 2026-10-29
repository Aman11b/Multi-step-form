import { fireEvent, render, screen } from "@testing-library/react";
import PersonalInfo from "./PersonalInfo";

describe("PersonalInfo", () => {
  it("render all fields and the next steo button", () => {
    render(<PersonalInfo />);

    expect(
      screen.getByRole("heading", {
        name: /personal info/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /next step/i }),
    ).toBeInTheDocument();
  });

  it("displays validation errors when submitted empty", () => {
    render(<PersonalInfo />);

    fireEvent.click(screen.getByRole("button", { name: /next step/i }));

    expect(screen.getAllByText("This field is required")).toHaveLength(3);
  });

  it("clears only the edited field's error", () => {
    render(<PersonalInfo />);

    fireEvent.click(screen.getByRole("button", { name: /next step/i }));

    expect(screen.getAllByText("This field is required")).toHaveLength(3);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Aman Singh" },
    });

    expect(screen.queryByLabelText(/name/i)).toHaveAttribute(
      "aria-invalid",
      "false",
    );
    expect(screen.getAllByText("This field is required")).toHaveLength(2);
  });

  it("clears all validation errors when valid data is submitted", () => {
    render(<PersonalInfo />);

    fireEvent.click(screen.getByRole("button", { name: /next step/i }));

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Aman Singh" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "aman@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: "+91 9876543210" },
    });

    fireEvent.click(screen.getByRole("button", { name: /next step/i }));

    expect(
      screen.queryByText("This field is required"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Enter a valid email address"),
    ).not.toBeInTheDocument();
  });
});
