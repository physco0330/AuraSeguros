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

    // Método para procesar el archivo CSV y almacenar bienes en la base de datos
    @Override
    public void processCSV(MultipartFile file) throws Exception {
        List<BienesEntity> bienesList = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            boolean firstLine = true;

            while ((line = reader.readLine()) != null) {
                // Saltar la primera línea si es un encabezado
                if (firstLine) {
                    firstLine = false;
                    continue;
                }

                String[] data = line.split(",");

                // Crear una nueva entidad BienesEntity y asignar los valores del CSV
                BienesEntity bien = new BienesEntity();
                bien.setCodigo(data[1]);                         // Ajusta los índices según tu archivo CSV
                bien.setArticuloBienes(data[2]);
                bien.setProcesoEstaciones(data[3]);
                bien.setCantidad(Integer.parseInt(data[4]));    // Asegúrate de que el índice sea correcto
                bien.setDescripcionArticulo(data[5]);
                bien.setDescripcionMovimiento(data[6]);
                bien.setEstado(data[7]);
                bien.setRiesgo(data[8]);
                bien.setFechaIngreso(data[9]);
                bien.setFechaModificacion(data[10]);
                bien.setVrUnitario2023(new BigDecimal(data[11])); // Asegúrate de que el índice sea correcto
                bien.setVrAsegurado(new BigDecimal(data[12]));
                bien.setPorcentajeIva(new BigDecimal(data[13]));
                bien.setIvaVariable(new BigDecimal(data[14]));
                bien.setVrAsegurable(new BigDecimal(data[15]));
                bien.setTasaGeneral(new BigDecimal(data[16]));
                bien.setPrima(new BigDecimal(data[17]));
                bien.setTasaIva(new BigDecimal(data[18]));
                bien.setPrimaIvaAnual(new BigDecimal(data[19]));
                bien.setPrimaAnualTotal(new BigDecimal(data[20]));
                bien.setBeneficiarioAdicional(data[21]);
                bien.setNumeroEndoso(data[22]);
                bien.setValorEndoso(new BigDecimal(data[23]));
                bien.setVigenciaEndoso(data[24]);
                bien.setBanco(data[25]);
                bien.setNitBanco(data[26]);
                bien.setIdEmpresa(Long.parseLong(data[27]));     // Asegúrate de que el índice sea correcto

                bienesList.add(bien);
                }

                // Guardar todos los bienes en la base de datos
            bienesRepository.saveAll(bienesList);
        } catch (Exception e) {
            throw new Exception("Error al procesar el archivo CSV: " + e.getMessage());
        }
    }
}
