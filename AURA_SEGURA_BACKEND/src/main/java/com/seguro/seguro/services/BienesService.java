// BienesService.java
package com.seguro.seguro.services;

import com.seguro.seguro.model.BienesEntity;
import com.seguro.seguro.model.HistorialEntity;
import com.seguro.seguro.repository.BienesRepository;
import com.seguro.seguro.repository.HistorialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;
import java.util.List;

@Service
public class BienesService implements BienesServiceImp {

    @Autowired
    private BienesRepository bienesRepository;

    @Autowired
    private HistorialRepository historialRepository;


    @Override
    public List<BienesEntity> getAllBienesByEmpresaId(Long empresaId) {
        return bienesRepository.findByIdEmpresa(empresaId);
    }

    @Override
    public List<BienesEntity> getAllBienes() {
        return bienesRepository.findAll();
    }

    @Override
    public void updateBien(BienesEntity bien) {
        // Guardar el bien actualizado
        BienesEntity updatedBien = bienesRepository.save(bien);

        // Registrar el historial
      //  HistorialEntity historial = new HistorialEntity();
       // historial.setIdBien(updatedBien.getIdBien());
       // historial.setCodigo(updatedBien.getCodigo());
       // historial.setFechaModificacion(new Timestamp(System.currentTimeMillis()));
       // historial.setUsuario("Usuario Ejemplo"); // Aquí puedes usar el usuario real si está disponible

        // Crear un JSON que represente los cambios, si es necesario
        String cambiosJson = "{ \"descripcion\": \"Modificación realizada en el bien.\" }";
       // historial.setCambios(cambiosJson);

        // Guardar historial
       // historialRepository.save(historial);
    }

    @Override
    public BienesEntity getBienById(Long id) {
        return bienesRepository.findById(id).orElse(null);
    }

    @Override
    public List<BienesEntity> getBienesPorCodigo(String codigo) {
        return bienesRepository.findByCodigo(codigo); // Este método debe estar correctamente implementado en BienesRepository
    }

    @Override
    public BienesEntity saveBien(BienesEntity bien) {
        return bienesRepository.save(bien);
    }

    @Override
    public void deleteBien(Long id) {
        bienesRepository.deleteById(id);
    }

    @Override
    public void deleteBienPorCodigo(String codigo) {
        bienesRepository.deleteByCodigo(codigo);
    }

    @Override
    public List<BienesEntity> buscarlistaxfecha(String articulo, String idRiesgo) {
        return bienesRepository.listadefecha(articulo, idRiesgo);
    }

    // Nuevo método para buscar bienes por nombre de empresa
    @Override
    public List<BienesEntity> buscarBienesPorNombreEmpresa(String nombreEmpresa) {
        return bienesRepository.findByNombreEmpresa(nombreEmpresa);
    }
}
