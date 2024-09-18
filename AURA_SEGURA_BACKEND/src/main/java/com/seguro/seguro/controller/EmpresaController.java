package com.seguro.seguro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.seguro.seguro.model.Empresa;
import com.seguro.seguro.service.EmpresaService;

import java.util.List;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    // Crear una nueva empresa con datos y archivo
    @PostMapping(consumes = {"multipart/form-data"})
    public Empresa crearEmpresa(
            @RequestParam("nombre_empresa") String nombreEmpresa,
            @RequestParam("nombre_tabla") String nombreTabla,
            @RequestParam("color_palette") String colorPalette,
            @RequestParam("logo_empresa") MultipartFile logoEmpresa) {

        // Aquí puedes procesar el archivo, guardarlo si es necesario

        // Crear el objeto Empresa
        Empresa nuevaEmpresa = new Empresa();
        nuevaEmpresa.setNombreEmpresa(nombreEmpresa);
        nuevaEmpresa.setNombreTabla(nombreTabla);
        nuevaEmpresa.setColorPalette(colorPalette);

        // Procesa el archivo logoEmpresa aquí si es necesario

        // Guardar la empresa usando el servicio
        return empresaService.crearEmpresa(nuevaEmpresa);
    }

    // Obtener todas las empresas
    @GetMapping
    public List<Empresa> obtenerEmpresas() {
        return empresaService.obtenerEmpresas();
    }

    // Obtener una empresa por su ID
    @GetMapping("/{id}")
    public Empresa obtenerEmpresa(@PathVariable Long id) {
        return empresaService.obtenerEmpresa(id);
    }
}
