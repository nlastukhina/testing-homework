describe('Cards', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('Создание и удаление карточки', () => {
    // Create card
    cy.get('[data-cy="btn-add-card"]').click();
    cy.get('#color > :nth-child(1)').click();
    cy.get('#number').type('1234567890123456');
    cy.get('#balance').type('123456789');
    cy.get('.ant-modal-footer > .ant-btn-primary').click();

    // Check that card exist
    cy.contains('123 456 789').should('exist');

    // Remove card
    cy.get(':nth-child(1) > .CardItem__header > [data-cy="btn-actions-card"]').click();
    cy.get('[data-cy="btn-remove-card"]').click();
    cy.get('.ant-modal-confirm-btns > .ant-btn-primary').click();

    // Check that card removed
    cy.contains('123 456 789').should('not.exist');
  });
});
