package com.seguro.seguro.repository;

import com.seguro.seguro.model.HistorialEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HistorialRepository extends JpaRepository<HistorialEntity, Long> {

    // Buscar historial por código
    List<HistorialEntity> findByCodigo(String codigo);

    // Buscar historial por id_bien
    List<HistorialEntity> findByIdBien(Long idBien);

    // Buscar historial por id_empresa
    List<HistorialEntity> findByIdEmpresa(Long idEmpresa);

    // Buscar historial por usuario
    List<HistorialEntity> findByUsuario(String usuario);

    // Buscar historial por si adquirió seguro (true/false)
    List<HistorialEntity> findByAdquirioSeguro(Boolean adquirioSeguro);

    // Buscar historial por tipo de seguro
    List<HistorialEntity> findByTipoSeguro(String tipoSeguro);

    // Buscar historial por código y tipo de seguro
    List<HistorialEntity> findByCodigoAndTipoSeguro(String codigo, String tipoSeguro);

    // Buscar historial por código y si adquirió seguro
    List<HistorialEntity> findByCodigoAndAdquirioSeguro(String codigo, Boolean adquirioSeguro);
}
