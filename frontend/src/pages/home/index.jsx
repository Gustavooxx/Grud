import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import api from "../../api.js";


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
        navigate(`/editar/${id}`);
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
                        </div>
                    ))}
                </ul>
                <button>editar</button>
                <button>deletar</button>
            </div>

        </main>
    )
}