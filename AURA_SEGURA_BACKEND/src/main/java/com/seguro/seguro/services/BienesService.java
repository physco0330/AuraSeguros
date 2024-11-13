// BienesService.java
package com.seguro.seguro.services;

import com.seguro.seguro.model.BienesEntity;
import com.seguro.seguro.model.HistorialEntity;
import com.seguro.seguro.repository.BienesRepository;
import com.seguro.seguro.repository.HistorialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.math.BigDecimal; // Asegúrate de que esta línea esté presente
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class BienesService implements BienesServiceImp {

    @Autowired
    private BienesRepository bienesRepository;

    @Autowired
    private HistorialRepository historialRepository;

    @Override
    public List<BienesEntity> getAllBienesByEmpresaId(Long empresaId) {
        return bienesRepository.findByIdEmpresa(empresaId);
    }

    @Override
    public List<BienesEntity> getAllBienes() {
        return bienesRepository.findAll();
    }

    @Override
    public void updateBien(BienesEntity bien) {
        // Guardar el bien actualizado
        BienesEntity updatedBien = bienesRepository.save(bien);

        // Registrar el historial
        // HistorialEntity historial = new HistorialEntity();
        // historial.setIdBien(updatedBien.getIdBien());
        // historial.setCodigo(updatedBien.getCodigo());
        // historial.setFechaModificacion(new Timestamp(System.currentTimeMillis()));
        // historial.setUsuario("Usuario Ejemplo"); // Aquí puedes usar el usuario real si está disponible

        // Crear un JSON que represente los cambios, si es necesario
        String cambiosJson = "{ \"descripcion\": \"Modificación realizada en el bien.\" }";
        // historial.setCambios(cambiosJson);

        // Guardar historial
        // historialRepository.save(historial);
    }

    @Override
    public BienesEntity getBienById(Long id) {
        return bienesRepository.findById(id).orElse(null);
    }

    @Override
    public List<BienesEntity> getBienesPorCodigo(String codigo) {
        return bienesRepository.findByCodigo(codigo); // Este método debe estar correctamente implementado en BienesRepository
    }

    @Override
    public BienesEntity saveBien(BienesEntity bien) {
        return bienesRepository.save(bien);
    }

    @Override
    public void deleteBien(Long id) {
        bienesRepository.deleteById(id);
    }

    @Override
    public void deleteBienPorCodigo(String codigo) {
        bienesRepository.deleteByCodigo(codigo);
    }

    @Override
    public List<BienesEntity> buscarlistaxfecha(String articulo, String idRiesgo) {
        return bienesRepository.listadefecha(articulo, idRiesgo);
    }

    // Nuevo método para buscar bienes por nombre de empresa
    @Override
    public List<BienesEntity> buscarBienesPorNombreEmpresa(String nombreEmpresa) {
        return bienesRepository.findByNombreEmpresa(nombreEmpresa);
    }

    @Override
    public void processCSV(MultipartFile file, Long idEmpresa) throws Exception {
        List<BienesEntity> bienesList = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            boolean firstLine = true;

            while ((line = reader.readLine()) != null) {
                // Limpiar la línea de posibles espacios en blanco o saltos de línea
                line = line.trim();

                // Saltar la primera línea si es un encabezado
                if (firstLine) {
                    firstLine = false;
                    continue;
                }

                // Verificar si la línea está vacía o malformada
                if (line.isEmpty() || line.contains(",,") || line.trim().equals("")) {
                    System.out.println("Línea vacía o malformada: " + line); // Depuración
                    continue; // Salta esta iteración y pasa a la siguiente línea
                }

                // Dividir la línea en partes
                String[] data = line.split(",");

                // Verificar que la línea tenga el número esperado de columnas (27 en tu caso)
                if (data.length < 27) {
                    System.out.println("Error en la línea, número de columnas insuficiente: " + line); // Depuración
                    continue;
                }

                // Crear una nueva entidad BienesEntity y asignar los valores del CSV
                BienesEntity bien = new BienesEntity();
                try {
                    bien.setCodigo(data[1]);                         // Ajusta los índices según tu archivo CSV
                    bien.setArticuloBienes(data[2]);
                    bien.setProcesoEstaciones(data[3]);
                    bien.setCantidad("NA".equals(data[4]) ? null : safeParseInt(data[4]));  // Manejo de "NA" en cantidad
                    bien.setDescripcionArticulo(data[5]);
                    bien.setDescripcionMovimiento(data[6]);
                    bien.setEstado(data[7]);
                    bien.setRiesgo(data[8]);
                    bien.setFechaIngreso(data[9]);
                    bien.setFechaModificacion(data[10]);
                    bien.setVrUnitario2023("NA".equals(data[11]) ? null : safeParseBigDecimal(data[11])); // Manejar "NA" en valores numéricos
                    bien.setVrAsegurado("NA".equals(data[12]) ? null : safeParseBigDecimal(data[12]));
                    bien.setPorcentajeIva("NA".equals(data[13]) ? null : safeParseBigDecimal(data[13]));
                    bien.setIvaVariable("NA".equals(data[14]) ? null : safeParseBigDecimal(data[14]));
                    bien.setVrAsegurable("NA".equals(data[15]) ? null : safeParseBigDecimal(data[15]));
                    bien.setTasaGeneral("NA".equals(data[16]) ? null : safeParseBigDecimal(data[16]));
                    bien.setPrima("NA".equals(data[17]) ? null : safeParseBigDecimal(data[17]));
                    bien.setTasaIva("NA".equals(data[18]) ? null : safeParseBigDecimal(data[18]));
                    bien.setPrimaIvaAnual("NA".equals(data[19]) ? null : safeParseBigDecimal(data[19]));
                    bien.setPrimaAnualTotal("NA".equals(data[20]) ? null : safeParseBigDecimal(data[20]));
                    bien.setBeneficiarioAdicional(data[21]);
                    bien.setNumeroEndoso(data[22]);
                    bien.setValorEndoso("NA".equals(data[23]) ? null : safeParseBigDecimal(data[23]));
                    bien.setVigenciaEndoso(data[24]);
                    bien.setBanco(data[25]);
                    bien.setNitBanco(data[26]);

                    // Asignar el idEmpresa
                    bien.setIdEmpresa(idEmpresa); // Aquí asignas el idEmpresa al bien

                    bienesList.add(bien); // Agregar a la lista de bienes
                } catch (Exception e) {
                    System.out.println("Error al procesar la línea: " + line + " - " + e.getMessage());
                    continue; // O lanzar un error si prefieres detener el proceso
                }
            }

            // Verificar si la lista no está vacía antes de guardar
            if (!bienesList.isEmpty()) {
                System.out.println("Cantidad de bienes a guardar: " + bienesList.size());
                bienesRepository.saveAll(bienesList);
            }

        } catch (Exception e) {
            throw new Exception("Error al procesar el archivo CSV: " + e.getMessage(), e);
        }
    }

    // Funciones auxiliares para manejar la conversión de datos numéricos de forma segura
    private Integer safeParseInt(String value) {
        try {
            return "NA".equals(value) ? null : Integer.parseInt(value);
        } catch (NumberFormatException e) {
            return null; // Retorna null si el valor no es numérico
        }
    }

    private BigDecimal safeParseBigDecimal(String value) {
        try {
            return "NA".equals(value) ? null : new BigDecimal(value);
        } catch (NumberFormatException e) {
            return null; // Retorna null si el valor no es numérico
        }
    }
}