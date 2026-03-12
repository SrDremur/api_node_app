const express = require('express');
const cors = require('cors');
const conectDB = require('./db_conection');
const User = require('./models/User');
const Sale = require('./models/Sale');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors ());
app.use(express.json());

conectDB ();

app.get('/User', async(req, res) => {
     try{
          const usuario = await User.find();
          res.json(usuario);
     }catch (error){
          req.status(500).json({mensaje: "Error al encontrar usuarios"});
     }
});

app.post('/login', async (req, res) => {
     const {email, password} = req.body;

     try{
          const usuario = await User.findOne({email});

          if(!usuario) return res.status(404).json({mensaje: "El email es incorrecto"});

          const isMatch = await bcrypt.compare(password, usuario.password);

          if(!isMatch) return res.status(404).json({mensaje: "La contraseña es incorrecta"});

          res.status(200).json({mensaje: "Inicio de sesión exitoso"});
     }catch (error){
          res.status(500).json({mensaje: "Error al iniciar sesión"});
     }
});

app.get('/User/:id', async (req, res) => {
     try{
          const usuario = await User.findById(req.params.id);
          if(!usuario) return res.status(404).json({mensaje: "Usuario no encontrado"});
          res.json(usuario);
     } catch (error){
          res.status(500).json({mensaje: "El id del usuario no existe"});
     }
});

app.post('/User', async (req, res) => {
     try{
          const {password} = req.body;
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          req.body.password = hashedPassword;

          const newUser = new User(req.body);
          await newUser.save();
          res.status(201).json(newUser);
     }catch (error){
          res.status(400).json({error: error.message});
     }
});

app.put('/User', async (req, res) => {
     try{
          const update = await User.findByIdAndUpdate(
               req.params.id,
               req.body,
               {new: true}
          );
          res.json({mensaje: "Usuario actualizado correctamente", datos: update});
     }catch (error){
          res.status(400).json({error: error.message});
     }
});

app.delete('/User/:id', async (req, res) => {
     try{
          await User.findByIdAndDelete(req.params.id);
          res.json({mensaje: "Usuario eliminado exitosamente"});
     }catch (error){
          res.status(404).json({mensaje: "Error al eliminar usuario"});
     }
});

app.get('/Sale', async (req,res) => {
     try{
          const venta = await Sale.find();
          res.json(venta);
     }catch (error){
          res.status(500).json({mensaje: "Error al encontrar ventas"});
     }
});

app.get('/Sale/:id', async (req,res) => {
     try{
          const venta = await Sale.findById(req.params.id);
          if(!venta) return res.status(404).json({mensaje: "El id del usuario no existe"}); 
          res.json(venta);
     }catch (error){
          res.status(500).json({mensaje: "Error al encontrar al usuario"});
     }
});

app.post('/Sale', async (req, res) => {
     try{
          const newSale = new Sale(req.body);
          await newSale.save();
          res.status(201).json(newSale);
     }catch (error){
          res.status(400).json({error: error.message});
     }
});

app.put('/Sale/:id', async (req, res) => {
     try{
          const update = await Sale.findByIdAndUpdate(
               req.params.id,
               req.body,
               {new: Sale}
          );
          res.json({mensaje: "Venta actualizada exitosamente", datos: update});
     }catch (error){
          res.status(404).json({erro: error.message})
     }
});

app.delete('/Sale/:id', async (req,res) => {
     try{
          await Sale.findByIdAndDelete(req.params.id);
          res.json({mensaje: "Venta eliminada exitosamente"});
     }catch (error){
          res.status(404).json({mensaje: "Id de Usuario no encontrado"});
     }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
