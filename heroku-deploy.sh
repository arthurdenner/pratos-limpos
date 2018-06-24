git add .
git commit -am 'Updating Heroku app'
git subtree push --prefix mobile heroku master
heroku open
