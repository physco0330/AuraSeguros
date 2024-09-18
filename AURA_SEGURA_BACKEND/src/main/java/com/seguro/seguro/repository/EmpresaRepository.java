package com.seguro.seguro.repository;

import com.seguro.seguro.model.Empresa; // Importa la entidad Empresa
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    // Puedes agregar métodos personalizados si es necesario
}
