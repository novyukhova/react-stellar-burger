describe("app", () => {
  it("should be available on localhost:3000", () => {
    cy.visit("http://localhost:3000");
  });
});

describe("burger-constructor", () => {
  it("should open ingredient details modal when click on ingredient", () => {
    cy.visit("http://localhost:3000");
    cy.get(".constructor-ingredient").first().click();
    cy.get(".ingredient-details").first().as("details");
    cy.get("@details").should("exist");
  });

  it("should drag ingredients to constructor", () => {
    cy.visit("http://localhost:3000");
    cy.get(".constructor-ingredient").first().as("ingredient");
    cy.get(".constructor-ingredient-list").first().as("constructor");
    cy.get("@ingredient").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get(".order-button").should("exist");
    cy.get(".constructor-ingredient").last().as("ingredient");
    cy.get("@ingredient").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@constructor").should("contain", "Краторная булка");
    cy.get("@constructor").should("contain", "Сыр с астероидной плесенью");
  });

  it("should open order details modal when click on order button", () => {
    cy.visit("http://localhost:3000");
    cy.get(".constructor-ingredient").first().as("ingredient");
    cy.get(".constructor-ingredient-list").first().as("constructor");
    cy.get("@ingredient").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@constructor").should("exist");
    cy.get(".order-button").should("exist");
    cy.get(".order-button").click();
    cy.get(".login-form").should("exist");
    cy.get("[name=email]").type("naduff33@gmail.com");
    cy.get("[name=password]").type("123456");
    cy.get(".login-form").submit();
    cy.get(".order-button").should("exist");
    cy.get(".order-button").click();
    cy.get(".order-details", { timeout: 30000 }).should("exist");
    cy.get(".order-details").should("contain", "идентификатор заказа");
    cy.get(".modal-close-icon").click();
    cy.get(".order-details").should("not.exist");
  });
});

describe("ingredient-modal", () => {
  it("should contain ingredient details", () => {
    cy.visit("http://localhost:3000");
    cy.get(".constructor-ingredient").first().click();
    cy.get(".ingredient-details").first().as("details");
    cy.get("@details").should("exist");
    cy.get("@details").should("contain", "Краторная булка");
    cy.get("@details").should("contain", "Калории,ккал");
    cy.get("@details").should("contain", "Углеводы");
  });

  it("should close when click on cross", () => {
    cy.visit("http://localhost:3000");
    cy.get(".constructor-ingredient").first().click();
    cy.get(".ingredient-details").first().as("details");
    cy.get("@details").should("exist");
    cy.get("@details").should("contain", "Краторная булка");
    cy.get("@details").should("contain", "Калории,ккал");
    cy.get("@details").should("contain", "Углеводы");
    cy.get(".modal-close-icon").click();
    cy.get(".ingredient-details").should("not.exist");
  });
});
