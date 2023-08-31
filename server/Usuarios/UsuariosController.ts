import "reflect-metadata";
import express from "express";
import bcrypt from 'bcrypt';
import UsuariosService from "./UsuariosService";
const usuariosController = express.Router();


usuariosController.get('/', async (request, response) => {
    
    let usuario = await UsuariosService.findAllUsers();
    return response.json(usuario);
});

usuariosController.get('/:id_user', async (request, response) => {
    let usuario = await UsuariosService.findUsersById(+request.params.id_user)
    if (!usuario) return response.status(404).send('Not Found');
    return response.json(usuario);
});

usuariosController.post('/login', async (request, response) => {
    const { email, password } = request.body;
  
    try {
      
      const usuario = await UsuariosService.findByEmail(email);
      if (!usuario) {
        return response.status(401).send('Invalid credentials');
      }
  
      
      const isPasswordValid = await bcrypt.compare(password, usuario.password);
      if (!isPasswordValid) {
        return response.status(401).send('Invalid credentials');
      }
  
      return response.status(200).json({ message: 'Login successful', is_admin: usuario.is_admin });
    } catch (error) {
      console.log(error);
      return response.status(500).send('Error');
    }
  });
  

  usuariosController.post('/register', async (request, response) => {
    const { email, password, is_admin } = request.body;
  
    const existingUser = await UsuariosService.findByEmail(email);
    if (existingUser) {
      return response.status(409).send('Email already registered');
    }
  
    try {
      
      const hashedPassword = await bcrypt.hash(password, 10);
  
      
      const newUser = await UsuariosService.create({
        email: email,
        password: hashedPassword,
        is_admin: is_admin || false,
      });
  
      return response.json(newUser);
    } catch (error) {
      console.log(error);
      return response.status(500).send('Error');
    }
  });

usuariosController.put('/:id_user', async (request, response) => {
    let {email, password} = request.body;
    let { id_user } = request.params;
    let usuario = await UsuariosService.update(+id_user, { email, password });

    if (!usuario) return response.status(401).send('Error')

    return response.json(usuario);
});

usuariosController.delete('/:id_user', async (request, response) => {
    const { id_user } = request.params;
    if (await UsuariosService.destroy(+id_user)){
        return response.status(204).send('');
    }else{
        return response.status(404).send('Not Found');
    }
});

export default usuariosController;
