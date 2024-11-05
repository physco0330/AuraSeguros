package com.seguro.seguro.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_empresa;

    @Column(nullable = false)
    private String nombre_empresa;

    private String logo_empresa;

    private String color_palette;

    // Nuevos campos
    @Column(nullable = false)
    private String nit_empresa;

    @Column(nullable = false)
    private String correo_empresa;

    @Column(nullable = false)
    private String contacto_empresa;

    @Column(nullable = false)
    private String numero_poliza;

    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    // Relación con la entidad Modulo
    @ManyToOne
    @JoinColumn(name = "id_modulo", referencedColumnName = "id_modulo", insertable = false, updatable = false)
    private Modulo modulo;

    // Nuevo campo para almacenar el ID del módulo
    @Column(name = "id_modulo")
    private Long id_modulo; // Agregado

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        fechaActualizacion = LocalDateTime.now();
    }

    // Getters y Setters
    public Long getId_empresa() {
        return id_empresa;
    }

    public void setId_empresa(Long id_empresa) {
        this.id_empresa = id_empresa;
    }

    public String getNombre_empresa() {
        return nombre_empresa;
    }

    public void setNombre_empresa(String nombre_empresa) {
        this.nombre_empresa = nombre_empresa;
    }

    public String getLogo_empresa() {
        return logo_empresa;
    }

    public void setLogo_empresa(String logo_empresa) {
        this.logo_empresa = logo_empresa;
    }

    public String getColor_palette() {
        return color_palette;
    }

    public void setColor_palette(String color_palette) {
        this.color_palette = color_palette;
    }

    public String getNit_empresa() {
        return nit_empresa;
    }

    public void setNit_empresa(String nit_empresa) {
        this.nit_empresa = nit_empresa;
    }

    public String getCorreo_empresa() {
        return correo_empresa;
    }

    public void setCorreo_empresa(String correo_empresa) {
        this.correo_empresa = correo_empresa;
    }

    public String getContacto_empresa() {
        return contacto_empresa;
    }

    public void setContacto_empresa(String contacto_empresa) {
        this.contacto_empresa = contacto_empresa;
    }

    public String getNumero_poliza() {
        return numero_poliza;
    }

    public void setNumero_poliza(String numero_poliza) {
        this.numero_poliza = numero_poliza;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDateTime getFechaActualizacion() {
        return fechaActualizacion;
    }

    public void setFechaActualizacion(LocalDateTime fechaActualizacion) {
        this.fechaActualizacion = fechaActualizacion;
    }

    public Modulo getModulo() {
        return modulo;
    }

    public void setModulo(Modulo modulo) {
        this.modulo = modulo;
        if (modulo != null) {
            this.id_modulo = modulo.getId_modulo(); // Establece el id_modulo cuando se establece el módulo
        }
    }

    public Long getId_modulo() {
        return id_modulo;
    }

    public void setId_modulo(Long id_modulo) {
        this.id_modulo = id_modulo;
    }
}
