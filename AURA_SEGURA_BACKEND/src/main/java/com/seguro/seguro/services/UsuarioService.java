package com.seguro.seguro.services;

import com.seguro.seguro.model.Usuario;
import com.seguro.seguro.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Optional<Usuario> login(String correo, String contrasena) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreoUsuario(correo);
        if (usuarioOpt.isPresent() && usuarioOpt.get().getContrasena().equals(contrasena)) {
            return usuarioOpt;
        }
        return Optional.empty();
    }

    // Nuevo método para registrar usuario
    public Usuario registrar(Usuario nuevoUsuario) {
        // Verificar si el correo ya está registrado
        if (usuarioRepository.existsByCorreoUsuario(nuevoUsuario.getCorreoUsuario())) {
            throw new RuntimeException("El correo ya está registrado");
        }

        // Aquí puedes agregar lógica para encriptar la contraseña antes de guardar
        // Por simplicidad, lo guardamos tal cual

        return usuarioRepository.save(nuevoUsuario);
    }
}
