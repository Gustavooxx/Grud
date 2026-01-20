import connection from "../connection.js";

export async function listarUsers(nome) {
    const comando = `
    select nome, idade,curso from cadastrar_aluno
    where nome like ?
    `
    const [registro] = await connection.query(comando, [`%${nome}%`]);
    return registro;
}   


export async function listarUsersLId(id) {
    const comando = `
    select nome, idade,curso from cadastrar_aluno
    where id_aluno= ?
    `
    const [registro] = await connection.query(comando, [id]);
    return registro;
}

export async function adicionarUser(novoUser) {
    const comando = `
    insert into cadastrar_aluno (nome, idade, curso)
    values (?, ?, ?);
    `

    const [registro] = await connection.query(comando, [ novoUser.nome, novoUser.idade, novoUser.curso]);
    return registro.insertId;
}

export async function atualizarUser(id, user) {
    const comando = `
    update cadastrar_aluno
    set nome = ?,
    idade = ?,
    curso = ?
    where id_aluno = ?;
    `
    const [registro] = await connection.query(comando, [user.nome , user.idade, user.curso, id]);
    return registro;
}

export async function  deletarUSer(id) {
    const comando = `
    delete from cadastrar_aluno
    where id_aluno = ?;
    `
    const [registro] = await connection.query(comando, [id]);
    return registro;
}