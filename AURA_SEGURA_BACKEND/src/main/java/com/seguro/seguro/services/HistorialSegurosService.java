package com.seguro.seguro.services;

import com.seguro.seguro.model.HistorialSegurosEntity;
import com.seguro.seguro.repository.HistorialSegurosRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistorialSegurosService {

    private final HistorialSegurosRepository historialSegurosRepository;

    public HistorialSegurosService(HistorialSegurosRepository historialSegurosRepository) {
        this.historialSegurosRepository = historialSegurosRepository;
    }

    public List<HistorialSegurosEntity> obtenerPorCodigo(String codigo) {
        return historialSegurosRepository.findByCodigo(codigo);
    }

    public List<HistorialSegurosEntity> obtenerPorIdBien(Long idBien) {
        return historialSegurosRepository.findByIdBien(idBien);
    }

    public HistorialSegurosEntity guardarHistorial(HistorialSegurosEntity historial) {
        return historialSegurosRepository.save(historial);
    }

    public HistorialSegurosEntity actualizarHistorial(Long id, HistorialSegurosEntity historial) {
        return historialSegurosRepository.findById(id)
                .map(h -> {
                    h.setFechaModificacion(historial.getFechaModificacion());
                    h.setUsuario(historial.getUsuario());
                    h.setDescripcion(historial.getDescripcion());
                    h.setFechaInicioSeguro(historial.getFechaInicioSeguro());
                    h.setFechaFinSeguro(historial.getFechaFinSeguro());
                    h.setEstadoSeguro(historial.getEstadoSeguro());
                    h.setCodigo(historial.getCodigo());
                    h.setIdBien(historial.getIdBien());
                    return historialSegurosRepository.save(h);
                })
                .orElseThrow(() -> new RuntimeException("Historial no encontrado con id: " + id));
    }

    public void eliminarHistorial(Long id) {
        if (!historialSegurosRepository.existsById(id)) {
            throw new RuntimeException("Historial no encontrado con id: " + id);
        }
        historialSegurosRepository.deleteById(id);
    }
}
