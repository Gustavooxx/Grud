import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api.js";


export default function Editar() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: "",
        idade: "",
        curso: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await api.get(`/listarUser/id/${id}`);
                if (response.data.length > 0){
                    const user = response.data[0];
                    setFormData({
                        nome: user.nome,
                        idade: user.idade,
                        curso: user.curso
                    })
                }
            } catch (err) {
                setError(err.message || 'Erro ao carregar dados do usuário.');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();

    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleEditar = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
            await api.put(`/atualizarUser/${id}`, formData);
            navigate('/');

        } catch (err) {
            setError(err.message || 'Erro ao atualizar usuário. Tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main>
            <h1>Editar usuario</h1>

            <form onSubmit={handleEditar}>
                <input type="text"
                name="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleChange} 
                required/>

                <input type="number"
                name="idade"
                placeholder="Idade"
                value={formData.idade}
                onChange={handleChange}
                required />

                <input type="text"
                name="curso"
                placeholder="Curso"
                value={formData.curso}
                onChange={handleChange}
                required />

                <button type="submit" disabled={loading}>
                    {loading ? 'Atualizando...' : 'Atualizar'}
                </button>
                <button type="button" onClick={() => navigate('/')}>Cancelar</button>
            </form>
            {error && <p className="error">{error}</p>}
        </main>
    )
}