---
layout: post
title: "Formulário para site estático (Parte 1) - Validação com RegExp"
date: 2017-11-09 16:20
image: '/assets/dist/images/posts/form-sem-backend/parte1.jpg'
description: "Aprenda a fazer uma validação de formulário dinâmica utilizando Expressões Regulares"
main-class: 'js'
head-class: post
color: '#f8c101'
tags:
- js
- regexp
- es6
- form-site-estatico

twitter_text: "Aprenda a fazer uma validação de formulário dinâmica utilizando Expressões Regulares"
introduction: "Aprenda a fazer uma validação de formulário dinâmica utilizando Expressões Regulares."
---

## Introdução

Fala galera, beleza?

Esse é o meu primeiro post técnico, e nele vamos criar um formulário, sem a necessidade de back-end para fazer o envio dos dados preenchidos.

Abaixo um exemplo de como ficará nosso formulário:

<iframe style="min-height: 600px;" async src="https://jsfiddle.net/matheusbarone/2d5dffnv/1/embedded/result/"></iframe>

## Jekyll e Formspree

Uma coisa que me incomodava quando estava desenvolvendo um site estático, era ter de utilizar algum framework javascript para reutilizar códigos html. 

Por isso, ao refazer o meu site, busquei alternativas para resolver esse problema. Foi então que descobri o [Jekyll](https://jekyllrb.com/).

O Jekyll é uma plataforma criada pelo pessoal do Github que tem como proposta dar a um site estático, features como includes, variáveis, laços de repetição, e muitas outras coisas. Isso tudo graças ao [Liquid Template](https://shopify.github.io/liquid/), uma linguagem de programação criada pela galera da [Shopify](https://pt.shopify.com/).

Como o Liquid Template não dá suporte ao envio de formulário, tive que utilizar o [Formspree](https://formspree.io/) como alternativa. Ele é um projeto open source que tem como proposta fazer exatamente o que eu precisava: envio de formulários em um site estático.

Existe uma forma padrão de utilizá-lo em que, após submetido o formulário, o usuário é redirecionado para uma página anti-spam, e em seguida os dados são enviados.

No entanto, se você já estudou um pouco de experiência do usuário, deve saber que tirar a pessoa da sua página nunca é uma boa solução. Por isso utilizaremos AJAX para fazer o envio dos dados, e uma animação em SVG como notificação de sucesso/falha.

## Partes do tutorial

Como é muita coisa para ser abordada em apenas um tópico, vou divir o post em 3 partes:

- Parte 1: [Validação do formulário utilizando Expressões Regulares;](/form-site-estatico-regexp/)

- Parte 2: Envio do formulário utilizando AJAX; (Em breve)

- Parte 3: Estilização das mensagens de envio utilizando SVG; (Em breve)

Sem mais delongas, vamos começar! :D

## Baixando o Boilerplate

Como o nosso foco é a parte do Javascript, criei um boilerplate para que você não precise se preocupar com o HTML e o CSS.

É só clonar [esse repositório](https://github.com/mathvbarone/tutorial-form-para-sites-estaticos), e seguir os passos de instalação.

Estando tudo pronto, hora de por a mão na massa.

## Função global

Vamos começar criando uma função auto executável para englobar todo o nosso código.

{% highlight js %}
    (() => {

    })();
{% endhighlight %}

É um [design pattern](https://nandovieira.com.br/design-patterns-no-javascript-module) que tem como objetivo encapsular nossas variáveis e funções, para que elas não se encontrem no escopo global.

Serve como medida de segurança, evitando que elas sejam acessadas por terceiros, através das ferramentas de inspeção oferecidas pelos browsers, além de evitar que elas conflitem variaveis de outras possiveis bibliotecas que possam ser importadas no site.


## Variáveis

Agora vamos criar as váriaveis necessárias para manipular os elementos de UI.

{% highlight js %}
    (() => {
        // DECLARANDO AS VARIÁVEIS REFERENTES À INTERFACE
        const container = document.querySelector(".container");
        const form = document.querySelector(".form");
        const fields = document.querySelectorAll(".input-field");
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");
        const submitButton = document.getElementById("submit-button");
    })();
{% endhighlight %}


## Estrutura de funções

Em seguida, vamos criar a estrutura inicial do nosso script. Serão duas funções, uma que fará a validação em si, e uma para inicializarmos os eventos.


{% highlight js %}
    // FUNÇÃO DE VALIDAÇÃO DO FORM
    const validateForm = () => {
    };

    // FUNÇÃO DE INICIALIZAÇÃO
    const init = () => {
    };

    init();
{% endhighlight %}


## Validação com Expressões Regulares

Chegamos na parte mais interessante, as [Expressões Regulares](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions).

>**Expressões regulares são padrões utilizados para selecionar combinações de caracteres em uma string.**

Ou seja, com elas conseguimos detectar determinados padrões dentro de uma string e, dependendo desse padrão, executar ou não uma função.

Alguns links de estudo:

- [Post do tableless que explica mais a fundo o que são Expressões Regulares](https://tableless.com.br/o-basico-sobre-expressoes-regulares/)
- [Site para validar Expressões Regulares](https://regex101.com)

Voltando ao nosso formulário, no campo de nome temos a seguinte expressão:

{% highlight js %}
    nameRegexp = /[a-zA-Z\-'\s]+/;
{% endhighlight %}

Essa expressão tem como condicional a utilização de letras maiúsculas e minúsculas, e espaços


Já o campo de email é um pouco mais complexo:

{% highlight js %}
    emailRegexp = /^[A-z0-9.-]{1,}@\w+\.[A-z]{2,3}(\.[a-z]{2})?$/;
{% endhighlight %}

Para melhor entendimento, fiz uma lista detalhando cada metacaractere:
 
- `^` - Início da expressão; 
- `[]` - Classe de caracteres;
- `A-z0-9` - Alfanuméricos; 
- `.` - Qualquer caractere;
- `-` - Caractere "`-`",
- `{1,}@` - Apenas 1 caractere "`@`";
- `\w+` - Forma abreviada dos alfanuméricos, sem limite de caracteres;
- `\.` - Caractere "`.`";
- `[A-z]{2,3}` - Entre 2 e 3 caracteres de letras maiúsculas e minúsculas;
- `()` - Grupo de caracteres;
- `\.` - Caractere "`.`";
- `[a-z]{2}` - 2 caracteres de letras minúsculas;;
- `?` - Esse metacaractere indica que o grupo declarado anteriormente é opcional; 
- `$` - Fim da expressão; 

No campo de mensagem, colocamos como condicional que o campo não esteja vazio, podendo ser preenchido por qualquer outro caractere.


{% highlight js %}
    msgRegexp = /.*\S.*/;
{% endhighlight %}


Caso tenha ficado com alguma dúvida, abaixo um overview dos principais metacaracteres:

- `^`  - Início da linha;
- `$` - Fim da linha;
- `[a-Z]` - Lista permitida;
- `{n}` - Quantificador;
- `\c` - Escape;
- `\w` - Alfanuméricos;
- `+` - Repetidor;
- `()`- Grupo;
- `\d` - Apenas números;
- `\D` - Não números;
- `\s` - Espaços;
- `.` - Qualquer caractere;
- `?` - Caractere anterior é opcional;
- `*` - Caractere anterior repete uma ou mais vezes;

[Veja lista completa](https://support.google.com/analytics/answer/1034324?hl=pt-BR)

Voltando ao código, vamos setar nossas Expressões Regulares, e deixar nosso botão desabilitado por padrão:

{% highlight js %}

    const nameRegexp = /[a-zA-Z\-'\s]+/;
    const emailRegexp = /^[A-z0-9.-]{1,}@\w+\.[A-z]{2,3}(\.[a-z]{2})?$/;
    const msgRegexp = /.*\S.*/;

    submitButton.disabled = false;

{% endhighlight %}

Agora criaremos uma função para fazer a validação do que for digitado pelo usuário. Se o usuário digitou o que é esperado no campo de input, ele conseguirá habilitar o botão de submit e enviar os dados, caso contrário, mostraremos uma mensagem avisando para ele o que precisa ser digitado.


{% highlight js %}

    // FUNÇÃO DE VALIDAÇÃO DO CAMPO
    const validateField = (regExp, field) => {
      if (regExp.test(field.value)) {
        field.classList.remove("is-danger");
        field.nextElementSibling.classList.add("is-hidden");
      } else {
        field.classList.add("is-danger");
        field.nextElementSibling.classList.remove("is-hidden");
        submitButton.disabled = true;
      }
    };

{% endhighlight %}

Agora é só executarmos as funções utilizando as variáveis declaradas lá em cima:


{% highlight js %}

    validateField(nameRegexp, nameInput);
    validateField(emailRegexp, emailInput);
    validateField(msgRegexp, messageInput);

{% endhighlight %}

Por último, é só dispararmos a função de validação cada vez que um dos inputs for preenchido, e tirar o evento default do botão de envio do form.

{% highlight js %}

    // FUNÇÃO DE INICIALIZAÇÃO
    const init = () => {
        fields.forEach((field) => {
        field.addEventListener("input", validateForm);
        });
        submitButton.addEventListener("click", (evnt) => {
        evnt.preventDefault();
        });
    };

{% endhighlight %}

Bom pessoal, por enquanto ficamos por aqui.

Caso você tenha se perdido no meio do caminho, pode consultar o [código dessa primeira parte](https://github.com/mathvbarone/tutorial-form-para-sites-estaticos/blob/master/docs/parte-1/js/script.js).

Validação de formulário é algo primordial para qualquer front. Por mais que você não se interesse pelo tutorial como um todo, essa parte em específico com certeza será muito útil. Lembrando que as informações também deve ser validadas no back-end.

Feedback, criticas e sugestões são muito bem vindas.

Valeu, e até a parte 2 :D.
