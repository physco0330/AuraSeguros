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
  PRIMARY KEY (`id_historial`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_entity`
--

LOCK TABLES `historial_entity` WRITE;
/*!40000 ALTER TABLE `historial_entity` DISABLE KEYS */;
INSERT INTO `historial_entity` VALUES (1,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0105','2024-09-15 09:08:31.000000',692,'Usuario Ejemplo',NULL),(2,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0105','2024-09-15 09:12:32.000000',692,'Usuario Ejemplo',NULL),(3,'{\"descripcion\": \"Cambio forzado\", \"fecha\": \"2024-09-15\"}','MQYE0106','2024-09-15 09:14:02.000000',693,'Usuario Ejemplo',NULL),(4,'{\"descripcion\": \"Nuevo cambio realizado\", \"fecha\": \"2024-09-15\"}','MQYE0106','2024-09-15 10:12:29.000000',693,'Usuario Ejemplo',NULL),(5,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106','2024-09-15 17:56:06.000000',693,'Usuario Ejemplo',NULL),(6,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106','2024-09-15 17:56:36.000000',693,'Usuario Ejemplo',NULL),(7,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0107','2024-09-16 18:35:03.000000',694,'Usuario Ejemplo',NULL),(8,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106','2024-09-16 18:49:05.000000',693,'Usuario Ejemplo',NULL),(9,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106','2024-09-16 18:54:26.000000',693,'Usuario Ejemplo',NULL),(10,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0115','2024-09-16 18:54:46.000000',702,'Usuario Ejemplo',NULL),(11,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106','2024-09-16 19:22:57.000000',693,'Usuario Ejemplo',NULL),(12,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0109','2024-09-16 19:23:45.000000',696,'Usuario Ejemplo',NULL),(13,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106','2024-09-16 19:35:06.000000',693,'Usuario Ejemplo',NULL),(14,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106','2024-09-16 19:41:45.000000',693,'Usuario Ejemplo',NULL),(15,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0110','2024-09-16 20:42:55.000000',697,'Usuario Ejemplo',NULL),(16,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106','2024-09-16 21:27:33.000000',693,'Usuario Ejemplo',NULL),(17,'{ \"descripcion\": \"Modificación realizada en el bien.\" }','MQYE0106','2024-09-16 21:33:49.000000',693,'Usuario Ejemplo',NULL);
/*!40000 ALTER TABLE `historial_entity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-17 17:40:57
