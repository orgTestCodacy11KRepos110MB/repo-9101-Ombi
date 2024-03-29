import {
  requestPage as Page,
  tvDetailsPage as TvPage,
} from "@/integration/page-objects";

describe("Requests Tests", () => {
  it("Clicking Details on a Tv request, takes us to the correct detail page", () => {
    cy.intercept("POST", "request/tv").as("tvRequest");
    cy.intercept("token").as("login");
    cy.login();

    const dbID = 60735; // The Flash
    cy.requestAllTv(dbID);

    Page.visit();

    Page.tvTab.click();
    cy.waitUntil(() => {
      const row = Page.tv.getGridRow(dbID);
      return row.detailsButton.should("be.visible");
    });
    const row = Page.tv.getGridRow(dbID);
    row.detailsButton.click();

    cy.location("pathname").should("contains", "/details/tv/" + dbID);
    TvPage.title.contains("The Flash");
  });

  it("Deleting TV requests, removes from grid", () => {
    cy.intercept("POST", "request/tv").as("tvRequest");
    cy.intercept("token").as("login");
    cy.intercept('DELETE','api/v1/Request/tv/child/60735').as('deleteRequest');
    cy.login();

    // cy.wait('@login');
    cy.requestAllTv(60735); // The Flash

    Page.visit();


    Page.tvTab.click();
    const row = Page.tv.getGridRow(60735);
    row.optionsButton.click();
    row.optionsDelete.click();

    cy.wait('@deleteRequest').then((intercept) => {
      expect(intercept.response.body.result).is.true;
    })

    row.title.should('not.exist');
  });
});
