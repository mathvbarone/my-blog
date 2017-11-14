---
layout: post
title: "Formulário para site estático (Parte 1) - Validação com RegExp"
date: 2017-11-09 16:20
image: '/assets/dist/images/posts/form-sem-backend/parte1.jpg'
description: "Aprenda a fazer uma validação de formulário dinâmida utilizando Expressões Regulares"
main-class: 'js'
head-class: post
color: '#f8c101'
tags:
- js
- regexp
- es6
- form-site-estatico

twitter_text: "Aprenda a fazer uma validação de formulário dinâmida utilizando Expressões Regulares"
introduction: "Aprenda a fazer uma validação de formulário dinâmida utilizando Expressões Regulares."
---

## Introdução

Fala galera, beleza?

Esse é o meu primeiro post técnico, e nele vamos criar um formulário, sem a necessidade de back-end para fazer o envio dos dados preenchidos.

Para quem gosta de ver o exemplo antes de começar, [clique aqui](https://github.com/mathvbarone/form-sem-backend).

Sempre me senti incomodado quando, apenas por conta do envio de formulário, tinha que utilizar uma linguagem back-end para desenvolver sites estáticos. Por isso, ao refazer o meu site, busquei alternativas para resolver esse problema. Foi então que descobri o [Jekyll](https://jekyllrb.com/).

O Jekyll é uma plataforma criada pelo pessoal do [Github](https://github.com/jekyll/jekyll) que tem como proposta dar a um site estático, features como includes, variáveis, laços de repetição, e muitas outras coisas. Isso tudo é possível graças ao [Liquid Template](https://shopify.github.io/liquid/), uma linguagem de programação criado pelo pessoal da [Shopify](https://pt.shopify.com/).

Apesar de ser bem completo, o Liquid Template não dá suporte ao envio de fomulário, por isso a saida foi utilizar o [Formspree](https://formspree.io/). Ele é um projeto [Open Source](https://github.com/formspree/formspree) que tem como proposta exatamente resolver a questão de envio de formulários para sites estáticos.

Existe uma forma padrão de utiliza-lo em que, após submetido o formulário, o usuário é redirecionado para uma página anti-spam, e em seguida o email é enviado.

Se você já estudou um pouco de experiência do usuário, deve saber que tirar a pessoa da sua página nunca é uma boa solução. Por isso utilizaremos AJAX para fazer o envio dos dados, sem a necessidade de redirecionar o usuário.

Como é muita coisa para ser abordada em apenas um tópico, vou divir o post em 3 partes:

- Parte 1: [Validação do formulário utilizando Expressões Regulares](http://matheusbarone.com/form-site-estatico-regexp/)

- Parte 2: Envio do formulário utilizando AJAX.

- Parte 3: Estilização das mensagens de envio utilizando SVG.

Sem mais delongas, vamos começar! :D

## Baixando o Boiterplate

Como o nosso foco é fazer o envio do formulário, criei um boiterplate para que você não precise se preocupar com o HTML e o CSS.

É só clonar [esse repositório](https://github.com/mathvbarone/tutorial-form-para-sites-estaticos), e seguir os passos de instalação.

Estando tudo pronto, hora de por a mão na massa.

## Função global

Vamos começar criando uma função para englobar todo o nosso código. Esse é um design pattern que tem como objetivo encapsular nossas variáveis e funções para que não se encontrem no escopo global.

É uma medida de segurança, para evitar que elas sejam acessadas por terceiros através do "inspecionar elemento".


{% highlight js %}
    (() => {

    })();
{% endhighlight %}


## Variáveis para manipularmos os elementos de UI

Agora vamos criar as váriaveis necessárias para manipular os elementos de UI.

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

Em seguida, vamos criar a estrutura de funções necessárias para fazer a validação do formulário. Serão duas funções, uma que fará a validação em si, e uma para inicializarmos os eventos.


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

Agora vem a parte mais interessante, as [Expressões Regulares](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions).

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


[Nesse site](https://regex101.com/) é possível brincar um pouco com as Expressões Regulares e, inclusive. foi utilizando ele que cheguei no código necessário para a validação dos campos de nome, email e mensagem.

No campo de nome, colocamos como condicional a utilização de letras.

{% highlight js %}
    const nameRegexp = /[a-zA-Z\-'\s]+/;
{% endhighlight %}

No campo de email, colocamos como condicional a utilização de números e letras, seguidos do caractere "@", números e letras seguidos pelo caractere ".", e por último a utilização de letras, com no máximo 3 caracteres.

{% highlight js %}
    const emailRegexp = /^[A-z0-9.-]{1,}@\w+\.[A-z]{2,3}(\.[a-z]{2})?$/;
{% endhighlight %}


No campo de mensagem, colocamos como condicional que o campo não esteja vazio, podendo ser preenchido por qualquer outro caractere.

{% highlight js %}
    const msgRegexp = /.*\S.*/;
{% endhighlight %}


Agora vamos setar nossas Expressões Regulares, e deixar nosso botão desabilitado por padrão:

{% highlight js %}

    const nameRegexp = /[a-zA-Z\-'\s]+/;
    const emailRegexp = /^[A-z0-9.-]{1,}@\w+\.[A-z]{2,3}(\.[a-z]{2})?$/;
    const msgRegexp = /.*\S.*/;

     submitButton.disabled = false;

{% endhighlight %}

Agora criaremos uma função para fazer a validação do que for digitado pelo usuário, baseado nas Expressões Regulares. Se o usuário digitou o que é esperado no campo de input, ele conseguirá habilitar o botão e enviar os dados, caso contrário, mostraremos uma mensagem avisando para ele o que precisa ser digitado:


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











