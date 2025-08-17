// HistorialRepository.java
package com.seguro.seguro.repository;

import com.seguro.seguro.model.HistorialEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HistorialRepository extends JpaRepository<HistorialEntity, Long> {
    List<HistorialEntity> findByCodigo(String codigo);
}
