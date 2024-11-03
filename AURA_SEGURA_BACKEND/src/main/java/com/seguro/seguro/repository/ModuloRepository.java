package com.seguro.seguro.repository;

import com.seguro.seguro.model.Modulo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModuloRepository extends JpaRepository<Modulo, Long> {
    // Puedes añadir métodos de consulta adicionales aquí si es necesario
}
