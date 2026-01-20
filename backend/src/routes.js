import lista from "./controller/listarUserController.js";


export default function rotas(app) {
    app.use(lista);
}