package com.seguro.seguro.controller;

import com.seguro.seguro.model.Empresa;
import com.seguro.seguro.services.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    // Método para crear una nueva empresa, acepta multipart/form-data
    @PostMapping(consumes = {"multipart/form-data"}) // Indica que el método acepta multipart/form-data
    public Empresa crearEmpresa(
            @RequestParam("nombre_empresa") String nombreEmpresa, // Nombre de la empresa
            @RequestParam("nombre_tabla") String nombreTabla, // Nombre de la tabla
            @RequestParam("color_palette") String colorPalette, // Color de la paleta
            @RequestParam(value = "logo_empresa", required = false) MultipartFile logoEmpresa) { // Archivo de logo (opcional)

        // Llama al servicio para procesar el archivo y guardar la información en la base de datos
        return empresaService.crearEmpresa(nombreEmpresa, nombreTabla, colorPalette, logoEmpresa);
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
}
