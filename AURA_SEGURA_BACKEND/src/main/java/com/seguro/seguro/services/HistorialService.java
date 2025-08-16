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

    /** Obtiene todo el historial por código */
    public List<HistorialEntity> getHistorialPorCodigo(String codigo) {
        return historialRepository.findByCodigo(codigo);
    }

    /** Obtiene historial por ID de bien */
    public List<HistorialEntity> getHistorialPorIdBien(Long idBien) {
        return historialRepository.findByIdBien(idBien);
    }

    /** Obtiene historial por ID de empresa */
    public List<HistorialEntity> getHistorialPorIdEmpresa(Long idEmpresa) {
        return historialRepository.findByIdEmpresa(idEmpresa);
    }

    /** Obtiene historial por usuario */
    public List<HistorialEntity> getHistorialPorUsuario(String usuario) {
        return historialRepository.findByUsuario(usuario);
    }

    /** Obtiene historial filtrado por si adquirió seguro (true o false) */
    public List<HistorialEntity> getHistorialPorAdquisicionSeguro(Boolean adquirioSeguro) {
        return historialRepository.findByAdquirioSeguro(adquirioSeguro);
    }

    /** Obtiene historial filtrado por tipo de seguro */
    public List<HistorialEntity> getHistorialPorTipoSeguro(String tipoSeguro) {
        return historialRepository.findByTipoSeguro(tipoSeguro);
    }

    /** Obtiene historial filtrado por código y tipo de seguro */
    public List<HistorialEntity> getHistorialPorCodigoYTipoSeguro(String codigo, String tipoSeguro) {
        return historialRepository.findByCodigoAndTipoSeguro(codigo, tipoSeguro);
    }

    /** Obtiene historial de seguros (adquirió seguro = true) */
    public List<HistorialEntity> getHistorialSegurosPorCodigo(String codigo) {
        return historialRepository.findByCodigoAndAdquirioSeguro(codigo, true);
    }

    /** Obtiene historial filtrado por código y si adquirió seguro */
    public List<HistorialEntity> getHistorialPorCodigoYAdquirioSeguro(String codigo, boolean adquirioSeguro) {
        return historialRepository.findByCodigoAndAdquirioSeguro(codigo, adquirioSeguro);
    }
}
