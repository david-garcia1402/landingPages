<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'erro' => 'Método não permitido']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    $data = $_POST;
}

$nome = isset($data['nome']) ? trim($data['nome']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$telefone = isset($data['telefone']) ? trim($data['telefone']) : '';
$mensagem = isset($data['mensagem']) ? trim($data['mensagem']) : '';
$procedimento = isset($data['procedimento']) ? trim($data['procedimento']) : null;

if (strlen($nome) < 2) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'erro' => 'Nome inválido']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'erro' => 'E-mail inválido']);
    exit;
}

$telefone = preg_replace('/\D/', '', $telefone);
if (strlen($telefone) < 10) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'erro' => 'Telefone inválido']);
    exit;
}

$host = getenv('DB_HOST') ?: 'localhost';
$user = getenv('DB_USER') ?: 'root';
$pass = getenv('DB_PASS') ?: '';
$name = getenv('DB_NAME') ?: 'clinica_estetica';

try {
    $pdo = new PDO(
        "mysql:host={$host};dbname={$name};charset=utf8mb4",
        $user,
        $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'erro' => 'Erro de conexão']);
    exit;
}

$sql = 'INSERT INTO las_leads_clinica (nome, email, telefone, mensagem, procedimento_interesse, origem) VALUES (?, ?, ?, ?, ?, ?)';
$stmt = $pdo->prepare($sql);
$stmt->execute([
    $nome,
    $email,
    $telefone,
    $mensagem ?: null,
    $procedimento ?: null,
    'site'
]);

echo json_encode(['ok' => true, 'id' => (int) $pdo->lastInsertId()]);
