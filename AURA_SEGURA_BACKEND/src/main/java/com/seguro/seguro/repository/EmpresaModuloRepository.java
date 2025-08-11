package com.seguro.seguro.repository;

import com.seguro.seguro.model.Empresa;
import com.seguro.seguro.model.EmpresaModulo;
import com.seguro.seguro.model.EmpresaModuloId;
import com.seguro.seguro.model.Modulo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface EmpresaModuloRepository extends JpaRepository<EmpresaModulo, EmpresaModuloId> {

    @Query("SELECT em.empresa FROM EmpresaModulo em WHERE em.modulo.id_modulo = :id_modulo")
    List<Empresa> findEmpresasByModuloId(@Param("id_modulo") Long id_modulo);

    @Query("SELECT em.modulo FROM EmpresaModulo em WHERE em.empresa.id_empresa = :id_empresa")
    List<Modulo> findModulosByEmpresaId(@Param("id_empresa") Long id_empresa);

    @Query("SELECT COUNT(em) > 0 FROM EmpresaModulo em WHERE em.empresa.id_empresa = :id_empresa AND em.modulo.id_modulo = :id_modulo")
    boolean existsByEmpresaIdAndModuloId(@Param("id_empresa") Long id_empresa, @Param("id_modulo") Long id_modulo);

    @Query("SELECT COUNT(em) FROM EmpresaModulo em WHERE em.modulo.id_modulo = :id_modulo")
    long countEmpresasByModuloId(@Param("id_modulo") Long id_modulo);

    // Método para eliminar todas las relaciones de una empresa en empresa_modulo
    @Modifying
    @Transactional
    @Query("DELETE FROM EmpresaModulo em WHERE em.empresa.id_empresa = :id_empresa")
    void deleteByEmpresaId(@Param("id_empresa") Long id_empresa);
}
