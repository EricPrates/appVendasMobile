# App de Venda de Tênis

Aplicação mobile desenvolvida com React Native para simular um sistema de venda de tênis.  
O aplicativo possui diferenciação de acesso entre usuários comuns e administradores, permitindo testes de funcionalidades como cadastro, navegação e simulação de compras.

## Tecnologias Utilizadas

- React Native
- JavaScript
- LocalStorage

## Usuários de Teste

O aplicativo possui dois usuários configurados para testes:

### Administrador
Login: Eric  
Senha: 123  

Permissões:
- Cadastrar produtos
- Editar produtos
- Acessar funcionalidades administrativas

### Usuário Comum
Login: Maria  
Senha: 123  

Permissões:
- Navegar pelos produtos
- Adicionar produtos ao carrinho
- Visualizar pedidos

> O usuário **Eric (admin)** já está configurado automaticamente no sistema.

## Funcionalidades

### Home
- Exibição simulada de produtos em formato de **cards**
- Imagens e preços gerados para testes de layout


### Menu
O menu apresenta funcionalidades diferentes dependendo do tipo de usuário:

**Admin**
- Cadastrar produtos
- Editar produtos

**Usuário comum**
- Apenas visualização

## Navegação

A navegação foi implementada utilizando **Stack Navigator** entre telas.


## Armazenamento de Dados

Os dados do aplicativo são armazenados utilizando **LocalStorage** para simulação de persistência.


## Objetivo do Projeto

Este projeto foi desenvolvido com o objetivo de praticar:

- desenvolvimento mobile com React Native
- navegação entre telas
- manipulação de estados
- simulação de funcionalidades de e-commerce
- uso de armazenamento local
