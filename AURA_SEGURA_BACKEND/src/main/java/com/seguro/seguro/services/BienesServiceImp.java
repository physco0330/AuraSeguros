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

    List<BienesEntity> buscarBienesPorNombreEmpresa(String nombreEmpresa);

    void deleteBien(Long id);
    // Agrega este método
    void deleteBienPorCodigo(String codigo);
    List<BienesEntity> buscarlistaxfecha(String articulo, String idRiesgo);
}
