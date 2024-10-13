CREATE DATABASE  IF NOT EXISTS `auraseguro` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `auraseguro`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: auraseguro
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bienes_entity`
--

DROP TABLE IF EXISTS `bienes_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bienes_entity` (
  `id_bien` bigint(20) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(255) DEFAULT NULL,
  `articulo_bienes` varchar(255) NOT NULL,
  `proceso_estaciones` varchar(255) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `descripcion_articulo` varchar(500) DEFAULT NULL,
  `descripcion_movimiento` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `riesgo` varchar(255) DEFAULT NULL,
  `fecha_ingreso` varchar(255) DEFAULT NULL,
  `fecha_modificacion` varchar(255) DEFAULT NULL,
  `vr_unitario_2023` decimal(38,2) DEFAULT NULL,
  `vr_asegurado` decimal(38,2) DEFAULT NULL,
  `porcentaje_iva` decimal(38,2) DEFAULT NULL,
  `iva_variable` decimal(38,2) DEFAULT NULL,
  `vr_asegurable` decimal(38,2) DEFAULT NULL,
  `tasa_general` decimal(38,2) DEFAULT NULL,
  `prima` decimal(38,2) DEFAULT NULL,
  `tasa_iva` decimal(38,2) DEFAULT NULL,
  `prima_iva_anual` decimal(38,2) DEFAULT NULL,
  `prima_anual_total` decimal(38,2) DEFAULT NULL,
  `beneficiario_adicional` varchar(255) DEFAULT NULL,
  `numero_endoso` varchar(255) DEFAULT NULL,
  `valor_endoso` decimal(38,2) DEFAULT NULL,
  `vigencia_endoso` varchar(255) DEFAULT NULL,
  `banco` varchar(255) DEFAULT NULL,
  `nit_banco` varchar(255) DEFAULT NULL,
  `id_empresa` bigint(20) DEFAULT NULL,
  `id_usuario` bigint(20) DEFAULT NULL,
  `nombre_empresa` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_bien`),
  UNIQUE KEY `unique_codigo` (`codigo`),
  KEY `fk_bienes_usuario` (`id_usuario`),
  KEY `FKkcuvf7matl5xr94vgurcqqswu` (`id_empresa`),
  CONSTRAINT `FKkcuvf7matl5xr94vgurcqqswu` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`),
  CONSTRAINT `fk_bienes_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=858 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bienes_entity`
--

LOCK TABLES `bienes_entity` WRITE;
/*!40000 ALTER TABLE `bienes_entity` DISABLE KEYS */;
INSERT INTO `bienes_entity` VALUES (854,'IDMSMM','','',0,'','','','','','',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'','',0.00,'','','',NULL,NULL,NULL),(855,'B001','Laptop','Proceso A',10,'Laptop de alto rendimiento','Ingreso de bienes','Activo','Bajo','2024-01-15','2024-01-16',1000.00,1000.00,19.00,190.00,1190.00,10.00,100.00,0.10,120.00,600.00,'N/A','END-001',50.00,'2025-01-15','Banco XYZ','NIT-BANCO-XYZ',78,NULL,'SoftSolutions'),(856,'B003','Servidor','Proceso C',3,'Servidor de alta capacidad para centros de datos','Adquisición de equipo','Activo','Alto','2024-03-01','2024-03-02',5000.00,5000.00,19.00,950.00,5950.00,8.00,400.00,0.08,456.00,2800.00,'N/A','END-003',150.00,'2025-03-01','Banco Nacional','NIT-BANCO-NACIONAL',79,NULL,'Innovatech'),(857,'B004','Panel Solar','Proceso D',15,'Panel solar fotovoltaico de alta eficiencia','Compra de activos','Activo','Medio','2024-04-10','2024-04-11',800.00,800.00,19.00,152.00,952.00,5.00,40.00,0.05,50.00,250.00,'N/A','END-004',20.00,'2025-04-10','Banco Verde','NIT-BANCO-VERDE',80,NULL,'GreenEnergy');
/*!40000 ALTER TABLE `bienes_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa` (
  `id_empresa` bigint(20) NOT NULL AUTO_INCREMENT,
  `color_palette` varchar(255) DEFAULT NULL,
  `nombre_empresa` varchar(255) NOT NULL,
  `nit_empresa` varchar(255) NOT NULL,
  `correo_empresa` varchar(255) NOT NULL,
  `contacto_empresa` varchar(255) NOT NULL,
  `numero_poliza` varchar(255) NOT NULL,
  `id_usuario` bigint(20) DEFAULT NULL,
  `fecha_actualizacion` datetime(6) DEFAULT NULL,
  `fecha_creacion` datetime(6) DEFAULT NULL,
  `logo_empresa` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`),
  KEY `fk_empresa_usuario` (`id_usuario`),
  CONSTRAINT `fk_empresa_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa`
--

LOCK TABLES `empresa` WRITE;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` VALUES (76,'#e01515','Vitelsa','0101','vitelsa@ejemplo.com','ww','AfAS',NULL,NULL,'2024-10-12 14:51:51.000000',NULL),(77,'#ffffff','Vitelsa1','0101','Ada','AS','AfAS',NULL,NULL,'2024-10-12 14:52:32.000000',NULL),(78,'#4CAF50','SoftSolutions','123456789','info@softsolutions.com','987654321','POLIZA-001',NULL,NULL,NULL,NULL),(79,'#008080','Innovatech','987654321','contacto@innovatech.com','1122334455','POLIZA-003',NULL,NULL,NULL,NULL),(80,'#32CD32','GreenEnergy','555444333','info@greenenergy.com','5678901234','POLIZA-004',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_entity`
--

DROP TABLE IF EXISTS `historial_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_entity` (
  `id_historial` bigint(20) NOT NULL AUTO_INCREMENT,
  `cambios` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`cambios`)),
  `codigo` varchar(255) DEFAULT NULL,
  `fecha_modificacion` datetime(6) DEFAULT NULL,
  `id_bien` bigint(20) DEFAULT NULL,
  `usuario` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `id_empresa` bigint(20) DEFAULT NULL,
  `id_usuario` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id_historial`),
  KEY `fk_historial_empresa` (`id_empresa`),
  KEY `fk_historial_usuario` (`id_usuario`),
  CONSTRAINT `fk_historial_empresa` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`),
  CONSTRAINT `fk_historial_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_entity`
--

LOCK TABLES `historial_entity` WRITE;
/*!40000 ALTER TABLE `historial_entity` DISABLE KEYS */;
INSERT INTO `historial_entity` VALUES (1,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0105','2024-09-15 09:08:31.000000',692,'Usuario Ejemplo',NULL,NULL,NULL),(2,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0105','2024-09-15 09:12:32.000000',692,'Usuario Ejemplo',NULL,NULL,NULL),(3,'{\"descripcion\": \"Cambio forzado\", \"fecha\": \"2024-09-15\"}','MQYE0106','2024-09-15 09:14:02.000000',693,'Usuario Ejemplo',NULL,NULL,NULL),(4,'{\"descripcion\": \"Nuevo cambio realizado\", \"fecha\": \"2024-09-15\"}','MQYE0106','2024-09-15 10:12:29.000000',693,'Usuario Ejemplo',NULL,NULL,NULL),(5,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106','2024-09-15 17:56:06.000000',693,'Usuario Ejemplo',NULL,NULL,NULL),(6,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106','2024-09-15 17:56:36.000000',693,'Usuario Ejemplo',NULL,NULL,NULL),(7,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0107','2024-09-16 18:35:03.000000',694,'Usuario Ejemplo',NULL,NULL,NULL),(8,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106','2024-09-16 18:49:05.000000',693,'Usuario Ejemplo',NULL,NULL,NULL),(9,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106','2024-09-16 18:54:26.000000',693,'Usuario Ejemplo',NULL,NULL,NULL),(10,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0115','2024-09-16 18:54:46.000000',702,'Usuario Ejemplo',NULL,NULL,NULL),(11,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106','2024-09-16 19:22:57.000000',693,'Usuario Ejemplo',NULL,NULL,NULL),(12,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0109','2024-09-16 19:23:45.000000',696,'Usuario Ejemplo',NULL,NULL,NULL),(13,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106','2024-09-16 19:35:06.000000',693,'Usuario Ejemplo',NULL,NULL,NULL),(14,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106','2024-09-16 19:41:45.000000',693,'Usuario Ejemplo',NULL,NULL,NULL),(15,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0110','2024-09-16 20:42:55.000000',697,'Usuario Ejemplo',NULL,NULL,NULL),(16,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106','2024-09-16 21:27:33.000000',693,'Usuario Ejemplo',NULL,NULL,NULL),(17,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106','2024-09-16 21:33:49.000000',693,'Usuario Ejemplo',NULL,NULL,NULL),(18,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106333','2024-09-23 22:09:58.000000',821,'Usuario Ejemplo',NULL,NULL,NULL),(19,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106','2024-09-24 20:36:36.000000',693,'Usuario Ejemplo',NULL,NULL,NULL);
/*!40000 ALTER TABLE `historial_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(255) NOT NULL,
  `correo_usuario` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `rol_usuario` enum('admin','editor','viewer') NOT NULL,
  `fecha_creacion` datetime(6) DEFAULT current_timestamp(6),
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `correo_usuario` (`correo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Nombre del Usuario','usuario@example.com','mi_contraseña_secreta','editor','2024-10-05 23:05:27.018577');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'auraseguro'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-13 12:50:14
