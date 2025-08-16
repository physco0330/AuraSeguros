// BienesRepository.java
package com.seguro.seguro.repository;

import com.seguro.seguro.model.BienesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

@Repository
public interface BienesRepository extends JpaRepository<BienesEntity, Long> {

 // Consulta personalizada para obtener bienes basados en artículo y riesgo
 @Query(value = "SELECT * FROM bienes_entity WHERE articulo_bienes = :articulo AND riesgo = :idRiesgo", nativeQuery = true)
 List<BienesEntity> listadefecha(@Param("articulo") String articulo, @Param("idRiesgo") String idRiesgo);

 // Buscar por código exacto
 List<BienesEntity> findByCodigo(String codigo);

 // Buscar por empresa
 List<BienesEntity> findByIdEmpresa(Long idEmpresa);

 // Buscar por nombre de empresa
 List<BienesEntity> findByNombreEmpresa(String nombreEmpresa);

 // Eliminar por código (marcado como @Transactional y @Modifying para operaciones DML)
 @Modifying
 @Transactional
 @Query("DELETE FROM BienesEntity b WHERE b.codigo = :codigo")
 void deleteByCodigo(@Param("codigo") String codigo);

 // Verificar si existe un bien por código antes de insertar (para evitar duplicados)
 boolean existsByCodigo(String codigo);

 // Obtener bienes con un código que coincida parcialmente (para búsquedas flexibles)
 List<BienesEntity> findByCodigoContainingIgnoreCase(String codigo);

}
