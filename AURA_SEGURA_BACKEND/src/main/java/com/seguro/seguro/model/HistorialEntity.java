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


    @Column(name = "descripcion")  // Asegúrate de que esta columna exista en la base de datos
    private String descripcion;

    @Column(name = "cambios", columnDefinition = "json")
    private String cambios;  // Almacenar los cambios en formato JSON
}
