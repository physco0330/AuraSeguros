// HistorialService.java
package com.seguro.seguro.services;

import com.seguro.seguro.model.HistorialEntity;
import com.seguro.seguro.repository.HistorialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistorialService {

    @Autowired
    private HistorialRepository historialRepository;

    public List<HistorialEntity> getHistorialPorCodigo(String codigo) {
        return historialRepository.findByCodigo(codigo);
    }
}
