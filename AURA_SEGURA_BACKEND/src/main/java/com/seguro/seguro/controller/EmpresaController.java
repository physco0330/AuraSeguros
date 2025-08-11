package com.seguro.seguro.controller;

import com.seguro.seguro.model.Empresa;
import com.seguro.seguro.services.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // Crear empresa con multipart/form-data
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> crearEmpresa(
            @RequestParam("nombre_empresa") String nombreEmpresa,
            @RequestParam("color_palette") String colorPalette,
            @RequestParam("nit_empresa") String nitEmpresa,
            @RequestParam("correo_empresa") String correoEmpresa,
            @RequestParam("contacto_empresa") String contactoEmpresa,
            @RequestParam("numero_poliza") String numeroPoliza,
            @RequestParam(value = "logo_empresa", required = false) MultipartFile logoEmpresa,
            @RequestParam("id_modulo") Long idModulo) {
        try {
            Empresa empresaCreada = empresaService.crearEmpresa(nombreEmpresa, colorPalette, nitEmpresa,
                    correoEmpresa, contactoEmpresa, numeroPoliza, logoEmpresa, idModulo);
            return new ResponseEntity<>(empresaCreada, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al crear empresa: " + e.getMessage());
        }
    }

    // Obtener todas las empresas
    @GetMapping
    public ResponseEntity<List<Empresa>> obtenerEmpresas() {
        List<Empresa> empresas = empresaService.obtenerEmpresas();
        return ResponseEntity.ok(empresas);
    }

    // Obtener empresa por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerEmpresa(@PathVariable Long id) {
        try {
            Empresa empresa = empresaService.obtenerEmpresa(id);
            return ResponseEntity.ok(empresa);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Empresa no encontrada con ID: " + id);
        }
    }

    // Obtener logo por nombre archivo
    @GetMapping("/logos/{fileName:.+}")
    public ResponseEntity<Resource> obtenerLogoEmpresa(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(fileName);
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Actualizar empresa
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarEmpresa(@PathVariable Long id, @RequestBody Empresa empresa) {
        try {
            empresa.setId_empresa(id);
            Empresa empresaActualizada = empresaService.actualizarEmpresa(empresa);
            return ResponseEntity.ok(empresaActualizada);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error al actualizar empresa: " + e.getMessage());
        }
    }

    // Eliminar empresa
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarEmpresa(@PathVariable Long id) {
        try {
            empresaService.eliminarEmpresa(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error al eliminar empresa: " + e.getMessage());
        }
    }
}
