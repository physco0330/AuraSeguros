// BienesEntity.java
package com.seguro.seguro.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BienesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_bien")
    private Long idBien;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "articulo_bienes")
    private String articuloBienes;

    @Column(name = "proceso_estaciones")
    private String procesoEstaciones;

    @Column(name = "cantidad")
    private int cantidad;

    @Column(name = "descripcion_articulo", length = 500)
    private String descripcionArticulo;

    @Column(name = "descripcion_movimiento")
    private String descripcionMovimiento;

    @Column(name = "estado")
    private String estado;

    @Column(name = "riesgo")
    private String riesgo;

    @Column(name = "fecha_ingreso")
    private String fechaIngreso;

    @Column(name = "fecha_modificacion")
    private String fechaModificacion;

    @Column(name = "vr_unitario_2023")
    private BigDecimal vrUnitario2023;

    @Column(name = "vr_asegurado")
    private BigDecimal vrAsegurado;

    @Column(name = "porcentaje_iva")
    private BigDecimal porcentajeIva;

    @Column(name = "iva_variable")
    private BigDecimal ivaVariable;

    @Column(name = "vr_asegurable")
    private BigDecimal vrAsegurable;

    @Column(name = "tasa_general")
    private BigDecimal tasaGeneral;

    @Column(name = "prima")
    private BigDecimal prima;

    @Column(name = "tasa_iva")
    private BigDecimal tasaIva;

    @Column(name = "prima_iva_anual")
    private BigDecimal primaIvaAnual;

    @Column(name = "prima_anual_total")
    private BigDecimal primaAnualTotal;

    @Column(name = "beneficiario_adicional")
    private String beneficiarioAdicional;

    @Column(name = "numero_endoso")
    private String numeroEndoso;

    @Column(name = "valor_endoso")
    private BigDecimal valorEndoso;

    @Column(name = "vigencia_endoso")
    private String vigenciaEndoso;

    @Column(name = "banco")
    private String banco;

    @Column(name = "nit_banco")
    private String nitBanco;

    // Nuevo campo agregado
    @Column(name = "nombre_empresa")
    private String nombreEmpresa;

    @Column(name = "id_empresa")
    private Long idEmpresa; //  campo para idEmpresa
}
