# Script de validación para configuración de Docker Compose (PowerShell)
# Ejecutar antes de hacer 'docker compose up'

# Colores
$ErrorColor = "Red"
$SuccessColor = "Green"
$WarningColor = "Yellow"
$InfoColor = "Cyan"

# Contadores
$ErrorCount = 0
$WarningCount = 0

Write-Host "========================================" -ForegroundColor $InfoColor
Write-Host "   Docker Compose - Validación" -ForegroundColor $InfoColor
Write-Host "========================================`n" -ForegroundColor $InfoColor

# 1. Verificar que Docker está instalado
Write-Host "[1/10] Verificando Docker..." -ForegroundColor $InfoColor
try {
    $dockerVersion = docker --version 2>$null
    if ($dockerVersion) {
        Write-Host "✓ Docker está instalado: $dockerVersion" -ForegroundColor $SuccessColor
    } else {
        Write-Host "✗ Docker no está instalado" -ForegroundColor $ErrorColor
        $ErrorCount++
    }
} catch {
    Write-Host "✗ Docker no está instalado" -ForegroundColor $ErrorColor
    $ErrorCount++
}

# 2. Verificar que Docker Compose está instalado
Write-Host "`n[2/10] Verificando Docker Compose..." -ForegroundColor $InfoColor
try {
    $composeVersion = docker compose version 2>$null
    if ($composeVersion) {
        Write-Host "✓ Docker Compose está instalado: $composeVersion" -ForegroundColor $SuccessColor
    } else {
        Write-Host "✗ Docker Compose no está instalado" -ForegroundColor $ErrorColor
        $ErrorCount++
    }
} catch {
    Write-Host "✗ Docker Compose no está instalado" -ForegroundColor $ErrorColor
    $ErrorCount++
}

# 3. Verificar que Docker daemon está corriendo
Write-Host "`n[3/10] Verificando Docker daemon..." -ForegroundColor $InfoColor
try {
    $dockerInfo = docker info 2>$null
    if ($dockerInfo) {
        Write-Host "✓ Docker daemon está corriendo" -ForegroundColor $SuccessColor
    } else {
        Write-Host "✗ Docker daemon no está corriendo. Inicia Docker Desktop" -ForegroundColor $ErrorColor
        $ErrorCount++
    }
} catch {
    Write-Host "✗ Docker daemon no está corriendo. Inicia Docker Desktop" -ForegroundColor $ErrorColor
    $ErrorCount++
}

# 4. Verificar que existe el archivo docker.compose.yml
Write-Host "`n[4/10] Verificando archivo docker.compose.yml..." -ForegroundColor $InfoColor
if (Test-Path "docker.compose.yml") {
    Write-Host "✓ Archivo docker.compose.yml encontrado" -ForegroundColor $SuccessColor
    
    # Validar sintaxis YAML
    try {
        $configTest = docker compose config 2>$null
        if ($configTest) {
            Write-Host "✓ Sintaxis YAML válida" -ForegroundColor $SuccessColor
        } else {
            Write-Host "✗ Error de sintaxis en docker.compose.yml" -ForegroundColor $ErrorColor
            $ErrorCount++
        }
    } catch {
        Write-Host "✗ Error de sintaxis en docker.compose.yml" -ForegroundColor $ErrorColor
        $ErrorCount++
    }
} else {
    Write-Host "✗ Archivo docker.compose.yml no encontrado" -ForegroundColor $ErrorColor
    $ErrorCount++
}

# 5. Verificar archivo .env
Write-Host "`n[5/10] Verificando archivo .env..." -ForegroundColor $InfoColor
if (Test-Path ".env") {
    Write-Host "✓ Archivo .env encontrado" -ForegroundColor $SuccessColor
    
    # Verificar variables requeridas
    $envContent = Get-Content ".env"
    $requiredVars = @("POSTGRES_PASSWORD", "REDIS_PASSWORD")
    
    foreach ($var in $requiredVars) {
        $varLine = $envContent | Where-Object { $_ -match "^$var=" }
        if ($varLine) {
            $value = ($varLine -split "=", 2)[1].Trim()
            if ([string]::IsNullOrWhiteSpace($value) -or 
                $value -eq "your_secure_password_here" -or 
                $value -eq "your_redis_password_here") {
                Write-Host "⚠ $var no está configurada o usa valor por defecto" -ForegroundColor $WarningColor
                $WarningCount++
            } elseif ($value.Length -lt 8) {
                Write-Host "⚠ $var debería tener al menos 8 caracteres" -ForegroundColor $WarningColor
                $WarningCount++
            } else {
                Write-Host "✓ $var está configurada" -ForegroundColor $SuccessColor
            }
        } else {
            Write-Host "✗ $var no encontrada en .env" -ForegroundColor $ErrorColor
            $ErrorCount++
        }
    }
} else {
    Write-Host "⚠ Archivo .env no encontrado. Ejecuta: Copy-Item docker-env.template .env" -ForegroundColor $WarningColor
    $WarningCount++
}

# 6. Verificar puertos disponibles
Write-Host "`n[6/10] Verificando disponibilidad de puertos..." -ForegroundColor $InfoColor
$ports = @{5432 = "PostgreSQL"; 6379 = "Redis"}

foreach ($port in $ports.Keys) {
    $portInUse = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($portInUse) {
        Write-Host "⚠ Puerto $port ($($ports[$port])) ya está en uso" -ForegroundColor $WarningColor
        $WarningCount++
    } else {
        Write-Host "✓ Puerto $port ($($ports[$port])) está disponible" -ForegroundColor $SuccessColor
    }
}

# 7. Verificar espacio en disco
Write-Host "`n[7/10] Verificando espacio en disco..." -ForegroundColor $InfoColor
try {
    $drive = (Get-Location).Drive
    $availableSpace = [math]::Round($drive.Free / 1GB, 2)
    if ($availableSpace -gt 10) {
        Write-Host "✓ Espacio disponible: ${availableSpace}GB" -ForegroundColor $SuccessColor
    } elseif ($availableSpace -gt 5) {
        Write-Host "⚠ Espacio limitado: ${availableSpace}GB" -ForegroundColor $WarningColor
        $WarningCount++
    } else {
        Write-Host "✗ Espacio insuficiente: ${availableSpace}GB (se recomienda mínimo 5GB)" -ForegroundColor $ErrorColor
        $ErrorCount++
    }
} catch {
    Write-Host "⚠ No se puede verificar espacio en disco" -ForegroundColor $WarningColor
    $WarningCount++
}

# 8. Verificar memoria disponible
Write-Host "`n[8/10] Verificando memoria disponible..." -ForegroundColor $InfoColor
try {
    $computerInfo = Get-CimInstance Win32_OperatingSystem
    $availableMem = [math]::Round($computerInfo.FreePhysicalMemory / 1MB, 2)
    if ($availableMem -gt 2) {
        Write-Host "✓ Memoria disponible: ${availableMem}GB" -ForegroundColor $SuccessColor
    } else {
        Write-Host "⚠ Memoria limitada: ${availableMem}GB (se recomienda mínimo 2GB disponible)" -ForegroundColor $WarningColor
        $WarningCount++
    }
} catch {
    Write-Host "⚠ No se puede verificar memoria disponible" -ForegroundColor $WarningColor
    $WarningCount++
}

# 9. Verificar que no hay contenedores previos en conflicto
Write-Host "`n[9/10] Verificando contenedores existentes..." -ForegroundColor $InfoColor
try {
    $existingContainers = docker ps -a --filter "name=erp-" --format "{{.Names}}" 2>$null
    if ($existingContainers) {
        Write-Host "⚠ Contenedores existentes encontrados:" -ForegroundColor $WarningColor
        foreach ($container in $existingContainers) {
            $status = docker ps -a --filter "name=$container" --format "{{.Status}}"
            Write-Host "  - $container ($status)" -ForegroundColor $WarningColor
        }
        $WarningCount++
    } else {
        Write-Host "✓ No hay contenedores existentes" -ForegroundColor $SuccessColor
    }
} catch {
    Write-Host "⚠ No se puede verificar contenedores" -ForegroundColor $WarningColor
    $WarningCount++
}

# 10. Verificar redes Docker
Write-Host "`n[10/10] Verificando redes Docker..." -ForegroundColor $InfoColor
try {
    $existingNetwork = docker network ls --filter "name=erp_network" --format "{{.Name}}" 2>$null
    if ($existingNetwork) {
        Write-Host "⚠ Red 'erp_network' ya existe" -ForegroundColor $WarningColor
        $WarningCount++
    } else {
        Write-Host "✓ Red disponible para creación" -ForegroundColor $SuccessColor
    }
} catch {
    Write-Host "✗ No se puede acceder a redes Docker" -ForegroundColor $ErrorColor
    $ErrorCount++
}

# Resumen
Write-Host "`n========================================" -ForegroundColor $InfoColor
Write-Host "           RESUMEN" -ForegroundColor $InfoColor
Write-Host "========================================" -ForegroundColor $InfoColor

if ($ErrorCount -eq 0 -and $WarningCount -eq 0) {
    Write-Host "✓ Todo está listo para iniciar Docker Compose" -ForegroundColor $SuccessColor
    Write-Host "`nEjecuta: docker compose up -d" -ForegroundColor $SuccessColor
    exit 0
} elseif ($ErrorCount -eq 0) {
    Write-Host "⚠ Hay $WarningCount advertencia(s), pero puedes continuar" -ForegroundColor $WarningColor
    Write-Host "`nEjecuta: docker compose up -d" -ForegroundColor $WarningColor
    Write-Host "Revisa las advertencias arriba para optimizar la configuración" -ForegroundColor $WarningColor
    exit 0
} else {
    Write-Host "✗ Se encontraron $ErrorCount error(es) y $WarningCount advertencia(s)" -ForegroundColor $ErrorColor
    Write-Host "`nPor favor, corrige los errores antes de continuar" -ForegroundColor $ErrorColor
    exit 1
}

