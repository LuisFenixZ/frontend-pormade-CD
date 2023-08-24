export type UsuarioCreateDTO = {
    id_user? : number,
    email: string,
    password: string,
    is_admin?: boolean
}