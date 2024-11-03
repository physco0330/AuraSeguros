package com.seguro.seguro.controller;

import com.seguro.seguro.model.Modulo;
import com.seguro.seguro.services.ModuloService; // Asegúrate de que tienes este servicio implementado
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
    public Modulo crearModulo(@RequestBody Modulo modulo) {
        return moduloService.saveModulo(modulo); // Llama al servicio para guardar el módulo
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
        return ResponseEntity.ok(modulo); // Retorna el módulo encontrado
    }

    // Método para actualizar un módulo
    @PutMapping("/{id}")
    public ResponseEntity<Modulo> actualizarModulo(@PathVariable Long id, @RequestBody Modulo modulo) {
        modulo.setId_modulo(id); // Asegúrate de que el ID sea el correcto
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
