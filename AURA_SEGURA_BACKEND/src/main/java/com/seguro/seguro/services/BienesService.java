// BienesService.java
package com.seguro.seguro.services;

import com.seguro.seguro.model.BienesEntity;
import com.seguro.seguro.repository.BienesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BienesService implements BienesServiceImp {

    @Autowired
    private BienesRepository bienesRepository;

    @Override
    public List<BienesEntity> getAllBienes() {
        return bienesRepository.findAll();
    }

    @Override
    public BienesEntity getBienById(Long id) {
        return bienesRepository.findById(id).orElse(null);
    }

    @Override
    public List<BienesEntity> getBienesPorCodigo(String codigo) {
        return bienesRepository.findByCodigo(codigo);
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
    public List<BienesEntity> buscarlistaxfecha(String articulo, String idRiesgo) {
        return bienesRepository.listadefecha(articulo, idRiesgo);
    }
}
