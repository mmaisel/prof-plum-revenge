# Clue-Less
###### Team Professor Plum's Revenge
_JHU EN.605.401.81, Spring 2014_

## Requirements and Installation

**Dependencies**

1. SSH - [OpenSSH](http://sourceforge.net/projects/sshwindows/files/OpenSSH%20for%20Windows%20-%20Release/3.8p1-1%2020040709%20Build/setupssh381-20040709.zip/download)

**Development Tools**

1. Development Environment - [Vagrant](http://www.vagrantup.com/)
2. VM Provider - [VirtualBox](https://www.virtualbox.org/)
3. Version Control - [Git](http://gitscm.com/)

## Usage
Stand up development environment.

VM ssh passphrase associated with private key is null. Just hit Enter when prompted.

VM ssh password is "vagrant" (without the quotes).

```
    vagrant up
    vagrant ssh
    cd /vagrant
    sudo bash bin/install.sh  ##first time only
    sudo play
    ~ run
```

On a windows machine, you will have to fix the install.sh file line terminaters.  The easiest way to do this is in vim.

```
   vim /vagrant/bin/install.sh
   :set ff=unix
   :w
   :q
```

Back on your host OS, the Play web server running on the Vagrant VM should be forwarded to localhost:8080 in your browser.

## Cluelesss Server

To run Clueless Server, package with Maven and run. Right right only UnitTest

```

    maven package

    java -cp target/clueless-server-1.0-SNAPSHOT.jar edu.jhu.jwill215.cluelessserver.UnitTest


```

This file will be packaged with your application, when using `play dist`.

## Authors
+ Jack Willard
+ Andrew Fife
+ Matthew Maisel
+ Bryan Carpenter
