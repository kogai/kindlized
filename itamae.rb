# DB関連のインストール

execute 'gen public key' do
  command "sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10"
  not_if "which mongo"
end

execute 'make list' do
  command 'echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list'
  not_if "which mongo"
end

execute 'reload' do
  user 'root'
  command "apt-get update"
  not_if "which mongo"
end

package "mongodb-org" do
  action :install
  not_if "which mongo"
end

service "mongod" do
  user "root"
  action :start
end

execute 'wait for starting mongod-service' do
  command "wait"
end

execute 'create DB and User' do
  user "root"
  command "mongo /vagrant/mongoshell.js"
  not_if "mongo kindlized"
end

execute 'import' do
  command "mongorestore -h 127.0.0.1:27017 -d kindlized -u root -p root /vagrant/kindlized"
  not_if "mongo kindlized"
end


# サーバー関連のインストール

execute 'fetch specific node' do
  user "root"
  command "curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -"
  not_if "which node"
end

package 'nodejs' do
  action :install
  not_if "which node"
end

package 'nginx' do
  action :install
  not_if "which nginx"
end

remote_file "/etc/nginx/nginx.conf" do
  owner "root"
  group "root"
  source "conf/nginx.conf"
end

service "nginx" do
  user "root"
  action :start
  only_if "which nginx"
end

execute 'wait for starting nginx-service' do
  command "wait"
end

remote_file "/home/vagrant/.bash_profile" do
  owner "root"
  group "root"
  source "conf/.bash_profile"
end
