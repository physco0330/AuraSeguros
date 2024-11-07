package com.seguro.seguro.services;

import com.seguro.seguro.model.Empresa;
import com.seguro.seguro.model.EmpresaModulo;
import com.seguro.seguro.repository.EmpresaModuloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmpresaModuloService {

    private final EmpresaModuloRepository empresaModuloRepository;

    @Autowired
    public EmpresaModuloService(EmpresaModuloRepository empresaModuloRepository) {
        this.empresaModuloRepository = empresaModuloRepository;
    }

    public List<Empresa> listarEmpresasPorModulo(Long idModulo) {
        // Filtramos las empresas correspondientes al módulo dado
        List<EmpresaModulo> relaciones = empresaModuloRepository.findAll()
                .stream()
                .filter(empresaModulo -> empresaModulo.getModulo().getId_modulo().equals(idModulo))
                .collect(Collectors.toList());

        // Extraemos las empresas de las relaciones
        return relaciones.stream()
                .map(EmpresaModulo::getEmpresa)
                .collect(Collectors.toList());
    }
}
