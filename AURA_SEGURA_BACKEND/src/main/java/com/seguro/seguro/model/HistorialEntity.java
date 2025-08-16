// HistorialEntity.java
package com.seguro.seguro.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "historial") // Cambia si el nombre de la tabla es otro
public class HistorialEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_historial")
    private Long idHistorial;

    @Column(name = "id_bien")
    private Long idBien;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "fecha_modificacion")
    private Timestamp fechaModificacion;

    @Column(name = "usuario")
    private String usuario;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "cambios", columnDefinition = "json")
    private String cambios; // Cambios en formato JSON

    // --- Campos adicionales para historial de seguros ---
    @Column(name = "numero_poliza")
    private String numeroPoliza;

    @Column(name = "aseguradora")
    private String aseguradora;

    @Column(name = "fecha_inicio_seguro")
    private Timestamp fechaInicioSeguro;

    @Column(name = "fecha_fin_seguro")
    private Timestamp fechaFinSeguro;

    @Column(name = "valor_asegurado")
    private Double valorAsegurado;

    @Column(name = "estado_seguro")
    private String estadoSeguro; // Ejemplo: vigente, vencido, cancelado
}
