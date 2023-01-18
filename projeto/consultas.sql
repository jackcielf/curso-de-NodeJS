/* Criando tabela (MySql) */
CREATE TABLE usuarios (
    nome VARCHAR(50),
    email VARCHAR(50),
    idade INT
);

/* Add usuarios na tabela (MySql) */
INSERT INTO usuarios(nome, email, idade) VALUES ("Jack", "jack@gmail.com", 17);
INSERT INTO usuarios(nome, email, idade) VALUES ("Ana", "ana@gmail.com", 19);
INSERT INTO usuarios(nome, email, idade) VALUES ("Maria", "maria@gmail.com", 22);
INSERT INTO usuarios(nome, email, idade) VALUES ("Joao", "joao@gmail.com", 10);
INSERT INTO usuarios(nome, email, idade) VALUES ("Pedro", "pedro@gmail.com", 13);

/* Removendo usuarios na tabela (MySql) */
DELETE FROM usuarios WHERE email = "pedro@gmail.com";

/* Atualizando dados de usuarios na tabela (MySql) */
UPDATE usuarios SET nome = "Jackciel" WHERE nome = "Jack";