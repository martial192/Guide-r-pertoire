<?php
// Fichier de traitement de paiement pour Guide Immigration Canada
session_start();

// Configuration
$product_id = 'GUIDE_CANADA_2025';
$product_name = 'Guide Ultime Pour Immigrer Au Canada - Édition 2025';
$product_price = 4900; // En FCFA
$download_link = 'https://votredomaine.com/telechargements/guide-immigration-canada-2025.pdf';

// Variables pour le suivi des conversions
$fb_pixel_id = '1400667957768581';
$conversion_api_token = 'votre_token_api_conversions'; // À remplacer par votre token

// Traitement du paiement
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupération des données du formulaire
    $customer_name = filter_input(INPUT_POST, 'fullname', FILTER_SANITIZE_STRING);
    $customer_email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $payment_method = filter_input(INPUT_POST, 'payment_method', FILTER_SANITIZE_STRING);
    
    // Validation des données
    $errors = [];
    if (empty($customer_name)) {
        $errors[] = 'Le nom est requis.';
    }
    if (empty($customer_email) || !filter_var($customer_email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Un email valide est requis.';
    }
    if (empty($payment_method)) {
        $errors[] = 'Veuillez sélectionner une méthode de paiement.';
    }
    
    // Si pas d'erreurs, procéder au paiement
    if (empty($errors)) {
        // ID de commande unique
        $order_id = 'ORD-' . time() . '-' . substr(md5($customer_email), 0, 6);
        
        // Simuler l'intégration avec l'API de paiement (à remplacer par votre passerelle de paiement)
        $payment_successful = processPayment($payment_method, $product_price, $order_id);
        
        if ($payment_successful) {
            // Enregistrer la vente dans la base de données
            $sale_recorded = recordSale([
                'order_id' => $order_id,
                'customer_name' => $customer_name,
                'customer_email' => $customer_email,
                'product_id' => $product_id,
                'product_name' => $product_name,
                'amount' => $product_price,
                'payment_method' => $payment_method,
                'date' => date('Y-m-d H:i:s')
            ]);
            
            // Envoyer l'email de confirmation avec le lien de téléchargement
            sendConfirmationEmail($customer_email, $customer_name, $order_id, $product_name, $download_link);
            
            // Envoyer l'événement de conversion à Facebook
            sendFacebookConversionEvent($fb_pixel_id, $conversion_api_token, [
                'event_name' => 'Purchase',
                'event_time' => time(),
                'user_data' => [
                    'em' => hash('sha256', strtolower($customer_email)),
                    'fn' => hash('sha256', strtolower(explode(' ', $customer_name)[0])),
                    'ln' => hash('sha256', strtolower(explode(' ', $customer_name)[1] ?? '')),
                ],
                'custom_data' => [
                    'currency' => 'XOF',
                    'value' => $product_price,
                    'content_ids' => [$product_id],
                    'content_name' => $product_name,
                    'content_type' => 'product'
                ]
            ]);
            
            // Rediriger vers la page de remerciement
            $_SESSION['purchase_success'] = true;
            $_SESSION['order_id'] = $order_id;
            $_SESSION['customer_name'] = $customer_name;
            $_SESSION['download_link'] = $download_link;
            
            header("Location: merci.php");
            exit;
        } else {
            $errors[] = 'Le paiement a échoué. Veuillez réessayer ou contacter notre service client.';
        }
    }
    
    // S'il y a des erreurs, les stocker en session pour les afficher
    if (!empty($errors)) {
        $_SESSION['payment_errors'] = $errors;
        header("Location: checkout.php");
        exit;
    }
}

/**
 * Fonction pour traiter le paiement via une passerelle de paiement
 * À remplacer par votre intégration réelle
 */
function processPayment($method, $amount, $order_id) {
    // Intégration simulée - à remplacer par votre passerelle réelle
    // Par exemple, intégration avec Orange Money, Mobile Money, ou PayPal
    
    if ($method === 'orange_money') {
        // Code pour l'intégration avec Orange Money
        return true; // Simuler un paiement réussi
    } elseif ($method === 'mobile_money') {
        // Code pour l'intégration avec Mobile Money
        return true; // Simuler un paiement réussi
    } elseif ($method === 'card') {
        // Code pour l'intégration avec Stripe ou autre processeur de carte
        return true; // Simuler un paiement réussi
    }
    
    return false; // Par défaut, échouer
}

/**
 * Fonction pour enregistrer la vente dans la base de données
 */
function recordSale($data) {
    // Configuration de la base de données
    $db_host = 'localhost';
    $db_name = 'votre_base_de_donnees';
    $db_user = 'votre_utilisateur';
    $db_pass = 'votre_mot_de_passe';
    
    try {
        $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_user, $db_pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $pdo->prepare("
            INSERT INTO sales (order_id, customer_name, customer_email, product_id, product_name, amount, payment_method, purchase_date)
            VALUES (:order_id, :customer_name, :customer_email, :product_id, :product_name, :amount, :payment_method, :date)
        ");
        
        return $stmt->execute($data);
    } catch (PDOException $e) {
        // Log l'erreur
        error_log("Erreur d'enregistrement de vente: " . $e->getMessage());
        return false;
    }
}

/**
 * Fonction pour envoyer l'email de confirmation
 */
function sendConfirmationEmail($email, $name, $order_id, $product_name, $download_link) {
    $subject = "Votre Guide d'Immigration est prêt - Commande #$order_id";
    
    $message = "
    <html>
    <head>
        <title>Votre Guide d'Immigration au Canada</title>
    </head>
    <body>
        <div style='max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;'>
            <div style='background-color: #003366; color: white; padding: 20px; text-align: center;'>
                <h1>Merci pour votre achat, $name!</h1>
            </div>
            
            <div style='padding: 20px; background-color: #f5f5f5;'>
                <p>Nous sommes ravis que vous ayez choisi notre Guide Ultime Pour Immigrer Au Canada.</p>
                
                <p><strong>Détails de votre commande:</strong><br>
                Numéro de commande: #$order_id<br>
                Produit: $product_name<br>
                </p>
                
                <div style='text-align: center; margin: 30px 0;'>
                    <a href='$download_link' style='background-color: #d9534f; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;'>
                        TÉLÉCHARGER VOTRE GUIDE MAINTENANT
                    </a>
                </div>
                
                <p>Voici les étapes à suivre:</p>
                <ol>
                    <li>Cliquez sur le bouton ci-dessus pour télécharger votre guide</li>
                    <li>Consultez notre groupe Telegram privé pour bénéficier de notre soutien</li>
                    <li>Commencez à préparer votre projet d'immigration</li>
                </ol>
                
                <p>Si vous avez des questions, n'hésitez pas à nous contacter sur WhatsApp au +1 579-400-1062.</p>
                
                <p>Nous vous souhaitons beaucoup de succès dans votre projet d'immigration au Canada!</p>
                
                <p>Cordialement,<br>
                L'équipe du Guide Immigration Canada</p>
            </div>
            
            <div style='background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px;'>
                <p>Copyright © 2025 Guide Ultime Pour Immigrer Au Canada. Tous droits réservés.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // En-têtes pour l'email HTML
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Guide Immigration Canada <contact@votredomaine.com>" . "\r\n";
    
    // Envoi de l'email
    return mail($email, $subject, $message, $headers);
}

/**
 * Fonction pour envoyer l'événement de conversion à Facebook
 */
function sendFacebookConversionEvent($pixel_id, $token, $event_data) {
    $endpoint = "https://graph.facebook.com/v15.0/$pixel_id/events";
    
    $data = [
        'data' => [$event_data],
        'access_token' => $token
    ];
    
    $options = [
        'http' => [
            'header'  => "Content-type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($data)
        ]
    ];
    
    $context  = stream_context_create($options);
    $result = file_get_contents($endpoint, false, $context);
    
    return $result !== false;
}
?>
	