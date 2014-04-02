#!/bin/sh
# Vagrant provisioning installer


# install JDK and other deps
sudo add-apt-repository --yes ppa:webupd8team/java

sudo apt-get update -y
sudo apt-get install -y oracle-java7-installer unzip --quiet

# install play framework
wget http://downloads.typesafe.com/play/2.2.2/play-2.2.2.zip
unzip -d /opt play-2.2.2.zip
sudo chmod +x /opt/play-2.2.2/play
sudo ln -s /opt/play-2.2.2/play /usr/bin/play