#!/bin/bash

# Script de validación para configuración de Docker Compose
# Ejecutar antes de hacer 'docker compose up'

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Emojis
CHECK="✓"
CROSS="✗"
WARN="⚠"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   Docker Compose - Validación${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Contador de errores
ERRORS=0
WARNINGS=0

# 1. Verificar que Docker está instalado
echo -e "${BLUE}[1/10]${NC} Verificando Docker..."
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    echo -e "${GREEN}${CHECK}${NC} Docker está instalado: ${DOCKER_VERSION}"
else
    echo -e "${RED}${CROSS}${NC} Docker no está instalado"
    ((ERRORS++))
fi

# 2. Verificar que Docker Compose está instalado
echo -e "\n${BLUE}[2/10]${NC} Verificando Docker Compose..."
if docker compose version &> /dev/null; then
    COMPOSE_VERSION=$(docker compose version)
    echo -e "${GREEN}${CHECK}${NC} Docker Compose está instalado: ${COMPOSE_VERSION}"
else
    echo -e "${RED}${CROSS}${NC} Docker Compose no está instalado"
    ((ERRORS++))
fi

# 3. Verificar que Docker daemon está corriendo
echo -e "\n${BLUE}[3/10]${NC} Verificando Docker daemon..."
if docker info &> /dev/null; then
    echo -e "${GREEN}${CHECK}${NC} Docker daemon está corriendo"
else
    echo -e "${RED}${CROSS}${NC} Docker daemon no está corriendo. Inicia Docker Desktop o el servicio Docker"
    ((ERRORS++))
fi

# 4. Verificar que existe el archivo docker.compose.yml
echo -e "\n${BLUE}[4/10]${NC} Verificando archivo docker.compose.yml..."
if [ -f "docker.compose.yml" ]; then
    echo -e "${GREEN}${CHECK}${NC} Archivo docker.compose.yml encontrado"
    
    # Validar sintaxis YAML
    if docker compose config &> /dev/null; then
        echo -e "${GREEN}${CHECK}${NC} Sintaxis YAML válida"
    else
        echo -e "${RED}${CROSS}${NC} Error de sintaxis en docker.compose.yml"
        ((ERRORS++))
    fi
else
    echo -e "${RED}${CROSS}${NC} Archivo docker.compose.yml no encontrado"
    ((ERRORS++))
fi

# 5. Verificar archivo .env
echo -e "\n${BLUE}[5/10]${NC} Verificando archivo .env..."
if [ -f ".env" ]; then
    echo -e "${GREEN}${CHECK}${NC} Archivo .env encontrado"
    
    # Verificar variables requeridas
    REQUIRED_VARS=("POSTGRES_PASSWORD" "REDIS_PASSWORD")
    for VAR in "${REQUIRED_VARS[@]}"; do
        if grep -q "^${VAR}=" .env; then
            VALUE=$(grep "^${VAR}=" .env | cut -d '=' -f2)
            if [ -z "$VALUE" ] || [ "$VALUE" == "your_secure_password_here" ] || [ "$VALUE" == "your_redis_password_here" ]; then
                echo -e "${YELLOW}${WARN}${NC} ${VAR} no está configurada o usa valor por defecto"
                ((WARNINGS++))
            else
                # Verificar longitud mínima de contraseña
                if [ ${#VALUE} -lt 8 ]; then
                    echo -e "${YELLOW}${WARN}${NC} ${VAR} debería tener al menos 8 caracteres"
                    ((WARNINGS++))
                else
                    echo -e "${GREEN}${CHECK}${NC} ${VAR} está configurada"
                fi
            fi
        else
            echo -e "${RED}${CROSS}${NC} ${VAR} no encontrada en .env"
            ((ERRORS++))
        fi
    done
else
    echo -e "${YELLOW}${WARN}${NC} Archivo .env no encontrado. Ejecuta: cp docker-env.template .env"
    ((WARNINGS++))
fi

# 6. Verificar puertos disponibles
echo -e "\n${BLUE}[6/10]${NC} Verificando disponibilidad de puertos..."
PORTS=(5432 6379)
PORT_NAMES=("PostgreSQL" "Redis")

for i in "${!PORTS[@]}"; do
    PORT=${PORTS[$i]}
    NAME=${PORT_NAMES[$i]}
    
    if command -v netstat &> /dev/null; then
        if netstat -tuln 2>/dev/null | grep -q ":${PORT} "; then
            echo -e "${YELLOW}${WARN}${NC} Puerto ${PORT} (${NAME}) ya está en uso"
            ((WARNINGS++))
        else
            echo -e "${GREEN}${CHECK}${NC} Puerto ${PORT} (${NAME}) está disponible"
        fi
    elif command -v ss &> /dev/null; then
        if ss -tuln 2>/dev/null | grep -q ":${PORT} "; then
            echo -e "${YELLOW}${WARN}${NC} Puerto ${PORT} (${NAME}) ya está en uso"
            ((WARNINGS++))
        else
            echo -e "${GREEN}${CHECK}${NC} Puerto ${PORT} (${NAME}) está disponible"
        fi
    elif command -v lsof &> /dev/null; then
        if lsof -i :${PORT} &> /dev/null; then
            echo -e "${YELLOW}${WARN}${NC} Puerto ${PORT} (${NAME}) ya está en uso"
            ((WARNINGS++))
        else
            echo -e "${GREEN}${CHECK}${NC} Puerto ${PORT} (${NAME}) está disponible"
        fi
    else
        echo -e "${YELLOW}${WARN}${NC} No se puede verificar disponibilidad de puertos (netstat/ss/lsof no disponible)"
        ((WARNINGS++))
        break
    fi
done

# 7. Verificar espacio en disco
echo -e "\n${BLUE}[7/10]${NC} Verificando espacio en disco..."
if command -v df &> /dev/null; then
    AVAILABLE_SPACE=$(df -BG . | tail -1 | awk '{print $4}' | sed 's/G//')
    if [ "$AVAILABLE_SPACE" -gt 10 ]; then
        echo -e "${GREEN}${CHECK}${NC} Espacio disponible: ${AVAILABLE_SPACE}GB"
    elif [ "$AVAILABLE_SPACE" -gt 5 ]; then
        echo -e "${YELLOW}${WARN}${NC} Espacio limitado: ${AVAILABLE_SPACE}GB"
        ((WARNINGS++))
    else
        echo -e "${RED}${CROSS}${NC} Espacio insuficiente: ${AVAILABLE_SPACE}GB (se recomienda mínimo 5GB)"
        ((ERRORS++))
    fi
else
    echo -e "${YELLOW}${WARN}${NC} No se puede verificar espacio en disco"
    ((WARNINGS++))
fi

# 8. Verificar memoria disponible
echo -e "\n${BLUE}[8/10]${NC} Verificando memoria disponible..."
if command -v free &> /dev/null; then
    AVAILABLE_MEM=$(free -g | awk '/^Mem:/{print $7}')
    if [ "$AVAILABLE_MEM" -gt 2 ]; then
        echo -e "${GREEN}${CHECK}${NC} Memoria disponible: ${AVAILABLE_MEM}GB"
    else
        echo -e "${YELLOW}${WARN}${NC} Memoria limitada: ${AVAILABLE_MEM}GB (se recomienda mínimo 2GB disponible)"
        ((WARNINGS++))
    fi
else
    echo -e "${YELLOW}${WARN}${NC} No se puede verificar memoria disponible"
    ((WARNINGS++))
fi

# 9. Verificar que no hay contenedores previos en conflicto
echo -e "\n${BLUE}[9/10]${NC} Verificando contenedores existentes..."
EXISTING_CONTAINERS=$(docker ps -a --filter "name=erp-" --format "{{.Names}}" 2>/dev/null || echo "")
if [ -n "$EXISTING_CONTAINERS" ]; then
    echo -e "${YELLOW}${WARN}${NC} Contenedores existentes encontrados:"
    echo "$EXISTING_CONTAINERS" | while read -r container; do
        STATUS=$(docker ps -a --filter "name=$container" --format "{{.Status}}")
        echo "  - $container ($STATUS)"
    done
    ((WARNINGS++))
else
    echo -e "${GREEN}${CHECK}${NC} No hay contenedores existentes"
fi

# 10. Verificar permisos de red Docker
echo -e "\n${BLUE}[10/10]${NC} Verificando redes Docker..."
if docker network ls &> /dev/null; then
    EXISTING_NETWORK=$(docker network ls --filter "name=erp_network" --format "{{.Name}}" 2>/dev/null || echo "")
    if [ -n "$EXISTING_NETWORK" ]; then
        echo -e "${YELLOW}${WARN}${NC} Red 'erp_network' ya existe"
        ((WARNINGS++))
    else
        echo -e "${GREEN}${CHECK}${NC} Red disponible para creación"
    fi
else
    echo -e "${RED}${CROSS}${NC} No se puede acceder a redes Docker"
    ((ERRORS++))
fi

# Resumen
echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}           RESUMEN${NC}"
echo -e "${BLUE}========================================${NC}"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}${CHECK} Todo está listo para iniciar Docker Compose${NC}"
    echo -e "\n${GREEN}Ejecuta: docker compose up -d${NC}"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}${WARN} Hay ${WARNINGS} advertencia(s), pero puedes continuar${NC}"
    echo -e "\n${YELLOW}Ejecuta: docker compose up -d${NC}"
    echo -e "${YELLOW}Revisa las advertencias arriba para optimizar la configuración${NC}"
    exit 0
else
    echo -e "${RED}${CROSS} Se encontraron ${ERRORS} error(es) y ${WARNINGS} advertencia(s)${NC}"
    echo -e "\n${RED}Por favor, corrige los errores antes de continuar${NC}"
    exit 1
fi

