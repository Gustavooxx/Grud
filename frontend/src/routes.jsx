import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Editar from './pages/editar';

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/atualizarUser/:id' element={<Editar/>}/>
            </Routes>
        </BrowserRouter>
    )
}