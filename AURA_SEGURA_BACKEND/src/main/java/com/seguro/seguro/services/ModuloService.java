package com.seguro.seguro.services;

import com.seguro.seguro.model.Modulo;
import com.seguro.seguro.repository.ModuloRepository; // Asegúrate de que este repositorio esté definido
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ModuloService {

    @Autowired
    private ModuloRepository moduloRepository; // Asegúrate de tener este repositorio

    // Método para guardar un nuevo módulo
    public Modulo saveModulo(Modulo modulo) {
        // Aquí puedes agregar lógica adicional si es necesario,
        // como validaciones específicas para el color
        return moduloRepository.save(modulo); // Guarda el módulo en la base de datos
    }

    // Método para obtener todos los módulos
    public List<Modulo> getAllModulos() {
        return moduloRepository.findAll(); // Devuelve la lista de todos los módulos
    }

    // Método para obtener un módulo por su ID
    public Modulo getModuloById(Long id) {
        Optional<Modulo> moduloOptional = moduloRepository.findById(id); // Busca el módulo por ID
        return moduloOptional.orElse(null); // Retorna el módulo o null si no se encuentra
    }

    // Método para actualizar un módulo
    public Modulo updateModulo(Modulo modulo) {
        // Verifica si el módulo existe antes de actualizar
        if (moduloRepository.existsById(modulo.getId_modulo())) {
            return moduloRepository.save(modulo); // Guarda el módulo actualizado
        } else {
            // Podrías lanzar una excepción si el módulo no existe
            throw new IllegalArgumentException("Modulo no encontrado con ID: " + modulo.getId_modulo());
        }
    }

    // Método para eliminar un módulo
    public void deleteModulo(Long id) {
        if (moduloRepository.existsById(id)) {
            moduloRepository.deleteById(id); // Elimina el módulo por ID
        } else {
            // Podrías lanzar una excepción si el módulo no existe
            throw new IllegalArgumentException("Modulo no encontrado con ID: " + id);
        }
    }
}
