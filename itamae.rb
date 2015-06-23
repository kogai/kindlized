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


# サーバー関連のインストール

execute 'Install nvm' do
  user "root"
  command "curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash"
  not_if "which nvm"
end

execute 'wait for installing nvm' do
  command "wait"
end

# execute 'Install iojs' do
#   user "root"
#   command "nvm install iojs-v2.3.0 && nvm alias default iojs-v2.3.0"
# end

remote_file "/home/vagrant/.bash_profile" do
  owner "root"
  group "root"
  source "conf/.bash_profile_development"
  only_if 'test -d /home/vagrant/'
  not_if 'test -e /home/vagrant/.bash_profile'
end

remote_file "/root/.bash_profile" do
  owner "root"
  group "root"
  source "conf/.bash_profile"
  only_if 'test -d /root/'
  not_if 'test -e /root/.bash_profile'
end

# execute 'create DB and User' do
#   user "root"
#   command "mongo /vagrant/conf/mongo.js"
#   only_if "mongo"
# end
#
# execute 'import' do
#   command "mongorestore -h 127.0.0.1:27017 -d kindlized -u <user> -p <password> /vagrant/backups/kindlized"
#   only_if "mongo"
# end
