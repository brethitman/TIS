<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Boleta de Pago</title>
    <style>
        @page {
            margin: 0;
        }
        body {
            font-family: 'Helvetica', Arial, sans-serif;
            color: #333;
            line-height: 1.5;
            margin: 0;
            padding: 0;
        }
        .container {
            padding: 20px;
        }
        .header {
            background-color: #0047AB;
            color: white;
            padding: 20px;
            text-align: center;
            position: relative;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
        .header .logo {
            position: absolute;
            top: 15px;
            left: 20px;
            width: 60px;
            height: auto;
        }
        .header .date {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 14px;
        }
        .employee-info {
            background-color: #f9f9f9;
            padding: 15px;
            margin-top: 20px;
            border-radius: 5px;
            border-left: 5px solid #0047AB;
        }
        .employee-info h2 {
            margin-top: 0;
            color: #0047AB;
            font-size: 18px;
        }
        .info-grid {
            display: table;
            width: 100%;
            margin-bottom: 15px;
        }
        .info-row {
            display: table-row;
        }
        .info-cell {
            display: table-cell;
            padding: 6px 0;
        }
        .info-label {
            font-weight: bold;
            width: 40%;
        }
        .payment-details {
            margin-top: 20px;
        }
        .payment-details h2 {
            color: #0047AB;
            border-bottom: 2px solid #0047AB;
            padding-bottom: 5px;
            font-size: 18px;
        }
        .payment-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        .payment-table th {
            background-color: #0047AB;
            color: white;
            padding: 10px;
            text-align: left;
        }
        .payment-table td {
            padding: 8px 10px;
            border-bottom: 1px solid #ddd;
        }
        .payment-table tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .totals {
            margin-top: 20px;
            text-align: right;
        }
        .total-row {
            margin: 5px 0;
        }
        .total-label {
            font-weight: bold;
            display: inline-block;
            width: 200px;
            text-align: right;
            margin-right: 10px;
        }
        .total-value {
            font-weight: bold;
            color: #0047AB;
            display: inline-block;
            width: 100px;
            text-align: right;
        }
        .grand-total {
            font-size: 18px;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 2px solid #0047AB;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 100px;
            color: rgba(0, 71, 171, 0.05);
            z-index: -1;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <!-- Reemplazar con el logo de la empresa -->
            <!-- <img src="{{ asset('images/logo.png') }}" class="logo" alt="Logo"> -->
            <h1>BOLETA DE PAGO</h1>
            <div class="date">Fecha: {{ date('d/m/Y') }}</div>
        </div>

        <div class="employee-info">
            <h2>Información del Empleado</h2>
            <div class="info-grid">
                <div class="info-row">
                    <div class="info-cell info-label">Nombre:</div>
                    <div class="info-cell">{{ $boleta['nombre'] ?? 'N/A' }}</div>
                </div>
                <div class="info-row">
                    <div class="info-cell info-label">ID Empleado:</div>
                    <div class="info-cell">{{ $boleta['empleado_id'] ?? 'N/A' }}</div>
                </div>
                <div class="info-row">
                    <div class="info-cell info-label">Cargo:</div>
                    <div class="info-cell">{{ $boleta['cargo'] ?? 'N/A' }}</div>
                </div>
                <div class="info-row">
                    <div class="info-cell info-label">Departamento:</div>
                    <div class="info-cell">{{ $boleta['departamento'] ?? 'N/A' }}</div>
                </div>
                <div class="info-row">
                    <div class="info-cell info-label">Período de Pago:</div>
                    <div class="info-cell">{{ $boleta['periodo'] ?? 'N/A' }}</div>
                </div>
            </div>
        </div>

        <div class="payment-details">
            <h2>Detalle de Remuneraciones</h2>
            <table class="payment-table">
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Detalle</th>
                        <th style="text-align: right;">Monto</th>
                    </tr>
                </thead>
                <tbody>
                    @if(isset($boleta['ingresos']) && is_array($boleta['ingresos']))
                        @foreach($boleta['ingresos'] as $ingreso)
                            <tr>
                                <td>{{ $ingreso['concepto'] ?? 'N/A' }}</td>
                                <td>{{ $ingreso['detalle'] ?? '' }}</td>
                                <td style="text-align: right;">{{ number_format($ingreso['monto'] ?? 0, 2, ',', '.') }}</td>
                            </tr>
                        @endforeach
                    @endif
                </tbody>
            </table>
        </div>

        <div class="payment-details">
            <h2>Descuentos</h2>
            <table class="payment-table">
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Detalle</th>
                        <th style="text-align: right;">Monto</th>
                    </tr>
                </thead>
                <tbody>
                    @if(isset($boleta['descuentos']) && is_array($boleta['descuentos']))
                        @foreach($boleta['descuentos'] as $descuento)
                            <tr>
                                <td>{{ $descuento['concepto'] ?? 'N/A' }}</td>
                                <td>{{ $descuento['detalle'] ?? '' }}</td>
                                <td style="text-align: right;">{{ number_format($descuento['monto'] ?? 0, 2, ',', '.') }}</td>
                            </tr>
                        @endforeach
                    @endif
                </tbody>
            </table>
        </div>

        <div class="totals">
            <div class="total-row">
                <span class="total-label">Total Ingresos:</span>
                <span class="total-value">{{ number_format($boleta['total_ingresos'] ?? 0, 2, ',', '.') }}</span>
            </div>
            <div class="total-row">
                <span class="total-label">Total Descuentos:</span>
                <span class="total-value">{{ number_format($boleta['total_descuentos'] ?? 0, 2, ',', '.') }}</span>
            </div>
            <div class="total-row grand-total">
                <span class="total-label">LÍQUIDO A PAGAR:</span>
                <span class="total-value">{{ number_format(($boleta['total_ingresos'] ?? 0) - ($boleta['total_descuentos'] ?? 0), 2, ',', '.') }}</span>
            </div>
        </div>

        <div class="footer">
            <p>Este documento es una representación digital de su boleta de pago. Para consultas adicionales, comuníquese con el Departamento de Recursos Humanos.</p>
            <p>Documento generado el {{ date('d/m/Y H:i:s') }}</p>
        </div>

        <div class="watermark">PAGADO</div>
    </div>
</body>
</html>