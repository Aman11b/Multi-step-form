import { test, expect } from "@playwright/test";

test.describe("Multi-step Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("allows a user to complete the subscription successfully", async ({
    page,
  }) => {
    // Step 1: Personal information
    await expect(
      page.getByRole("heading", { name: "Personal info" }),
    ).toBeVisible();

    await page.getByLabel("Name").fill("Aman Singh");
    await page.getByLabel("Email Address").fill("aman@example.com");
    await page.getByLabel("Phone Number").fill("+91 9876543210");

    await page.getByRole("button", { name: "Next Step" }).click();

    // Step 2: Select plan
    await expect(
      page.getByRole("heading", { name: "Select your plan" }),
    ).toBeVisible();

    await page.getByText("Arcade", { exact: true }).click();

    await page.getByRole("switch", { name: "Yearly billing" }).click();

    await expect(page.getByText("$90/yr")).toBeVisible();

    await page.getByRole("button", { name: "Next Step" }).click();

    // Step 3: Select add-ons
    await expect(
      page.getByRole("heading", { name: "Pick add-ons" }),
    ).toBeVisible();

    const onlineService = page.getByRole("checkbox", {
      name: "Online service",
    });

    const largerStorage = page.getByRole("checkbox", {
      name: "Larger storage",
    });

    await onlineService.check();
    await largerStorage.check();

    await expect(onlineService).toBeChecked();
    await expect(largerStorage).toBeChecked();

    await page.getByRole("button", { name: "Next Step" }).click();

    // Step 4: Summary
    await expect(
      page.getByRole("heading", { name: "Finishing up" }),
    ).toBeVisible();

    await expect(page.getByText("Online service")).toBeVisible();
    await expect(page.getByText("Larger storage")).toBeVisible();

    await expect(page.getByText("$90/yr")).toBeVisible();
    await expect(page.getByText("$10/yr")).toBeVisible();
    await expect(page.getByText("$20/yr")).toBeVisible();
    await expect(page.getByText("+$120/yr")).toBeVisible();

    // Verify changing the plan preserves billing and add-on selections.
    await page.getByRole("button", { name: "Change" }).click();

    await expect(
      page.getByRole("heading", { name: "Select your plan" }),
    ).toBeVisible();

    await expect(
      page.getByRole("switch", { name: "Yearly billing" }),
    ).toHaveAttribute("aria-checked", "true");

    await page.getByRole("button", { name: "Next Step" }).click();

    await expect(onlineService).toBeChecked();
    await expect(largerStorage).toBeChecked();

    await page.getByRole("button", { name: "Next Step" }).click();

    // Confirm subscription
    await page.getByRole("button", { name: "Confirm" }).click();

    // Completion
    await expect(
      page.getByRole("heading", { name: "Thank You!" }),
    ).toBeVisible();

    await expect(
      page.getByText(/thanks for confirming your subscription/i),
    ).toBeVisible();
  });

  test("displays validation errors when personal information is empty", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: "Personal info" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Next Step" }).click();

    // All three fields use the same required-field message.
    await expect(page.getByText("This field is required")).toHaveCount(3);

    // The user must remain on Step 1.
    await expect(
      page.getByRole("heading", { name: "Personal info" }),
    ).toBeVisible();
  });

  test("preserves user selections when navigating backwards", async ({
    page,
  }) => {
    // Step 1
    await page.getByLabel("Name").fill("Aman Singh");
    await page.getByLabel("Email Address").fill("aman@example.com");
    await page.getByLabel("Phone Number").fill("+91 9876543210");

    await page.getByRole("button", { name: "Next Step" }).click();

    // Step 2
    await page.getByText("Arcade", { exact: true }).click();

    await page.getByRole("button", { name: "Next Step" }).click();

    // Step 3
    const onlineService = page.getByRole("checkbox", {
      name: "Online service",
    });

    await onlineService.check();

    await page.getByRole("button", { name: "Next Step" }).click();

    // Go back to Step 3
    await page.getByRole("button", { name: "Go Back" }).click();

    await expect(onlineService).toBeChecked();

    // Go back to Step 2
    await page.getByRole("button", { name: "Go Back" }).click();

    await expect(page.getByText("Arcade", { exact: true })).toBeVisible();

    // Go back to Step 1
    await page.getByRole("button", { name: "Go Back" }).click();

    await expect(page.getByLabel("Name")).toHaveValue("Aman Singh");
    await expect(page.getByLabel("Email Address")).toHaveValue(
      "aman@example.com",
    );
    await expect(page.getByLabel("Phone Number")).toHaveValue("+91 9876543210");
  });
});
