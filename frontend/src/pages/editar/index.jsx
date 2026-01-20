import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";


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

    return (
        <main>
            <h1>Editar usuario</h1>
        </main>
    )
}