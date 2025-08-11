package com.seguro.seguro.controller;

import com.seguro.seguro.model.RolUsuario;
import com.seguro.seguro.model.Usuario;
import com.seguro.seguro.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:4200") // Para permitir llamadas desde Angular
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Endpoint para registrar un usuario
    @PostMapping
    public Usuario registrarUsuario(@RequestBody Usuario usuario) {
        // Forzar que siempre sea viewer
        usuario.setRolUsuario(RolUsuario.viewer);
        usuario.setFechaCreacion(LocalDateTime.now());
        return usuarioRepository.save(usuario);
    }
}
