#!/bin/bash

#Read config file which dictates which plugin will be run
PLUGIN_CONFIG="/home/topi/Weather/plugins/plugin-setting.json"


TYPE=$(jq -r '._pluginType' "$PLUGIN_CONFIG")

echo "Plugin type is: $TYPE"

if [ "$TYPE" == "Weather" ]; then
# Activate virtual environment
cd /home/topi/Weather/inky
source inky-env/bin/activate
echo "IN WEATHER"
echo "$TYPE"
cd /home/topi/Weather/plugins/Weaherly
node Run_and_save.js
# Run your Python script
python3 /home/topi/Weather/inky/examples/7color/image.py --file /home/topi/Weather/inky/examples/7color/dashboard.png

elif [ "$TYPE" == "Diashow" ]; then
#
cd /home/topi/Weather/inky
source inky-env/bin/activate
python3 /home/topi/Weather/plugins/Diashow/setDiaShow.py
else 
  echo "Plugin type is not supported..."
fi
