package com.seguro.seguro.controller;

import com.seguro.seguro.dto.GenericResponseDto;
import com.seguro.seguro.model.BienesEntity;
import com.seguro.seguro.model.HistorialEntity;
import com.seguro.seguro.services.BienesService;
import com.seguro.seguro.services.HistorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bien")
public class BienesController {

    @Autowired
    private BienesService bienesService;

    @Autowired
    private HistorialService historialService;

    // Endpoint para obtener todos los bienes
    @GetMapping("/all")
    public ResponseEntity<List<BienesEntity>> getAllBienes() {
        List<BienesEntity> bienes = bienesService.getAllBienes();
        return new ResponseEntity<>(bienes, HttpStatus.OK);
    }

    // Endpoint para buscar bienes por artículo y riesgo
    @GetMapping("/buscarPorArticuloYRiesgo/{articulo}/{idriesgo}")
    public ResponseEntity<List<BienesEntity>> buscarPorArticuloYRiesgo(
            @PathVariable String articulo,
            @PathVariable String idriesgo) {
        List<BienesEntity> bienes = bienesService.buscarlistaxfecha(articulo, idriesgo);
        return new ResponseEntity<>(bienes, HttpStatus.OK);
    }

    // Endpoint para obtener bienes por código específico
    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<List<BienesEntity>> getBienesPorCodigo(@PathVariable String codigo) {
        List<BienesEntity> bienes = bienesService.getBienesPorCodigo(codigo);
        return new ResponseEntity<>(bienes, HttpStatus.OK);
    }

    // Endpoint para guardar un bien
    @PostMapping("/save")
    public ResponseEntity<BienesEntity> saveBien(@RequestBody BienesEntity bien) {
        BienesEntity savedBien = bienesService.saveBien(bien);
        return new ResponseEntity<>(savedBien, HttpStatus.CREATED);
    }

    // Endpoint para actualizar un bien
    @PutMapping("/update")
    public ResponseEntity<GenericResponseDto> updateBien(@RequestBody BienesEntity bien) {
        bienesService.updateBien(bien);
        GenericResponseDto genericResponseDto = new GenericResponseDto("Update successfully");
        return new ResponseEntity<>(genericResponseDto, HttpStatus.OK);
    }

    // Endpoint para eliminar bienes por código
    @DeleteMapping("/deletePorCodigo/{codigo}")
    public ResponseEntity<Void> deleteBienPorCodigo(@PathVariable String codigo) {
        bienesService.deleteBienPorCodigo(codigo);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Endpoint para obtener el historial de un bien por su código
    @GetMapping("/historial/{codigo}")
    public ResponseEntity<List<HistorialEntity>> getHistorialPorCodigo(@PathVariable String codigo) {
        List<HistorialEntity> historial = historialService.getHistorialPorCodigo(codigo);
        return new ResponseEntity<>(historial, HttpStatus.OK);
    }
}
