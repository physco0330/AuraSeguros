package com.seguro.seguro.services;

import com.seguro.seguro.model.Empresa;
import com.seguro.seguro.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    // Método para crear una nueva empresa, incluye manejo de archivo de logo
    public Empresa crearEmpresa(String nombreEmpresa, String nombreTabla, String colorPalette, MultipartFile logoEmpresa) {
        // Crea una nueva instancia de Empresa
        Empresa empresa = new Empresa();
        empresa.setNombre_empresa(nombreEmpresa); // Asigna el nombre de la empresa
        empresa.setNombre_tabla(nombreTabla); // Asigna el nombre de la tabla
        empresa.setColor_palette(colorPalette); // Asigna el color de la paleta

        // Si se subió un archivo, guarda la imagen y almacena la ruta
        if (logoEmpresa != null && !logoEmpresa.isEmpty()) {
            String logoPath = guardarLogo(logoEmpresa); // Llama al método para guardar el archivo
            empresa.setLogo_empresa(logoPath); // Almacena la ruta del logo en la empresa
        }

        return empresaRepository.save(empresa); // Guarda la empresa en la base de datos
    }

    // Método para guardar el archivo de logo en el servidor
    private String guardarLogo(MultipartFile file) {
        // Obtiene el nombre original del archivo
        String nombreArchivo = file.getOriginalFilename();
        // Define la ruta donde se guardará el archivo en el servidor
        String ruta = "/path/to/images/" + nombreArchivo; // Cambia esta ruta según tu estructura de carpetas

        try {
            // Guarda el archivo en la ruta especificada
            file.transferTo(new File(ruta));
        } catch (IOException e) {
            e.printStackTrace(); // Maneja la excepción en caso de error
        }

        return ruta; // Devuelve la ruta del archivo guardado
    }

    // Método para obtener todas las empresas
    public List<Empresa> obtenerEmpresas() {
        return empresaRepository.findAll(); // Devuelve la lista de todas las empresas
    }

    // Método para obtener una empresa por su ID
    public Empresa obtenerEmpresa(Long id) {
        return empresaRepository.findById(id).orElse(null); // Devuelve la empresa si existe
    }
}
