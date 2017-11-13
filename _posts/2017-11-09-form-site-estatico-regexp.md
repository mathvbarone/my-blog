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

Esse é o meu primeiro post técnico, e nele vou ensinar vocês a criar um formulário para site estático, ou seja, sem a necessidade de back-end.

Para quem gosta de ver o exemplo antes de começar, [clique aqui](http://matheusbarone.com/form-sem-backend/) aqui para ver o form funcionando.

Sempre me incomodou o fato de ter de usar uma linguagem back-end para fazer sites estáticos, apenas por causa do envio de formulário. Porém, quando resolvi refazer o meu site, encontrei no [Jekyll](https://jekyllrb.com/) uma solução para esse problema. Através do [Liquid Template](https://github.com/Shopify/liquid/wiki), ele consegue proporcionar a utilização de includes, laços de repetição, e várias outras coisas apenas com o bom e velho HTML.

Por conta disso tive que procurar outras formas de fazer o envio de email, e foi assim que encontrei o [Formspree](https://formspree.io/). Ele é um projeto [Open Sourc](https://github.com/formspree/formspree) que tem como proposta exatamente resolver essa questão.

Existe uma forma padrão de utilizar ele, onde, após submetido o formulário, o usuário é redirecionado para uma página anti-spam, e em seguida o email é enviado.

Se você já estudou um pouco de experiência do usuário, deve saber que tirar a pessoa da sua página nunca é uma boa solução. Por isso utilizaremos AJAX para fazer o envio do formulário sem a necessidade de redirecionar o usuário.

Como é muita coisa para ser abordada em apenas um tópico, vou divili-lo em 3 partes:

- Parte 1: Validação do formulário utilizando Expressões Regulares;
- Parte 2: Envio do formulário utilizando AJAX;
- Parte 3: Estilização das mensagens de envio utilizando SVG;




