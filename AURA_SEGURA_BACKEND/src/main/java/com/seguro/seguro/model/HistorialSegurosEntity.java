package com.seguro.seguro.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "historial_seguros")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistorialSegurosEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_historial")
    private Long idHistorial;

    @Column(name = "aseguradora", length = 255)
    private String aseguradora;

    @Column(name = "cambios", columnDefinition = "LONGTEXT")
    private String cambios;

    @Column(name = "codigo", length = 255)
    private String codigo;

    @Column(name = "descripcion", length = 255)
    private String descripcion;

    @Column(name = "estado_seguro", length = 255)
    private String estadoSeguro;

    @Column(name = "fecha_inicio_seguro")
    private LocalDateTime fechaInicioSeguro;

    @Column(name = "fecha_fin_seguro")
    private LocalDateTime fechaFinSeguro;

    @Column(name = "fecha_modificacion")
    private LocalDateTime fechaModificacion;

    @Column(name = "id_bien")
    private Long idBien;

    @Column(name = "numero_poliza", length = 255)
    private String numeroPoliza;

    @Column(name = "usuario", length = 255)
    private String usuario;

    @Column(name = "valor_asegurado")
    private Double valorAsegurado;

    @Column(name = "adquirio_seguro")
    private Boolean adquirioSeguro;
}
