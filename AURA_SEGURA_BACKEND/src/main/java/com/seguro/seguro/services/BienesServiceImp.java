// BienesServiceImp.java
package com.seguro.seguro.services;

import com.seguro.seguro.model.BienesEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BienesServiceImp {

    List<BienesEntity> getAllBienes();
    List<BienesEntity> getAllBienesByEmpresaId(Long empresaId);

    void updateBien(BienesEntity bien);

    BienesEntity getBienById(Long id);

    List<BienesEntity> getBienesPorCodigo(String codigo);

    BienesEntity saveBien(BienesEntity bien);

    List<BienesEntity> buscarBienesPorNombreEmpresa(String nombreEmpresa);

    void deleteBien(Long id);

    // Método para eliminar bienes por código
    void deleteBienPorCodigo(String codigo);

    List<BienesEntity> buscarlistaxfecha(String articulo, String idRiesgo);

    // Nuevo método para procesar un archivo CSV
    void processCSV(MultipartFile file, Long idEmpresa) throws Exception;
}
