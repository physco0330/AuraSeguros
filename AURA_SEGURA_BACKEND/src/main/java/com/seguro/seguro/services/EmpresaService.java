package com.seguro.seguro.services;

import com.seguro.seguro.model.Empresa;
import com.seguro.seguro.model.EmpresaModulo;
import com.seguro.seguro.model.EmpresaModuloId;
import com.seguro.seguro.model.Modulo;
import com.seguro.seguro.repository.EmpresaRepository;
import com.seguro.seguro.repository.EmpresaModuloRepository;
import com.seguro.seguro.repository.ModuloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private EmpresaModuloRepository empresaModuloRepository;  // Repositorio para la tabla intermedia

    @Autowired
    private ModuloRepository moduloRepository;  // Asegúrate de tener un repositorio para Modulo

    // Cargamos la ruta de almacenamiento de imágenes desde el archivo application.properties
    @Value("${file.upload-dir}")
    private String uploadDir;

    // Método para crear una nueva empresa (con id_modulo)
    public Empresa crearEmpresa(String nombreEmpresa, String colorPalette,
                                String nitEmpresa, String correoEmpresa,
                                String contactoEmpresa, String numeroPoliza,
                                MultipartFile logoEmpresa, Long idModulo) {

        // Validación de entrada
        if (idModulo == null) {
            throw new IllegalArgumentException("El id del módulo no puede ser nulo");
        }

        Empresa empresa = new Empresa();
        empresa.setNombre_empresa(nombreEmpresa);
        empresa.setColor_palette(colorPalette);
        empresa.setNit_empresa(nitEmpresa);
        empresa.setCorreo_empresa(correoEmpresa);
        empresa.setContacto_empresa(contactoEmpresa);
        empresa.setNumero_poliza(numeroPoliza);
        empresa.setId_modulo(idModulo); // Asignar el id_modulo

        // Procesamiento del logo si existe
        if (logoEmpresa != null && !logoEmpresa.isEmpty()) {
            try {
                String fileName = System.currentTimeMillis() + "_" + logoEmpresa.getOriginalFilename();
                Path filePath = Paths.get(uploadDir, fileName);

                Files.createDirectories(filePath.getParent());
                Files.copy(logoEmpresa.getInputStream(), filePath);

                empresa.setLogo_empresa(fileName);
            } catch (IOException e) {
                throw new RuntimeException("Error al cargar el logo de la empresa", e);
            }
        }

        // Guardamos la empresa
        Empresa empresaGuardada = empresaRepository.save(empresa);

        // Asociamos la empresa con el módulo en la tabla intermedia
        Optional<Modulo> moduloOptional = moduloRepository.findById(idModulo);
        if (moduloOptional.isPresent()) {
            Modulo modulo = moduloOptional.get();

            // Crear la relación en la tabla intermedia
            EmpresaModuloId empresaModuloId = new EmpresaModuloId(empresaGuardada.getId_empresa(), modulo.getId_modulo());
            EmpresaModulo empresaModulo = new EmpresaModulo();
            empresaModulo.setId(empresaModuloId);
            empresaModulo.setEmpresa(empresaGuardada);
            empresaModulo.setModulo(modulo);
            empresaModulo.setFechaAsignacion(LocalDateTime.now()); // Fecha de asignación automática

            // Guardar la relación en la tabla intermedia
            empresaModuloRepository.save(empresaModulo);
        } else {
            throw new RuntimeException("Módulo no encontrado con el ID: " + idModulo);
        }

        return empresaGuardada;
    }

    // Método para obtener todas las empresas
    public List<Empresa> obtenerEmpresas() {
        return empresaRepository.findAll();
    }

    // Método para obtener una empresa por su ID
    public Empresa obtenerEmpresa(Long id) {
        return empresaRepository.findById(id).orElseThrow(() -> new RuntimeException("Empresa no encontrada con el ID: " + id));
    }

    // Método para eliminar una empresa por su ID
    public void eliminarEmpresa(Long id) {
        if (empresaRepository.existsById(id)) {
            empresaRepository.deleteById(id);
        } else {
            throw new RuntimeException("Empresa no encontrada con el ID: " + id);
        }
    }

    // Método para actualizar una empresa existente
    public Empresa actualizarEmpresa(Empresa empresa) {
        // Verifica si la empresa existe antes de actualizarla
        Optional<Empresa> empresaExistente = empresaRepository.findById(empresa.getId_empresa());

        if (empresaExistente.isPresent()) {
            Empresa empresaActualizada = empresaExistente.get();

            // Actualizamos los campos de la empresa
            empresaActualizada.setNombre_empresa(empresa.getNombre_empresa());
            empresaActualizada.setColor_palette(empresa.getColor_palette());
            empresaActualizada.setNit_empresa(empresa.getNit_empresa());
            empresaActualizada.setCorreo_empresa(empresa.getCorreo_empresa());
            empresaActualizada.setContacto_empresa(empresa.getContacto_empresa());
            empresaActualizada.setNumero_poliza(empresa.getNumero_poliza());
            empresaActualizada.setId_modulo(empresa.getId_modulo()); // Actualizar id_modulo

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
