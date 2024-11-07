package com.seguro.seguro.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class EmpresaModuloId implements Serializable {

    private Long idEmpresa;
    private Long idModulo;

    public EmpresaModuloId() {}

    public EmpresaModuloId(Long idEmpresa, Long idModulo) {
        this.idEmpresa = idEmpresa;
        this.idModulo = idModulo;
    }

    // Getters, setters, equals y hashCode
    public Long getIdEmpresa() {
        return idEmpresa;
    }

    public void setIdEmpresa(Long idEmpresa) {
        this.idEmpresa = idEmpresa;
    }

    public Long getIdModulo() {
        return idModulo;
    }

    public void setIdModulo(Long idModulo) {
        this.idModulo = idModulo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EmpresaModuloId that = (EmpresaModuloId) o;
        return Objects.equals(idEmpresa, that.idEmpresa) && Objects.equals(idModulo, that.idModulo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idEmpresa, idModulo);
    }
}
