package com.seguro.seguro.controller;

import com.seguro.seguro.model.Modulo;
import com.seguro.seguro.services.ModuloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modulos") // Mapeo para el controlador de módulos
public class ModuloController {

    @Autowired
    private ModuloService moduloService; // Servicio que maneja la lógica de negocio para los módulos

    // Método para crear un nuevo módulo
    @PostMapping
    public ResponseEntity<Modulo> crearModulo(@RequestBody Modulo modulo) {
        // Validación de entrada
        if (modulo.getNombreModulo() == null || modulo.getNombreModulo().isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Retorna un error 400 si el nombre es inválido
        }

        if (modulo.getDescripcionModulo() == null || modulo.getDescripcionModulo().isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Retorna un error 400 si la descripción es inválida
        }

        // Validación del color
        if (modulo.getColorModulo() == null || modulo.getColorModulo().isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Retorna un error 400 si el color es inválido
        }

        // Si las validaciones pasan, guarda el módulo
        Modulo nuevoModulo = moduloService.saveModulo(modulo);
        return ResponseEntity.status(201).body(nuevoModulo); // Retorna el módulo creado con un estado 201 Created
    }

    // Método para obtener todos los módulos
    @GetMapping
    public List<Modulo> obtenerModulos() {
        return moduloService.getAllModulos(); // Llama al servicio para obtener todos los módulos
    }

    // Método para obtener un módulo por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Modulo> obtenerModulo(@PathVariable Long id) {
        Modulo modulo = moduloService.getModuloById(id);
        if (modulo == null) {
            return ResponseEntity.notFound().build(); // Retorna 404 si no se encuentra el módulo
        }
        return ResponseEntity.ok(modulo); // Retorna el módulo encontrado
    }

    // Método para actualizar un módulo
    @PutMapping("/{id}")
    public ResponseEntity<Modulo> actualizarModulo(@PathVariable Long id, @RequestBody Modulo modulo) {
        modulo.setId_modulo(id); // Asegúrate de que el ID sea el correcto

        // Validación de entrada
        if (modulo.getNombreModulo() == null || modulo.getNombreModulo().isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Retorna un error 400 si el nombre es inválido
        }

        if (modulo.getDescripcionModulo() == null || modulo.getDescripcionModulo().isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Retorna un error 400 si la descripción es inválida
        }

        // Validación del color
        if (modulo.getColorModulo() == null || modulo.getColorModulo().isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Retorna un error 400 si el color es inválido
        }

        Modulo moduloActualizado = moduloService.updateModulo(modulo);
        return ResponseEntity.ok(moduloActualizado); // Retorna el módulo actualizado
    }

    // Método para eliminar un módulo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarModulo(@PathVariable Long id) {
        moduloService.deleteModulo(id); // Llama al servicio para eliminar el módulo
        return ResponseEntity.noContent().build(); // Responde con un 204 No Content
    }
}
