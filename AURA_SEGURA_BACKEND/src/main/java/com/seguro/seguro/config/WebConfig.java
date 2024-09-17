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
        // Configura las reglas de CORS para permitir solicitudes desde orígenes específicos
        registry.addMapping("/**") // Aplica la configuración de CORS a todas las rutas de la aplicación
                .allowedOrigins("http://localhost:4200") // Permite solicitudes desde este origen (la aplicación Angular en desarrollo)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Permite los métodos HTTP especificados
                .allowedHeaders("*"); // Permite todos los encabezados en las solicitudes
    }
}
