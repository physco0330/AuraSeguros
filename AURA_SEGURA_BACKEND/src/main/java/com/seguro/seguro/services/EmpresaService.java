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
import org.springframework.transaction.annotation.Transactional;
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
    private EmpresaModuloRepository empresaModuloRepository;

    @Autowired
    private ModuloRepository moduloRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public Empresa crearEmpresa(String nombreEmpresa, String colorPalette,
                                String nitEmpresa, String correoEmpresa,
                                String contactoEmpresa, String numeroPoliza,
                                MultipartFile logoEmpresa, Long idModulo) {

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
        empresa.setId_modulo(idModulo);

        if (logoEmpresa != null && !logoEmpresa.isEmpty()) {
            try {
                String fileName = System.currentTimeMillis() + "_" + logoEmpresa.getOriginalFilename();
                Path filePath = Paths.get(uploadDir).resolve(fileName);
                Files.createDirectories(filePath.getParent());
                Files.copy(logoEmpresa.getInputStream(), filePath);
                empresa.setLogo_empresa(fileName);
            } catch (IOException e) {
                throw new RuntimeException("Error al cargar el logo de la empresa", e);
            }
        }

        Empresa empresaGuardada = empresaRepository.save(empresa);

        Optional<Modulo> moduloOpt = moduloRepository.findById(idModulo);
        if (moduloOpt.isEmpty()) {
            throw new RuntimeException("Módulo no encontrado con el ID: " + idModulo);
        }
        Modulo modulo = moduloOpt.get();

        EmpresaModuloId empresaModuloId = new EmpresaModuloId(empresaGuardada.getId_empresa(), modulo.getId_modulo());
        EmpresaModulo empresaModulo = new EmpresaModulo();
        empresaModulo.setId(empresaModuloId);
        empresaModulo.setEmpresa(empresaGuardada);
        empresaModulo.setModulo(modulo);
        empresaModulo.setFechaAsignacion(LocalDateTime.now());

        empresaModuloRepository.save(empresaModulo);

        return empresaGuardada;
    }

    public List<Empresa> obtenerEmpresas() {
        return empresaRepository.findAll();
    }

    public Empresa obtenerEmpresa(Long id) {
        return empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa no encontrada con el ID: " + id));
    }

    @Transactional
    public void eliminarEmpresa(Long id) {
        if (!empresaRepository.existsById(id)) {
            throw new RuntimeException("Empresa no encontrada con el ID: " + id);
        }
        // Primero eliminar las relaciones en empresa_modulo
        empresaModuloRepository.deleteByEmpresaId(id);

        // Luego eliminar la empresa
        empresaRepository.deleteById(id);
    }

    public Empresa actualizarEmpresa(Empresa empresa) {
        Optional<Empresa> empresaExistenteOpt = empresaRepository.findById(empresa.getId_empresa());

        if (empresaExistenteOpt.isEmpty()) {
            throw new RuntimeException("Empresa no encontrada con el ID: " + empresa.getId_empresa());
        }

        Empresa empresaExistente = empresaExistenteOpt.get();

        empresaExistente.setNombre_empresa(empresa.getNombre_empresa());
        empresaExistente.setColor_palette(empresa.getColor_palette());
        empresaExistente.setNit_empresa(empresa.getNit_empresa());
        empresaExistente.setCorreo_empresa(empresa.getCorreo_empresa());
        empresaExistente.setContacto_empresa(empresa.getContacto_empresa());
        empresaExistente.setNumero_poliza(empresa.getNumero_poliza());
        empresaExistente.setId_modulo(empresa.getId_modulo());

        if (empresa.getLogo_empresa() != null && !empresa.getLogo_empresa().isEmpty()) {
            empresaExistente.setLogo_empresa(empresa.getLogo_empresa());
        }

        return empresaRepository.save(empresaExistente);
    }
}
