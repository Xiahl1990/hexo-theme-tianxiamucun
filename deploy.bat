@echo off
start cmd /k "hexo version&&hexo clean&&rm -rf .deploy_git db.json&&hexo deploy"
