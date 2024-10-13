package com.seguro.seguro.config; // Paquete donde se encuentra la configuración de CORS para la aplicación

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // Método para configurar CORS (Cross-Origin Resource Sharing) en la aplicación
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Aplica la configuración de CORS a todas las rutas de la aplicación
                .allowedOriginPatterns("*") // Permite solicitudes desde cualquier origen
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Permite los métodos HTTP especificados
                .allowedHeaders("*") // Permite todos los encabezados en las solicitudes
                .allowCredentials(true); // Permite el uso de cookies o credenciales en las solicitudes
    }

}
