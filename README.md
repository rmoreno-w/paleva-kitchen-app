
---

# PaLevá App Cozinha (Vue)

## Descrição

Este é o **PaLevá App Cozinha**, um sistema para visualização de pedidos de restaurante. Construído com **Vue.js**, **TypeScript** e **Vite**, consumindo dados da API do backend em **Rails**.

### Funcionalidades

- **Código do Restaurante**: Ao informar o código do restaurante, o app redireciona o usuário para a lista de pedidos desse restaurante.
- **Pedidos**: Visualize os pedidos realizados para o restaurante.
- **Detalhes do Pedido**: Ao clicar em um pedido, é possível ver seus detalhes.
- **Filtragem por Status**: Filtre os pedidos por status (ex: "em preparação", "pronto", "entregue").

---

## Tecnologias Usadas

-   **Vue.js**
-   **Vue Router** para navegação
-   **Axios** para requisições HTTP à API
-   **Vue Toastification** para toasts com notificações
-   **TypeScript**
-   **TailwindCSS** para estilização
-   **Vite** para bundling e desenvolvimento

---

## Instruções de Uso

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório**:

    ```bash
    git clone https://github.com/rmoreno-w/paleva-kitchen-app 
    cd paleva-kitchen-app 
    ```

2. **Instale as dependências**:

    ```bash
    npm install
    ```

3. **Inicie o servidor de desenvolvimento**:

    ```bash
    npm run dev
    ```

4. Abra seu navegador e acesse `http://localhost:5173` para ver o aplicativo em funcionamento.

---
