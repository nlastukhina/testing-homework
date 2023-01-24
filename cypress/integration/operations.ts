describe('Operations', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('Создание и удаление операции', () => {
    // Create operation
    cy.get('.HistoryHeader > .ant-btn').click();
    cy.get('#name').type('Тестовое название платежа');
    cy.get('.ant-select-selector').click();
    cy.get('.ant-select-selection-item').click();
    cy.get('.ant-select-item-option-active').click({ force: true });
    cy.get('#value').type('10000');
    cy.get('.ant-modal-footer > .ant-btn-primary').click();

    // Check that operation exist
    cy.contains('Тестовое название платежа').should('exist');

    // Remove operation
    cy.get(':nth-child(1) > .HistoryListItem__extra > .ant-btn').click();
    cy.get('[data-cy="btn-remove-operation"]').click();
    cy.get('.ant-modal-confirm-btns > .ant-btn-primary').click();

    // Check that operation removed
    cy.contains('Тестовое название платежа').should('not.exist');
  });
});
