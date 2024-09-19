package com.seguro.seguro.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.seguro.seguro.model.Empresa;
import com.seguro.seguro.repository.EmpresaRepository;

import java.util.List;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    // Crear una nueva empresa
    public Empresa crearEmpresa(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    // Obtener todas las empresas
    public List<Empresa> obtenerEmpresas() {
        return empresaRepository.findAll();
    }

    // Obtener una empresa por su ID
    public Empresa obtenerEmpresa(Long id) {
        return empresaRepository.findById(id).orElse(null);
    }
}
