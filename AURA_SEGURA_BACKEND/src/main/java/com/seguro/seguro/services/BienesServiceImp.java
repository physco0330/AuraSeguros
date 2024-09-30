// BienesServiceImp.java
package com.seguro.seguro.services;

import com.seguro.seguro.model.BienesEntity;
import java.util.List;

public interface BienesServiceImp {

    List<BienesEntity> getAllBienes();

    void updateBien(BienesEntity bien);

    BienesEntity getBienById(Long id);

    List<BienesEntity> getBienesPorCodigo(String codigo);

    BienesEntity saveBien(BienesEntity bien);

    void deleteBien(Long id);

    // Método para eliminar bienes por código
    void deleteBienPorCodigo(String codigo);

    // Método para buscar bienes por artículo y riesgo
    List<BienesEntity> buscarlistaxfecha(String articulo, String idRiesgo);

    // Nuevo método para obtener bienes por empresa
    List<BienesEntity> getBienesPorEmpresa(Long idEmpresa);  // <--- Aquí lo agregamos
}
