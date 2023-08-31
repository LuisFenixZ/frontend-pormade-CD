import { db } from "../database/db";
import { UsuarioCreateDTO } from "./usuarioCreateDto";
import Usuario from "./Usuario";

class UsuariosService {

    async findAllUsers () : Promise<Usuario[]|null> {
        const usuarios = await db.manager.find(Usuario);
        return usuarios;
    }
    
    async findUsersById( id_user) : Promise<Usuario> {
        const usuario : Usuario = await db.manager.findOneBy(Usuario, { "id_user" : id_user })
        return usuario;
    }

    async findByEmail(email) : Promise<Usuario> {
        const usuario : Usuario = await db.manager.findOneBy(Usuario, {"email" : email})
        return usuario;
    }

    async create(UsuarioCreateDTO : UsuarioCreateDTO) : Promise<Usuario> {
        let usuario : Usuario = { ...UsuarioCreateDTO};
        usuario = await db.manager.save(Usuario, usuario);
        
        return usuario;
    }

    async update(id_user, UsuarioCreateDTO : UsuarioCreateDTO) : Promise<Usuario> {
        let usuario = await db.manager.findOneBy(Usuario, {"id_user" : id_user});
        usuario.email = UsuarioCreateDTO.email;
        usuario.password = UsuarioCreateDTO.password;
        
        await db.manager.update(Usuario, id_user, usuario);
        
        return usuario;
    }

    async destroy(id_user) : Promise<boolean> {
        let usuario = await db.manager.findOneBy(Usuario, {"id_user" : id_user});
        if (!usuario) return false;

        await db.manager.remove(Usuario, usuario)

        return true;
    }
}

export default new UsuariosService;