describe('Swiper Gallery Test', function () {
  it('Checks if second slide contains "United Kingdom"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.get('.swiper-slide-active').should('contain', 'United Kingdom');
  });
});

describe('Swiper Gallery Test', function () {
  it('Checks if third slide contains "Paris"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-button-next').click({ force: true });
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'Paris');
  });
});

describe('Swiper Gallery Tests', function () {
  it('Ensures the user can navigate slides using navigation buttons', function () {
    cy.visit('http://localhost:3000');

    cy.get('.swiper-slide-active').then(($firstSlide) => {
      cy.get('.swiper-button-next').click();
      cy.wait(500);
      cy.get('.swiper-slide-active').should('not.equal', $firstSlide);
    });

    cy.get('.swiper-slide-active').then(($secondSlide) => {
      cy.get('.swiper-button-prev').click();
      cy.wait(500);
      cy.get('.swiper-slide-active').should('not.equal', $secondSlide);
    });
  });

  it('Verifies that each slide description is displayed correctly', function () {
    cy.visit('http://localhost:3000');

    const slides = [
      { title: 'Rome', description: 'Italy' },
      { title: 'London', description: 'United Kingdom' },
      { title: 'Paris', description: 'France' }
    ];

    slides.forEach((slide, index) => {
      if (index > 0) {
        cy.get('.swiper-button-next').click();
        cy.wait(500);
      }
      cy.get('.swiper-slide-active').within(() => {
        cy.contains('h1', slide.title).should('be.visible');
        cy.contains('p', slide.description).should('be.visible');
      });
    });
  });

  it('Verifies that the gallery adapts to different screen sizes', function () {
    const viewports = [[1920, 1080], [1024, 768], [375, 812]];

    viewports.forEach((size) => {
      cy.viewport(size[0], size[1]);
      cy.visit('http://localhost:3000');
      cy.get('.swiper').should('be.visible');
      cy.get('.swiper-button-next').should('be.visible').click();
      cy.wait(500);
      cy.get('.swiper-button-prev').should('be.visible').click();
    });
  });

  it('Checks if the gallery is displayed correctly', function () {
    cy.visit('http://localhost:3000');

    cy.get('.swiper').should('be.visible');
    cy.get('.swiper-slide').should('have.length', 3);
    cy.get('.swiper-button-next').should('be.visible');
    cy.get('.swiper-button-prev').should('be.visible');
  });
});
