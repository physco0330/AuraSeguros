package com.seguro.seguro.services;

import com.seguro.seguro.model.Empresa;
import com.seguro.seguro.model.EmpresaModulo;
import com.seguro.seguro.model.Modulo;
import com.seguro.seguro.repository.EmpresaModuloRepository;
import com.seguro.seguro.repository.EmpresaRepository;
import com.seguro.seguro.repository.ModuloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EmpresaModuloService {

    private final EmpresaModuloRepository empresaModuloRepository;
    private final EmpresaRepository empresaRepository;
    private final ModuloRepository moduloRepository;

    @Autowired
    public EmpresaModuloService(EmpresaModuloRepository empresaModuloRepository,
                                EmpresaRepository empresaRepository,
                                ModuloRepository moduloRepository) {
        this.empresaModuloRepository = empresaModuloRepository;
        this.empresaRepository = empresaRepository;
        this.moduloRepository = moduloRepository;
    }

    // Método para listar empresas por módulo
    public List<Empresa> listarEmpresasPorModulo(Long idModulo) {
        return empresaModuloRepository.findEmpresasByModuloId(idModulo);
    }

    // Método para guardar una nueva relación entre empresa y módulo
    public EmpresaModulo guardarEmpresaModulo(Long idEmpresa, Long idModulo) {
        Empresa empresa = empresaRepository.findById(idEmpresa).orElseThrow(() ->
                new IllegalArgumentException("Empresa no encontrada con ID: " + idEmpresa));
        Modulo modulo = moduloRepository.findById(idModulo).orElseThrow(() ->
                new IllegalArgumentException("Módulo no encontrado con ID: " + idModulo));

        EmpresaModulo empresaModulo = new EmpresaModulo();
        empresaModulo.setEmpresa(empresa);
        empresaModulo.setModulo(modulo);
        empresaModulo.setFechaAsignacion(LocalDateTime.now());

        return empresaModuloRepository.save(empresaModulo);
    }
}
