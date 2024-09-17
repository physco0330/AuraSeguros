// BienesRepository.java
package com.seguro.seguro.repository;

import com.seguro.seguro.model.BienesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BienesRepository extends JpaRepository<BienesEntity, Long> {

 // Consulta personalizada para obtener bienes basados en artículo y riesgo
 @Query(value = "SELECT * FROM bienes_entity WHERE articulo_bienes = :articulo AND riesgo = :idriesgo", nativeQuery = true)
 List<BienesEntity> listadefecha(@Param("articulo") String articulo, @Param("idriesgo") String idRiesgo);

 // Método para encontrar bienes por código
 List<BienesEntity> findByCodigo(String codigo);
}
