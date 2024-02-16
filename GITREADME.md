
# Configuração inicial GIT

````
git clone https://github.com/luan-nvg/jira
````

### Checkout sempre que for trocar de branch

````
git checkout -b develop/(modulo em que vai mexer)
````

### Pull para garantir que está de acordo com a main

````
git pull origin main
````

## Commits Pós alterações

````
git commit -m (alteração de feature) "feat(modulo): mudança ocorrida"
````

````
git commit -m (conserto de feature ou sistema) "fix(modulo): mudança ocorrida"
````

````
git commit -m (estilo do frontend) "style(modulo): mudança ocorrida"
````

````
git commit -m (mudança core do sistema) "chore(modulo): mudança ocorrida"
````

## Push Pós alteração

````
(primeiro push) git push --set-upstream origin develop/(modulo que está mexendo)
````

````
(restante dos pushs) git push
````