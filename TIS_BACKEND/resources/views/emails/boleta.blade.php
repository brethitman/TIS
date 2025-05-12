<!DOCTYPE html>
<html>
<head>
    <title>Boleta de Pago - Universidad Mayor de San Simón</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>        
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #e8e8e8;
        }
        
        .container {
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            border: 1px solid #e0e0e0;
        }
        
        .header {
            background-color: #00447c; /* Azul UMSS */
            background-image: linear-gradient(90deg, #00447c 60%, #c41230 100%);
            color: white;
            padding: 25px;
            text-align: center;
            position: relative;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 5px;
            background-color: #c41230; /* Rojo UMSS */
        }
        
        .header-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        
        .title-container {
            text-align: center;
        }
        
        .title-container h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
            letter-spacing: 1px;
        }
        
        .title-container h2 {
            margin: 10px 0 0;
            font-size: 20px;
            font-weight: 500;
            color: #f0f0f0;
        }
        
        .title-icon {
            font-size: 32px;
            margin-bottom: 15px;
            background-color: #c41230; /* Rojo UMSS */
            width: 65px;
            height: 65px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .content {
            padding: 35px 30px;
        }
        
        .boleta {
            border: none;
            border-radius: 10px;
            padding: 30px;
            background-color: #f9f9f9;
            position: relative;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            border-left: 5px solid #c41230; /* Rojo UMSS */
        }
        
        .boleta-titulo {
            text-align: center;
            font-size: 22px;
            font-weight: 600;
            margin-bottom: 30px;
            color: #00447c; /* Azul UMSS */
            padding-bottom: 15px;
            position: relative;
        }
        
        .boleta-titulo::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 3px;
            background: linear-gradient(to right, #00447c, #c41230); /* Azul a Rojo */
            border-radius: 3px;
        }
        
        .boleta-detail {
            margin-bottom: 20px;
            display: flex;
            padding: 12px 0;
            border-bottom: 1px solid #eaeaea;
            align-items: center;
        }
        
        .boleta-label {
            font-weight: 600;
            width: 40%;
            color: #00447c; /* Azul UMSS */
            display: flex;
            align-items: center;
        }
        
        .boleta-label i {
            margin-right: 10px;
            color: #c41230; /* Rojo UMSS */
            font-size: 18px;
            width: 24px;
            text-align: center;
        }
        
        .boleta-value {
            width: 60%;
            font-weight: 500;
        }
        
        .destacado {
            background-color: #e0f0ff; /* Azul claro */
            border-left: 4px solid #c41230; /* Rojo UMSS */
            padding: 20px;
            margin: 30px 0;
            font-weight: 500;
            border-radius: 8px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .monto {
            font-size: 28px;
            font-weight: 700;
            color: #c41230; /* Rojo UMSS */
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
        }
        
        .instrucciones {
            background-color: #f0f0f0;
            border-radius: 10px;
            padding: 25px;
            margin-top: 35px;
            border-top: 3px solid #00447c; /* Azul UMSS */
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .instrucciones h3 {
            color: #00447c; /* Azul UMSS */
            margin-top: 0;
            font-size: 18px;
            display: flex;
            align-items: center;
        }
        
        .instrucciones h3 i {
            margin-right: 10px;
            color: #c41230; /* Rojo UMSS */
        }
        
        .instrucciones ol {
            padding-left: 20px;
            counter-reset: item;
            list-style-type: none;
        }
        
        .instrucciones li {
            margin-bottom: 12px;
            position: relative;
            padding-left: 35px;
            counter-increment: item;
        }
        
        .instrucciones li::before {
            content: counter(item);
            position: absolute;
            left: 0;
            top: 2px;
            background-color: #c41230; /* Rojo UMSS */
            color: white;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
        }
        
        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 150px;
            opacity: 0.03;
            color: #c41230; /* Rojo UMSS */
            pointer-events: none;
            width: 100%;
            text-align: center;
            font-weight: 900;
        }
        
        .footer {
            margin-top: 30px;
            font-size: 14px;
            text-align: center;
            color: #666;
            border-top: 1px solid #eaeaea;
            padding: 25px 20px;
            background-color: #f0f0f0;
        }
        
        .footer-contact {
            margin-top: 15px;
            font-size: 13px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .footer-contact-item {
            display: flex;
            align-items: center;
        }
        
        .footer-contact-item i {
            color: #c41230; /* Rojo UMSS */
            margin-right: 5px;
        }
        
        .valid-until {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px 20px;
            margin-top: 25px;
            font-weight: 500;
            border-radius: 8px;
            display: flex;
            align-items: center;
        }
        
        .valid-until i {
            color: #ff9800;
            font-size: 24px;
            margin-right: 15px;
        }
        
        @media print {
            body {
                background-color: white;
                padding: 0;
            }
            .container {
                box-shadow: none;
            }
            .no-print {
                display: none;
            }

            /* Asegurar que los colores se impriman */
            .header, .header::after, 
            .title-icon, .boleta-titulo::after,
            .boleta-label, .boleta-label i,
            .monto, .instrucciones h3 i,
            .instrucciones li::before, .footer-contact-item i {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
        }

        /* Agregar bordes de color para mejor visualización */
        .container {
            border: 2px solid #00447c;
        }
        
        .boleta {
            border: 1px solid #e0e0e0;
            border-left: 8px solid #c41230; /* Rojo UMSS más grueso */
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-content">
                
                <div class="title-container">
                    <h1>UNIVERSIDAD MAYOR DE SAN SIMÓN</h1>
                    <h2>BOLETA DE PAGO OFICIAL</h2>
                </div>
            </div>
        </div>

        <div class="content">

            <div class="boleta">
                <div class="boleta-titulo">INFORMACIÓN DE PAGO PARA INSCRIPCIÓN</div>
                
                <div class="boleta-detail">
                    <span class="boleta-label"><i class="fas fa-receipt"></i> Número de Boleta:</span>
                    <span class="boleta-value">{{ $boleta['numero_boleta'] }}</span>
                </div>

                <div class="boleta-detail">
                    <span class="boleta-label"><i class="fas fa-file-invoice"></i> Concepto:</span>
                    <span class="boleta-value">Pago de inscripción - Gestión {{ date('Y') }}</span>
                </div>

                <div class="boleta-detail">
                    <span class="boleta-label"><i class="fas fa-calendar-day"></i> Fecha de Generación:</span>
                    <span class="boleta-value">{{ date('d/m/Y H:i', strtotime($boleta['fecha_generacion'])) }}</span>
                </div>

                <div class="boleta-detail">
                    <span class="boleta-label"><i class="fas fa-hourglass-end"></i> Fecha Límite de Pago:</span>
                    <span class="boleta-value">{{ date('d/m/Y', strtotime($boleta['fecha_limite'] ?? '+5 days')) }}</span>
                </div>

                <div class="destacado">
                    <span class="boleta-label"><i class="fas fa-money-bill-wave fa-lg"></i> Monto a Pagar:</span>
                    <span class="monto">Bs. {{ $boleta['monto'] }}</span>
                </div>
            </div>

            <div class="valid-until">
                <i class="fas fa-exclamation-circle"></i>
                <span>Esta boleta tiene validez hasta el {{ date('d/m/Y', strtotime($boleta['fecha_limite'] ?? '+5 days')) }}. Después de esta fecha deberá generar una nueva boleta.</span>
            </div>

            <div class="instrucciones">
                <h3><i class="fas fa-info-circle"></i> Instrucciones de Pago:</h3>
                <ol>
                    <li>Presente esta boleta impresa en cualquiera de las cajas habilitadas de la Universidad Mayor de San Simón.</li>
                    <li>Realice el pago únicamente con el monto exacto indicado.</li>
                    <li>Conserve su comprobante de pago como respaldo.</li>
                    <li>Una vez realizado el pago, podrá completar su proceso de inscripción en línea o en las ventanillas de su facultad.</li>
                </ol>
            </div>
        </div>

        <div class="footer">
            <p>Este documento es válido como instrumento de pago oficial de la Universidad Mayor de San Simón.</p>
            <p>Este es un correo automático, por favor no responda a este mensaje.</p>
            <div class="footer-contact">
                <div class="footer-contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>Av. Ballivián esq. Reza #591 - Cochabamba, Bolivia</span>
                </div>
                <div class="footer-contact-item">
                    <i class="fas fa-phone"></i>
                    <span>+591 4 25-25-55</span>
                </div>
                <div class="footer-contact-item">
                    <i class="fas fa-globe"></i>
                    <span>www.umss.edu.bo</span>
                </div>
            </div>
        </div>
    </div>
</body>
</html>