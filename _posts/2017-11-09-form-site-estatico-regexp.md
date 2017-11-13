---
layout: post
title: "Formulário para site estático (Parte 1) - Validação com RegExp"
date: 2017-11-09 16:20
image: '/assets/dist/images/posts/form-sem-backend/parte1.jpg'
description: "Nessa primeira parte, aprenda a fazer uma validação de formulário dinâmida utilizando Expressões Regulares"
main-class: 'js'
head-class: post
color: '#f8c101'
tags:
- js
- regexp
- es6
- form-site-estatico

twitter_text: "Nessa primeira parte, aprenda a fazer uma validação de formulário dinâmida utilizando Expressões Regulares"
introduction: "Nessa primeira parte, aprenda a fazer uma validação de formulário dinâmida utilizando Expressões Regulares."
---

## Introdução

Fala galera, beleza?

Esse é o meu primeiro post técnico, e nele vamos criar um formulário sem a necessidade de back-end para fazer o envio dos dados preenchidos.

Para quem gosta de ver o exemplo antes de começar, [clique aqui](http://matheusbarone.com/form-sem-backend/).

Sempre me incomodou quando, apenas por causa do envio de formulário, tinha que utilizar uma linguagem back-end para desenvolver sites estáticos. Por isso, ao refazer o meu site, encontrei no [Jekyll](https://jekyllrb.com/) uma solução para esse problema. Ele é uma plataforma criada pelo pessoal do Github, e através do [Liquid Template](https://shopify.github.io/liquid/), é possível utilizar includes, laços de repetição, e várias outras coisas apenas com o bom e velho HTML.

Para fazer o envio do formulário utilizei o [Formspree](https://formspree.io/). Ele é um projeto [Open Source](https://github.com/formspree/formspree) que tem como proposta exatamente resolver essa questão.

Existe uma forma padrão de utiliza-lo em que, após submetido o formulário, o usuário é redirecionado para uma página anti-spam, e em seguida o email é enviado.

Se você já estudou um pouco de experiência do usuário, deve saber que tirar a pessoa da sua página nunca é uma boa solução. Por isso utilizaremos AJAX para fazer o envio dos dados, sem a necessidade de redirecionar o usuário.

Como é muita coisa para ser abordada em apenas um tópico, vou divir o post em 3 partes:

- Parte 1: [Validação do formulário utilizando Expressões Regulares](http://matheusbarone.com/form-site-estatico-regexp/)

- Parte 2: Envio do formulário utilizando AJAX.

- Parte 3: Estilização das mensagens de envio utilizando SVG.

Sem mais delongas, vamos começar! :D

## Baixando o Boiterplate

Como o nosso foco é fazer o envio do formulário, criei um boiterplate para que você não precise se preocupar com o HTML e o CSS.

É só clonar [esse repositório](https://github.com/mathvbarone/tutorial-form-para-sites-estaticos) na sua máquina, e seguir os passos de instalação.

Estando tudo pronto, hora de por a mão na massa.

## Função global

Vamos começar criando uma função para englobar todo o nosso código. Esse é um design pattern que tem como objetivo encapsular nossas variáveis e funções para que não se encontrem no escopo global. É uma medida de segurança, para evitar que elas de sejam acessadas por terceiros através do "inspecionar elemento":


{% highlight js %}
    (() => {

    })();
{% endhighlight %}


## Variáveis para manipularmos os elementos de UI

Agora vamos criar as váriaveis necessárias para manipular os elementos de UI:

{% highlight js %}
    (() => {
        // DECLARANDO AS VARIÁVEIS REFERENTES À INTERFACE
        const form = document.querySelector(".form");
        const fields = document.querySelectorAll(".input-field");
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");
        const submitButton = document.getElementById("submit-button");
        const container = document.querySelector(".container");
    })();
{% endhighlight %}


## Estrutura de funções

Agora vamos criar a estrutura de funções necessárias para fazer a validação do formulário:


{% highlight js %}
    // FUNÇÃO DE VALIDAÇÃO DO FORM
    const validateForm = () => {
    };

    // FUNÇÃO DE INICIALIZAÇÃO
    const init = () => {
    };

    init();
{% endhighlight %}


## Expressões Regulares

Agora vem a parte mais interessante, as [Expressões Regulares](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions):

>**Expressões regulares são padrões utilizados para selecionar combinações de caracteres em uma string.**

Ou seja, conseguimos detectar determinados padrões dentro de uma string, e dependendo desse padrão, executar ou não uma função.

Abaixo um overview do que faz cada metacharacter:

{% highlight html %}

    ^  - INÍCIO DA LINHA
    $ - FIM DA LINHA
    [I-F] - LISTA PERMITIDA
    {n} - QUANTIFICADOR
    \c - ESCAPE
    ? - OPCIONAL
    \w - ALFANUMERICOS
    + - REPETIDOR
    ()- GRUPO
    \d - APENAS NÚMEROS
    \D - NÃO NÚMEROS
    \s - ESPAÇOS
    . - QUALQUER DIGITO

{% endhighlight %}


[Nesse site](https://regex101.com/) é possível brincar um pouco com as Expressões Regulares e, inclusive. foi utilizando ele que cheguei nas Expressões Regulares necessárias para nossa validação.

Vamos setar nossas Expressões Regulares, e deixar nosso botão desabilitado por padrão:

{% highlight js %}

    const nameRegexp = /[a-zA-Z\-'\s]+/;
    const emailRegexp = /^[A-z0-9.-]{1,}@\w+\.[A-z]{2,3}(\.[a-z]{2})?$/;
    const msgRegexp = /.*\S.*/;

     submitButton.disabled = false;

{% endhighlight %}

Agora criaremos uma função para fazer a validação do que for digitado pelo usuário, baseado nas Expressões Regulares. Se o usuário digitou o que é esperado no campo de input, ele conseguirá habilitar o botão e enviar os dados, caso contrário, mostraremos uma mensagem avisando para ele o que precisa ser digitado.


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









