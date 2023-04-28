import { Routes, Route } from "react-router-dom";
import AdminRoute from "../AdminRoute";

import { Dashboard } from "../../pages/Dashboard";

// Usuarios
import { Usuarios } from "../../pages/Usuarios";
import { UsuarioAdd } from "../../pages/Usuarios/UsuarioAdd";

// Unidades
import { Unidades } from "../../pages/Unidades";
import { UnidadeAdd } from "../../pages/Unidades/UnidadeAdd";

// Unidade Ponto
import { PontoUnidades } from "../../pages/PontoUnidades";
import { PontoUnidadeAdd } from "../../pages/PontoUnidades/PontoUnidadeAdd";
import { PontoIndividuais } from "../../pages/PontoIndividuais";
import { PontoIndividuaisAdd } from "../../pages/PontoIndividuais/PontoIndividuaisAdd";


const AuthenticatedRoute = () => (
    <Routes>
        <Route path='/' element={<Dashboard />} />

        {/* Usuarios */}
        <Route path='/usuarios' element={<Usuarios />} />
        <Route path='/usuarios/add' element={<UsuarioAdd />} />
        <Route path='/usuarios/edit/:id' element={<UsuarioAdd />} />

        {/* Unidades */}
        <Route path="/unidades" element={<Unidades />} />
        <Route path="/unidades/add" element={<UnidadeAdd />} />
        <Route path="/unidades/edit/:id" element={<UnidadeAdd />} />

        {/* Pontos de Unidade */}
        <Route path="/pontounidades" element={<PontoUnidades />} />
        <Route path="/pontounidades/add" element={<PontoUnidadeAdd />} />
        <Route path="/pontounidades/edit/:id" element={<PontoUnidadeAdd />} />

        {/* Pontos de Usuario */}
        <Route path="/pontousuarios" element={<PontoIndividuais />} />
        <Route path="/pontousuarios/add" element={<PontoIndividuaisAdd />} />
        <Route path="/pontousuarios/edit/:id" element={<PontoIndividuaisAdd />} />

    </Routes>
);

export default AuthenticatedRoute;