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
                bien.setCodigo(data[0]);                         // Ajusta los índices según tu archivo CSV
                bien.setArticuloBienes(data[1]);
                bien.setProcesoEstaciones(data[2]);
                bien.setCantidad(Integer.parseInt(data[3]));    // Asegúrate de que el índice sea correcto
                bien.setDescripcionArticulo(data[4]);
                bien.setDescripcionMovimiento(data[5]);
                bien.setEstado(data[6]);
                bien.setRiesgo(data[7]);
                bien.setFechaIngreso(data[8]);
                bien.setFechaModificacion(data[9]);
                bien.setVrUnitario2023(new BigDecimal(data[10])); // Asegúrate de que el índice sea correcto
                bien.setVrAsegurado(new BigDecimal(data[11]));
                bien.setPorcentajeIva(new BigDecimal(data[12]));
                bien.setIvaVariable(new BigDecimal(data[13]));
                bien.setVrAsegurable(new BigDecimal(data[14]));
                bien.setTasaGeneral(new BigDecimal(data[15]));
                bien.setPrima(new BigDecimal(data[16]));
                bien.setTasaIva(new BigDecimal(data[17]));
                bien.setPrimaIvaAnual(new BigDecimal(data[18]));
                bien.setPrimaAnualTotal(new BigDecimal(data[19]));
                bien.setBeneficiarioAdicional(data[20]);
                bien.setNumeroEndoso(data[21]);
                bien.setValorEndoso(new BigDecimal(data[22]));
                bien.setVigenciaEndoso(data[23]);
                bien.setBanco(data[24]);
                bien.setNitBanco(data[25]);
                bien.setIdEmpresa(Long.parseLong(data[26]));     // Asegúrate de que el índice sea correcto

                bienesList.add(bien);
                }

                // Guardar todos los bienes en la base de datos
            bienesRepository.saveAll(bienesList);
        } catch (Exception e) {
            throw new Exception("Error al procesar el archivo CSV: " + e.getMessage());
        }
    }
}
