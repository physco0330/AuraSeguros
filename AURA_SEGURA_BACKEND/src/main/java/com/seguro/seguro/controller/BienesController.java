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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/bien")
public class BienesController {

    @Autowired
    private BienesService bienesService;

    @Autowired
    private HistorialService historialService;

    // Obtener todos los bienes
    @GetMapping("/all")
    public ResponseEntity<List<BienesEntity>> getAllBienes() {
        return ResponseEntity.ok(bienesService.getAllBienes());
    }

    // Obtener bienes por empresa
    @GetMapping("/empresa/{empresaId}")
    public ResponseEntity<List<BienesEntity>> getAllBienesByEmpresaId(@PathVariable Long empresaId) {
        return ResponseEntity.ok(bienesService.getAllBienesByEmpresaId(empresaId));
    }

    // Buscar bienes por artículo y riesgo
    @GetMapping("/buscarPorArticuloYRiesgo/{articulo}/{idriesgo}")
    public ResponseEntity<List<BienesEntity>> buscarPorArticuloYRiesgo(
            @PathVariable String articulo,
            @PathVariable String idriesgo) {
        return ResponseEntity.ok(bienesService.buscarlistaxfecha(articulo, idriesgo));
    }

    // Obtener bienes por código
    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<List<BienesEntity>> getBienesPorCodigo(@PathVariable String codigo) {
        return ResponseEntity.ok(bienesService.getBienesPorCodigo(codigo));
    }

    // Guardar bien
    @PostMapping("/save")
    public ResponseEntity<BienesEntity> saveBien(@RequestBody BienesEntity bien) {
        return new ResponseEntity<>(bienesService.saveBien(bien), HttpStatus.CREATED);
    }

    // Actualizar bien
    @PutMapping("/update")
    public ResponseEntity<GenericResponseDto> updateBien(@RequestBody BienesEntity bien) {
        bienesService.updateBien(bien);
        return ResponseEntity.ok(new GenericResponseDto(""));
    }

    // Eliminar bien por código
    @DeleteMapping("/deletePorCodigo/{codigo}")
    public ResponseEntity<Void> deleteBienPorCodigo(@PathVariable String codigo) {
        bienesService.deleteBienPorCodigo(codigo);
        return ResponseEntity.noContent().build();
    }

    // Historial de un bien por código
    @GetMapping("/historial/{codigo}")
    public ResponseEntity<List<HistorialEntity>> getHistorialPorCodigo(@PathVariable String codigo) {
        return ResponseEntity.ok(historialService.getHistorialPorCodigo(codigo));
    }

    // Historial donde adquirió seguro (filtra adquirio_seguro = true)
    @GetMapping("/historial/seguros/{codigo}")
    public ResponseEntity<List<HistorialEntity>> getHistorialSegurosPorCodigo(@PathVariable String codigo) {
        return ResponseEntity.ok(historialService.getHistorialPorCodigoYAdquirioSeguro(codigo, true));
    }

    // Historial filtrado por tipo de seguro
    @GetMapping("/historial/seguros/tipo/{codigo}/{tipo}")
    public ResponseEntity<List<HistorialEntity>> getHistorialPorTipoSeguro(
            @PathVariable String codigo,
            @PathVariable String tipo) {
        return ResponseEntity.ok(historialService.getHistorialPorCodigoYTipoSeguro(codigo, tipo));
    }

    // Buscar bienes por nombre de empresa
    @GetMapping("/buscarPorNombreEmpresa/{nombreEmpresa}")
    public ResponseEntity<List<BienesEntity>> buscarPorNombreEmpresa(@PathVariable String nombreEmpresa) {
        return ResponseEntity.ok(bienesService.buscarBienesPorNombreEmpresa(nombreEmpresa));
    }

    // Subir CSV
    @PostMapping("/upload-csv")
    public ResponseEntity<String> uploadCSV(@RequestParam("file") MultipartFile file,
                                            @RequestParam("idEmpresa") Long idEmpresa) {
        try {
            bienesService.processCSV(file, idEmpresa);
            return ResponseEntity.ok("Archivo CSV subido y procesado con éxito");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al procesar el archivo CSV: " + e.getMessage());
        }
    }
}
