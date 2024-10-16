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
        HistorialEntity historial = new HistorialEntity();
        historial.setIdBien(updatedBien.getIdBien());
        historial.setCodigo(updatedBien.getCodigo());
        historial.setFechaModificacion(new Timestamp(System.currentTimeMillis()));
        historial.setUsuario("Usuario Ejemplo"); // Puedes reemplazar esto con el usuario real si está disponible

        // Crear un JSON que represente los cambios
        String cambiosJson = "{ \"descripcion\": \"Modificación realizada en el bien.\" }";
        historial.setCambios(cambiosJson);

        // Guardar el historial en la base de datos
        historialRepository.save(historial);
    }

    @Override
    public BienesEntity getBienById(Long id) {
        return bienesRepository.findById(id).orElse(null);
    }

    @Override
    public List<BienesEntity> getBienesPorCodigo(String codigo) {
        return bienesRepository.findByCodigo(codigo); // Asegúrate de que este método esté implementado en BienesRepository
    }

    @Override
    public BienesEntity saveBien(BienesEntity bien) {
        // Guardar el bien en la base de datos
        BienesEntity savedBien = bienesRepository.save(bien);

        // Registrar el historial al guardar un nuevo bien
        HistorialEntity historial = new HistorialEntity();
        historial.setIdBien(savedBien.getIdBien());
        historial.setCodigo(savedBien.getCodigo());
        historial.setFechaModificacion(new Timestamp(System.currentTimeMillis()));
        historial.setUsuario("Usuario Ejemplo"); // Puedes reemplazar con el usuario real

        // Crear un JSON que represente la acción de creación
        String cambiosJson = "{ \"descripcion\": \"Creación del bien con ID de Empresa: " + savedBien.getIdEmpresa() + ".\" }";
        historial.setCambios(cambiosJson);

        // Guardar el historial
        historialRepository.save(historial);

        return savedBien;
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

    // Nuevo método para buscar bienes por el nombre de la empresa
    @Override
    public List<BienesEntity> buscarBienesPorNombreEmpresa(String nombreEmpresa) {
        return bienesRepository.findByNombreEmpresa(nombreEmpresa);
    }
}
