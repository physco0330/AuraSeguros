package com.seguro.seguro.services;

import com.seguro.seguro.model.Empresa;
import com.seguro.seguro.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    // Cargamos la ruta de almacenamiento de imágenes desde el archivo application.properties
    @Value("${file.upload-dir}")
    private String uploadDir;

    // Método para crear una nueva empresa, incluye manejo de archivo de logo
    public Empresa crearEmpresa(String nombreEmpresa, String nombreTabla, String colorPalette, MultipartFile logoEmpresa) {
        // Crea una nueva instancia de Empresa
        Empresa empresa = new Empresa();
        empresa.setNombre_empresa(nombreEmpresa); // Asigna el nombre de la empresa
        empresa.setNombre_tabla(nombreTabla); // Asigna el nombre de la tabla
        empresa.setColor_palette(colorPalette); // Asigna el color de la paleta

        // Si se subió un archivo, guarda la imagen y almacena la ruta
        if (logoEmpresa != null && !logoEmpresa.isEmpty()) {
            try {
                // Genera un nombre único para el archivo
                String fileName = System.currentTimeMillis() + "_" + logoEmpresa.getOriginalFilename();
                Path filePath = Paths.get(uploadDir, fileName);

                // Crea el directorio si no existe
                Files.createDirectories(filePath.getParent());

                // Guarda el archivo en la ruta especificada
                Files.copy(logoEmpresa.getInputStream(), filePath);

                // Almacena la ruta del logo en la empresa
                empresa.setLogo_empresa(fileName);
            } catch (IOException e) {
                e.printStackTrace(); // Maneja la excepción en caso de error
            }
        }

        // Guarda la empresa en la base de datos
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
}
