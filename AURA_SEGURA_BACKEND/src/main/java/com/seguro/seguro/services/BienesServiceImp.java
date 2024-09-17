// BienesServiceImp.java
package com.seguro.seguro.services;

import com.seguro.seguro.model.BienesEntity;
import java.util.List;

public interface BienesServiceImp {

    List<BienesEntity> getAllBienes();

    BienesEntity getBienById(Long id);

    List<BienesEntity> getBienesPorCodigo(String codigo);

    BienesEntity saveBien(BienesEntity bien);

    void deleteBien(Long id);

    List<BienesEntity> buscarlistaxfecha(String articulo, String idRiesgo);
}
