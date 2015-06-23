# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  Encoding.default_external = 'UTF-8'
  config.vm.box = "ubuntu.14"
  config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.network "forwarded_port", guest: 27017, host: 27017
  config.vm.box_check_update = true

  config.vm.provision "shell", :path => "./sh/provision.sh"
  config.vm.provider :virtualbox do |vb|
    vb.memory = "4096"
  end
end
