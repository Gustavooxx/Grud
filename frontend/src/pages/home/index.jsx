import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import api from "../../api.js";
import './index.scss';


export default function Home() {
    const navigate = useNavigate();
    const [buscar, setBuscar] = useState("");
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleBuscar = async (e) => {
        e.preventDefault();
        setLoading(true)
        setError('')
        setResultados([])
        
        try {
            const response = await api.get(`/listarUser/${buscar}`);
            setResultados(response.data);
        } catch (err) {
            setError(err.message || 'Erro ao buscar usuários. Tente novamente.');
        } finally {
            setLoading(false);
        }

    }

    const handleEditar = (id) => {
        
        navigate(`/atualizarUser/${id}`);
    }

    const handleDeletar =  async(id) => {
        if(!window.confirm('Tem certeza que deseja deletar o usuário?'))
        return

        try{
        await api.delete(`/deletarUser/${id}`);
        setResultados(resultados.filter(user => user.id !== id));
        } catch (err) {
            setError(err.message || 'Erro ao deletar usuário. Tente novamente.');
        }
    }

    const handleCadastrar = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            nome: formData.get('nome'),
            idade: formData.get('idade'),
            curso: formData.get('curso')
        };

        try{
            const response = await api.post('/adicionarUser', data)
            alert('Usuário cadastrado com sucesso!');
            e.target.reset();
        } catch (err){
            setError(err.message || 'Erro ao cadastrar usuário. Tente novamente.');
        }
    }

    return (
        <main>
            <h1>Ver usuarios</h1>

            <form onSubmit={handleBuscar}>
                <input
                type="text"
                placeholder="Buscar por nome"
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'carregando ' : 'pesquisar'}
                    </button>
            </form>

            <div className="resultados">
                <h2>Resultados da busca</h2>
                {error && <p className="error">{error}</p>}
                {resultados.length === 0 && !loading && <p>Nenhum usuário encontrado.</p>}
                <ul>
                    {resultados.map((user, index) => (
                        <div key={index}>
                        <li>{user.nome}</li>
                        <li>{user.idade}</li>
                        <li>{user.curso}</li>
                        
                        <button onClick={() => handleEditar(user.id_aluno)}>editar</button>

                        <button onClick={() => handleDeletar(user.id_aluno)}>deletar</button>

                        </div>
                    ))}
                </ul>
            </div>

            <div className="adicionarUser">
                    <h2>Cadastrar Usuário</h2>
                    <form onSubmit={handleCadastrar}>
                        <input type="text"
                        name="nome"
                        placeholder="Nome" />
                        <input type="number"
                        name="idade"
                        placeholder="Idade" />
                        <input type="text"
                        name="curso"
                        placeholder="Curso" />
                        <button type="submit">Cadastrar</button>
                    </form>
            </div>

        </main>
    )
}