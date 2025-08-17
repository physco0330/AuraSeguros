package com.seguro.seguro.controller;

import com.seguro.seguro.model.HistorialSegurosEntity;
import com.seguro.seguro.services.HistorialSegurosService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historial-seguros")
public class HistorialSegurosController {

    private final HistorialSegurosService historialSegurosService;

    public HistorialSegurosController(HistorialSegurosService historialSegurosService) {
        this.historialSegurosService = historialSegurosService;
    }

    // Obtener historial por código
    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<List<HistorialSegurosEntity>> getHistorialByCodigo(@PathVariable String codigo) {
        List<HistorialSegurosEntity> lista = historialSegurosService.obtenerPorCodigo(codigo);
        return ResponseEntity.ok(lista);
    }

    // Obtener historial por idBien
    @GetMapping("/bien/{idBien}")
    public ResponseEntity<List<HistorialSegurosEntity>> getHistorialByIdBien(@PathVariable Long idBien) {
        List<HistorialSegurosEntity> lista = historialSegurosService.obtenerPorIdBien(idBien);
        return ResponseEntity.ok(lista);
    }

    // Crear un nuevo historial
    @PostMapping
    public ResponseEntity<HistorialSegurosEntity> crearHistorial(@RequestBody HistorialSegurosEntity historial) {
        HistorialSegurosEntity guardado = historialSegurosService.guardarHistorial(historial);
        return ResponseEntity.ok(guardado);
    }

    // Actualizar historial existente
    @PutMapping("/{id}")
    public ResponseEntity<HistorialSegurosEntity> actualizarHistorial(@PathVariable Long id,
                                                                      @RequestBody HistorialSegurosEntity historial) {
        try {
            HistorialSegurosEntity actualizado = historialSegurosService.actualizarHistorial(id, historial);
            return ResponseEntity.ok(actualizado);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    // Eliminar historial por id
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarHistorial(@PathVariable Long id) {
        try {
            historialSegurosService.eliminarHistorial(id);
            return ResponseEntity.ok("Historial eliminado correctamente");
        } catch (Exception e) {
            e.printStackTrace(); // log en consola del backend
            return ResponseEntity.status(500)
                    .body("Error eliminando historial: " + e.getMessage());
        }
    }
}
