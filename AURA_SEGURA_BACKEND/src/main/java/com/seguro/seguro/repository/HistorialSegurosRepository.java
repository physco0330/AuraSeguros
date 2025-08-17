package com.seguro.seguro.repository;

import com.seguro.seguro.model.HistorialSegurosEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistorialSegurosRepository extends JpaRepository<HistorialSegurosEntity, Long> {

    // Buscar historial por código
    List<HistorialSegurosEntity> findByCodigo(String codigo);

    // (Opcional) Buscar historial por id_bien
    List<HistorialSegurosEntity> findByIdBien(Long idBien);
}
