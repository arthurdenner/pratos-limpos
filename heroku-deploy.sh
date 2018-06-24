git remote add heroku https://git.heroku.com/pratos-limpos.git
git add .
git commit -am 'Updating Heroku app'
git subtree push --prefix mobile heroku master
heroku open
