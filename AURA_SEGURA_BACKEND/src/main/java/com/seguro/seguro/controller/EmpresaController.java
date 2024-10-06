package com.seguro.seguro.controller;

import com.seguro.seguro.model.Empresa;
import com.seguro.seguro.services.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
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

    // Método para crear una nueva empresa, acepta multipart/form-data
    @PostMapping(consumes = {"multipart/form-data"}) // Indica que el método acepta multipart/form-data
    public Empresa crearEmpresa(
            @RequestParam("nombre_empresa") String nombreEmpresa, // Nombre de la empresa
            @RequestParam("color_palette") String colorPalette, // Color de la paleta
            @RequestParam("nit_empresa") String nitEmpresa, // NIT de la empresa
            @RequestParam("correo_empresa") String correoEmpresa, // Correo de la empresa
            @RequestParam("contacto_empresa") String contactoEmpresa, // Contacto de la empresa
            @RequestParam("numero_poliza") String numeroPoliza, // Número de póliza
            @RequestParam(value = "logo_empresa", required = false) MultipartFile logoEmpresa) { // Archivo de logo (opcional)

        // Llama al servicio para procesar el archivo y guardar la información en la base de datos
        return empresaService.crearEmpresa(nombreEmpresa, colorPalette, nitEmpresa,
                correoEmpresa, contactoEmpresa, numeroPoliza, logoEmpresa);
    }

    // Método para obtener todas las empresas
    @GetMapping
    public List<Empresa> obtenerEmpresas() {
        return empresaService.obtenerEmpresas();
    }

    // Método para obtener una empresa por su ID
    @GetMapping("/{id}")
    public Empresa obtenerEmpresa(@PathVariable Long id) {
        return empresaService.obtenerEmpresa(id);
    }

    // Endpoint para obtener el logo de la empresa por su nombre
    @GetMapping("/logos/{fileName:.+}")
    public ResponseEntity<Resource> obtenerLogoEmpresa(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(fileName);
            Resource resource = new UrlResource(filePath.toUri());

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(null);  // Manejar el error en caso de que el archivo no exista
        }
    }

    // Endpoint para actualizar una empresa
    @PutMapping("/{id}")
    public ResponseEntity<Empresa> actualizarEmpresa(@PathVariable Long id, @RequestBody Empresa empresa) {
        empresa.setId_empresa(id);
        Empresa empresaActualizada = empresaService.actualizarEmpresa(empresa);
        return ResponseEntity.ok(empresaActualizada);
    }

    // Endpoint para eliminar una empresa
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEmpresa(@PathVariable Long id) {
        empresaService.eliminarEmpresa(id);
        return ResponseEntity.noContent().build();
    }
}
