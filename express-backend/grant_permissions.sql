-- Este comando concede permissões ao usuário seu_usuario para o banco de dados sua_base_de_dados
GRANT CREATE, ALTER, DROP, SELECT, INSERT, UPDATE, DELETE ON sua_base_de_dados.* TO 'seu_usuario'@'%';
-- Este comando atualiza as permissões imediatamente
FLUSH PRIVILEGES;