/// <reference types="cypress" />

describe('home page with real data', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('should show home page', () => {
        cy.contains(/recettes/i)
        cy.contains('h1', /recettes/i)
        cy.get('.container').find('h1').should('be.a', 'object').and('have.css', 'margin', '32px 0px')
    });

    it('should pass', () => {
        const input = cy.get('input')
        input.type('fromage', { delay: 1000 })
        input.wait(1000)
        input.clear()
    })
});

const BASE_RECIPES_URL = 'https://restapi.fr/api/recipes';

describe('home page with fake data', () => {
    beforeEach(() => {
        cy.intercept('GET', `${BASE_RECIPES_URL}?skip=0&limit=18&sort=createdAt%3A-1`, { fixture: 'recipes.json' }).as('fetchRecipes')
        cy.fixture('recipes.json').as('recipes')
        cy.visit('/');
    })

    it('should show home page', () => {
        cy.wait('@fetchRecipes').its('response.statusCode').should('eq', 200)
        cy.get('@recipes').then((recipes) => {
            cy.get('h3').first().should('have.text', recipes[0].title)
        })
    });
});