package com.seguro.seguro.controller;

import com.seguro.seguro.model.HistorialSegurosEntity;
import com.seguro.seguro.services.HistorialSegurosService;
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
    public List<HistorialSegurosEntity> getHistorialByCodigo(@PathVariable String codigo) {
        return historialSegurosService.obtenerPorCodigo(codigo);
    }

    // Obtener historial por idBien
    @GetMapping("/bien/{idBien}")
    public List<HistorialSegurosEntity> getHistorialByIdBien(@PathVariable Long idBien) {
        return historialSegurosService.obtenerPorIdBien(idBien);
    }

    // Crear un nuevo historial
    @PostMapping
    public HistorialSegurosEntity crearHistorial(@RequestBody HistorialSegurosEntity historial) {
        return historialSegurosService.guardarHistorial(historial);
    }
}
