package com.seguro.seguro.services;

import com.seguro.seguro.model.HistorialSegurosEntity;
import com.seguro.seguro.repository.HistorialSegurosRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistorialSegurosService {

    private final HistorialSegurosRepository historialSegurosRepository;

    // Inyección de dependencias por constructor
    public HistorialSegurosService(HistorialSegurosRepository historialSegurosRepository) {
        this.historialSegurosRepository = historialSegurosRepository;
    }

    // Buscar historial por código
    public List<HistorialSegurosEntity> obtenerPorCodigo(String codigo) {
        return historialSegurosRepository.findByCodigo(codigo);
    }

    // Buscar historial por id_bien
    public List<HistorialSegurosEntity> obtenerPorIdBien(Long idBien) {
        return historialSegurosRepository.findByIdBien(idBien);
    }

    // Guardar un nuevo historial
    public HistorialSegurosEntity guardarHistorial(HistorialSegurosEntity historial) {
        return historialSegurosRepository.save(historial);
    }
}
