# Clue-Less
###### Team Professor Plum's Revenge
_JHU EN.605.401.81, Spring 2014_

## Requirements and Installation

**Development Tools**

1. Development Environment - [Vagrant](http://www.vagrantup.com/)
2. VM Provider - [VirtualBox](https://www.virtualbox.org/)
3. Version Control - [Git](http://gitscm.com/)

## Usage
Stand up development environment
```
    vagrant up
    vagrant ssh
    cd /vagrant
    sudo bash bin/install.sh
    sudo play
    ~ run
```

Back on your host OS, the Play web server running on the Vagrant VM should be forwarded to localhost:8080 in your browser.

## Play Commands

This file will be packaged with your application, when using `play dist`.

## Authors
+ Jack Willard
+ Andrew Fife
+ Matthew Maisel
+ Bryan Carpenter
