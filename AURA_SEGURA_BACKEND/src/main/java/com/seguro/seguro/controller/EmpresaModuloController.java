package com.seguro.seguro.controller;

import com.seguro.seguro.model.Empresa;
import com.seguro.seguro.model.EmpresaModulo;
import com.seguro.seguro.services.EmpresaModuloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EmpresaModuloController {

    private final EmpresaModuloService empresaModuloService;

    @Autowired
    public EmpresaModuloController(EmpresaModuloService empresaModuloService) {
        this.empresaModuloService = empresaModuloService;
    }

    // Endpoint para listar empresas por módulo
    @GetMapping("/modulos/{idModulo}/empresas")
    public ResponseEntity<List<Empresa>> listarEmpresasPorModulo(@PathVariable Long idModulo) {
        List<Empresa> empresas = empresaModuloService.listarEmpresasPorModulo(idModulo);
        if (empresas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(empresas);
    }

    // Nuevo Endpoint para guardar la relación entre empresa y módulo
    @PostMapping("/modulos/{idModulo}/empresas/{idEmpresa}")
    public ResponseEntity<EmpresaModulo> agregarEmpresaAModulo(
            @PathVariable Long idModulo,
            @PathVariable Long idEmpresa) {
        EmpresaModulo empresaModulo = empresaModuloService.guardarEmpresaModulo(idEmpresa, idModulo);
        return ResponseEntity.ok(empresaModulo);
    }
}
