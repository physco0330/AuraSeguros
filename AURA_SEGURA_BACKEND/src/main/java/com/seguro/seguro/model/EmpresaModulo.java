package com.seguro.seguro.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "empresa_modulo")
public class EmpresaModulo {

    @EmbeddedId
    private EmpresaModuloId id;

    @ManyToOne
    @MapsId("idEmpresa")
    @JoinColumn(name = "id_empresa", nullable = false)
    private Empresa empresa;

    @ManyToOne
    @MapsId("idModulo")
    @JoinColumn(name = "id_modulo", nullable = false)
    private Modulo modulo;

    @Column(name = "fecha_asignacion", nullable = false)
    private LocalDateTime fechaAsignacion;

    // Constructor
    public EmpresaModulo() {}

    public EmpresaModulo(Empresa empresa, Modulo modulo) {
        if (empresa == null || modulo == null) {
            throw new IllegalArgumentException("La empresa o el módulo no pueden ser nulos");
        }
        this.empresa = empresa;
        this.modulo = modulo;
        this.id = new EmpresaModuloId(empresa.getId_empresa(), modulo.getId_modulo());
        this.fechaAsignacion = LocalDateTime.now(); // Aseguramos que la fecha de asignación esté siempre inicializada
    }

    // Getters y Setters
    public EmpresaModuloId getId() {
        return id;
    }

    public void setId(EmpresaModuloId id) {
        this.id = id;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    public Modulo getModulo() {
        return modulo;
    }

    public void setModulo(Modulo modulo) {
        this.modulo = modulo;
    }

    public LocalDateTime getFechaAsignacion() {
        return fechaAsignacion;
    }

    public void setFechaAsignacion(LocalDateTime fechaAsignacion) {
        this.fechaAsignacion = fechaAsignacion;
    }
}
