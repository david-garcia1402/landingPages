-- Tabela de leads para captura via formulário (opcional)
-- Executar no MySQL

CREATE TABLE IF NOT EXISTS las_leads_clinica (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  mensagem TEXT,
  procedimento_interesse VARCHAR(100) DEFAULT NULL,
  origem VARCHAR(50) DEFAULT 'site',
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_criado (criado_em),
  INDEX idx_telefone (telefone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
