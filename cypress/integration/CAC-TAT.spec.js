// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress"/>

describe('Central de Atendimento ao Cliente', function(){
    beforeEach(function(){
        cy.visit('./src/index.html');
    });

    it('verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste, teste, teste, Teste, teste, teste,Teste, teste, teste, Teste, teste, teste,Teste, teste, teste, Teste, teste, teste,Teste, teste, teste, Teste, teste, teste,Teste, teste, teste, Teste, teste, teste,Teste, teste, teste, Teste, teste, teste,Teste, teste, teste, Teste, teste, teste,Teste, teste, teste, Teste, teste, teste,'

        cy.get('#firstName').type('Maikol')
        cy.get('#lastName').type('Amaro')
        cy.get('#email').type('maikoldepaula@example.com')
        cy.get('#phone').type('16984248654')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
    
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Maikol')
        cy.get('#lastName').type('Amaro')
        cy.get('#email').type('maikoldepaula@example,com')
        cy.get('#phone').type('16984248654')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não númerico', function(){
        cy.get('#phone')
        .type('abcefghij')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Maikol')
        cy.get('#lastName').type('Amaro')
        cy.get('#email').type('maikoldepaula@example.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    });

    it('Preenche e limpa os campos', function(){
        cy.get('#firstName')
            .type('Maikol')
            .should('have.value', 'Maikol')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Amaro')
            .should('have.value', 'Amaro')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('maikoldepaula@example.com')
            .should('have.value', 'maikoldepaula@example.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('123456789')
            .should('have.value', '123456789')
            .clear()
            .should('have.value', '')
    })

    it('exibe uma mensagem de erro ao submeter o formulário sem prrencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando comando personalizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu indice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(($radio)=>{
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })

    })

    it('seleciona um arquivo da pasta fixtures', ()=>{
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile("cypress/fixtures/example.json")
            .should(($input)=>{
                expect($input[0].files[0].name).to.equal('example.json')
            })
        }
    )

    it('seleciona um arquivo simulnado um drag-and-drop', ()=>{
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile("cypress/fixtures/example.json", {action: 'drag-drop'})
            .should(($input)=>{
                expect($input[0].files[0].name).to.equal('example.json')
            })
        }
    )

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
         .selectFile('@sampleFile')
         .should(($input)=>{
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it.only('Verifica que a politica de privaciade abra em outra aba sem a necessidade de um clique', ()=>{
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página de política de privacidade removendo o target e entao clicando no link', ()=>{
        cy.get('#privacy a')
         .invoke('removeAttr', 'target')
         .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

})