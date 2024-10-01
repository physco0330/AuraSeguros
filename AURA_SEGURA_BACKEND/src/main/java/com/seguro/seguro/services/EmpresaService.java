package com.seguro.seguro.services;

import com.seguro.seguro.model.Empresa;
import com.seguro.seguro.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    // Cargamos la ruta de almacenamiento de imágenes desde el archivo application.properties
    @Value("${file.upload-dir}")
    private String uploadDir;

    // Método para crear una nueva empresa
    public Empresa crearEmpresa(String nombreEmpresa, String nombreTabla, String colorPalette,
                                String nitEmpresa, String correoEmpresa, String contactoEmpresa,
                                String numeroPoliza, MultipartFile logoEmpresa) {
        Empresa empresa = new Empresa();
        empresa.setNombre_empresa(nombreEmpresa);
        empresa.setNombre_tabla(nombreTabla);
        empresa.setColor_palette(colorPalette);
        empresa.setNit_empresa(nitEmpresa);
        empresa.setCorreo_empresa(correoEmpresa);
        empresa.setContacto_empresa(contactoEmpresa);
        empresa.setNumero_poliza(numeroPoliza);

        if (logoEmpresa != null && !logoEmpresa.isEmpty()) {
            try {
                String fileName = System.currentTimeMillis() + "_" + logoEmpresa.getOriginalFilename();
                Path filePath = Paths.get(uploadDir, fileName);

                Files.createDirectories(filePath.getParent());
                Files.copy(logoEmpresa.getInputStream(), filePath);

                empresa.setLogo_empresa(fileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return empresaRepository.save(empresa);
    }

    // Método para obtener todas las empresas
    public List<Empresa> obtenerEmpresas() {
        return empresaRepository.findAll();
    }

    // Método para obtener una empresa por su ID
    public Empresa obtenerEmpresa(Long id) {
        return empresaRepository.findById(id).orElse(null);
    }

    // Método para eliminar una empresa por su ID
    public void eliminarEmpresa(Long id) {
        if (empresaRepository.existsById(id)) {
            empresaRepository.deleteById(id);
        } else {
            throw new RuntimeException("Empresa no encontrada");
        }
    }

    // Nuevo método para actualizar una empresa existente
    public Empresa actualizarEmpresa(Empresa empresa) {
        // Verifica si la empresa existe antes de actualizarla
        Optional<Empresa> empresaExistente = empresaRepository.findById(empresa.getId_empresa());

        if (empresaExistente.isPresent()) {
            Empresa empresaActualizada = empresaExistente.get();

            // Actualizamos los campos de la empresa
            empresaActualizada.setNombre_empresa(empresa.getNombre_empresa());
            empresaActualizada.setNombre_tabla(empresa.getNombre_tabla());
            empresaActualizada.setColor_palette(empresa.getColor_palette());
            empresaActualizada.setNit_empresa(empresa.getNit_empresa());
            empresaActualizada.setCorreo_empresa(empresa.getCorreo_empresa());
            empresaActualizada.setContacto_empresa(empresa.getContacto_empresa());
            empresaActualizada.setNumero_poliza(empresa.getNumero_poliza());

            // Si hay un logo, actualizarlo
            if (empresa.getLogo_empresa() != null && !empresa.getLogo_empresa().isEmpty()) {
                empresaActualizada.setLogo_empresa(empresa.getLogo_empresa());
            }

            // Guardar la empresa actualizada
            return empresaRepository.save(empresaActualizada);
        } else {
            throw new RuntimeException("Empresa no encontrada con el ID: " + empresa.getId_empresa());
        }
    }
}
