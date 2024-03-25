const selectors = {
  ingredient: ".constructor-ingredient",
  ingredientDetails: ".ingredient-details",
  constructor: ".constructor-ingredient-list",
  orderButton: ".order-button",
  orderDetails: ".order-details",
  modalCloseIcon: ".modal-close-icon",
  loginForm: ".login-form",
};

describe("app", () => {
  it("should be available on localhost:3000", () => {
    cy.visit("/");
  });
});

describe("burger-constructor", () => {
  it("should open ingredient details modal when click on ingredient", () => {
    cy.visit("/");
    cy.get(selectors.ingredient).first().click();
    cy.get(selectors.ingredientDetails).first().as("details");
    cy.get("@details").should("exist");
  });

  it("should drag ingredients to constructor", () => {
    cy.visit("/");
    cy.get(selectors.ingredient).first().as("ingredient");
    cy.get(selectors.constructor).first().as("constructor");
    cy.get("@ingredient").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get(selectors.orderButton).should("exist");
    cy.get(selectors.ingredient).last().as("ingredient");
    cy.get("@ingredient").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@constructor").should("contain", "Краторная булка");
    cy.get("@constructor").should("contain", "Сыр с астероидной плесенью");
  });

  it("should open order details modal when click on order button", () => {
    cy.visit("/");
    cy.get(selectors.ingredient).first().as("ingredient");
    cy.get(selectors.constructor).first().as("constructor");
    cy.get("@ingredient").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@constructor").should("exist");
    cy.get(selectors.orderButton).should("exist");
    cy.get(selectors.orderButton).click();
    cy.get(selectors.loginForm).should("exist");
    cy.get("[name=email]").type("naduff33@gmail.com");
    cy.get("[name=password]").type("123456");
    cy.get(selectors.loginForm).submit();
    cy.get(selectors.orderButton).should("exist");
    cy.get(selectors.orderButton).click();
    cy.get(selectors.orderDetails, { timeout: 30000 }).should("exist");
    cy.get(selectors.orderDetails).should("contain", "идентификатор заказа");
    cy.get(selectors.modalCloseIcon).click();
    cy.get(selectors.orderDetails).should("not.exist");
  });
});

describe("ingredient-modal", () => {
  it("should contain ingredient details", () => {
    cy.visit("/");
    cy.get(selectors.ingredient).first().click();
    cy.get(selectors.ingredientDetails).first().as("details");
    cy.get("@details").should("exist");
    cy.get("@details").should("contain", "Краторная булка");
    cy.get("@details").should("contain", "Калории,ккал");
    cy.get("@details").should("contain", "Углеводы");
  });

  it("should close when click on cross", () => {
    cy.visit("/");
    cy.get(selectors.ingredient).first().click();
    cy.get(selectors.ingredientDetails).first().as("details");
    cy.get("@details").should("exist");
    cy.get("@details").should("contain", "Краторная булка");
    cy.get("@details").should("contain", "Калории,ккал");
    cy.get("@details").should("contain", "Углеводы");
    cy.get(selectors.modalCloseIcon).click();
    cy.get(selectors.ingredientDetails).should("not.exist");
  });
});
