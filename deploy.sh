yarn build;
# there is only 1 js chunk
for i in ./dist/assets/*.js;
  do
    scp "$i" root@179.43.160.204:/data/scripts/weather-widget.min.js
  done;

echo "SUCCESS";
