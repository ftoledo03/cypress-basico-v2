// CAC-TAT.spec.js created with Cypress

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    this.beforeEach(function () {
        cy.visit('./src/index.html') //ação
    })
    it('verifica o título da aplicação', function () {
        cy.visit('./src/index.html') //ação
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') //verificação

    })
    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Teste versão/, Teste versão/, Teste versão/, Teste versão/, Teste versão/, Teste versão/, Teste versão/, Teste versão/, Teste versão/, Teste versão/, Teste versão/, Teste versão/, Teste versão/, Teste versão/, Teste versão/, Teste versão/, Teste versão/, Teste versão/ '
        cy.get('#firstName').type('Jorge Fernando')
        cy.get('#lastName').type('Toledo')
        cy.get('#email').type('jftoledoqa@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Jorge Fernando')
        cy.get('#lastName').type('Toledo')
        cy.get('#email').type('jftoledoqa.gmail.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('validar se um valor não-numérico for digitado, seu valor continuará vazio', function () {
        cy.get('#phone')
            .type('abcde')
            .should('have.value', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Jorge Fernando')
        cy.get('#lastName').type('Toledo')
        cy.get('#email').type('jftoledoqa@gmail,com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')



    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Jorge Fernando')
            .should('have.value', 'Jorge Fernando')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Toledo')
            .should('have.value', 'Toledo')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('jftoledoqa@gmail.com')
            .should('have.value', 'jftoledoqa@gmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('123456')
            .should('have.value', '123456')
            .clear()
            .should('have.value', '')

    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')

    })

    it('seleciona um produto (Mentoria) por seu valor', function () {
        cy.get('#product')
            .select('Mentoria')
            .should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })
    it('marca cada tipo de atendimento', function () {
        cy.get('input[type ="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')

    })
    it('marca cada tipo de atendimento', function () {
        cy.get('input[type ="radio"]')           //Aqui está pegando apenas 1 dos 3 radios disponíveis, porém há 3
            .should('have.length', 3)            //Deve ter o comprimento de 3, ou seja 3 radios
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')

            })

    })
    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]') //pegou todos os inputs que tem o type checkbox 
            .check()                         // marcou os dois, pois tem dois elementos nesse input
            .should('be.checked')            //verificou se os dois inputs foram marcados 
            .last()                          // foi no último 
            .uncheck()                       // e desmarcou
            .should('not.be.checked')        //verificou se o último não está marcado 

    })

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })
    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile') //Acessa direto o caminho sem precisar dar um selectFile colocando todo o caminho do diretório, como foi feito no exercício passado
        cy.get('input[type="file"]')
            .selectFile('@sampleFile') //Passa o alias que foi dado no comando acima cy.Fixture
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank') //clica no link e abre em uma nova aba, porém o cypress não atua em outra aba que não seja da aplicação que está sendo trabalhada

    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target') //removendo o atributo target ele abre o link na mesma aba, esse comando é feito pq o cypress não consegue trabalhar em outra aba que não seja a da aplicação que está sendo trabalhada
            .click()

        cy.contains('Talking About Testing').should('be.visible')

    })

// Foi gerado um novo script, está nos atalhos "NPM SCRIPTS" que gera o teste simulando o browser em um dispositivo mobile, as dimensões foram acrescentadas no package.json (lá estão os scripts)
// Lembrando cypress open abre o tst runner e cypress run roda em modo headless

it('', function () {


})

})







