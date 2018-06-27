git remote add heroku https://git.heroku.com/pratos-limpos.git
git checkout heroku
git merge heroku master
git add .
git commit -am 'Updating Heroku app'
git push heroku `git subtree split --prefix mobile master`:master --force
heroku open
