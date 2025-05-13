<!DOCTYPE html>
<html>
<head>
    <title>Boleta de Pago</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .header { text-align: center; margin-bottom: 20px; }
        .content { margin: 20px; }
        table { width: 100%; border-collapse: collapse; }
        table, th, td { border: 1px solid #ddd; padding: 8px; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Boleta de Pago</h1>
    </div>
    <div class="content">
        <!-- Contenido de la boleta con datos dinámicos -->
        <p><strong>ID:</strong> {{ $id ?? 'N/A' }}</p>
        <p><strong>Fecha:</strong> {{ $fecha ?? date('Y-m-d') }}</p>
        <!-- Agrega más datos según lo que envíes desde el frontend -->
    </div>
</body>
</html>