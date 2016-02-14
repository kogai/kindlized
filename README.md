# kindlized
Amazonに出品されている物理書籍のKindle化(kindlized)を調べるサービスです。
登録した書籍がKindle化すると、アカウントのメールアドレス宛に通知が届きます。

[![Circle CI](https://circleci.com/gh/kogai/kindlized.svg?style=svg)](https://circleci.com/gh/kogai/kindlized)

## 開発

```bash
./d npm server install some-module
```

### 開発用サーバーの起動

```bash
docker-compose up server client
```

### DBへのログイン

```bash
# 事前にmongod(mongodb daemon)を立ち上げておく
docker-compose up -d mognod
```

```bash
docker-compose run mongod mongo --host $DOCKER_IP
```

### DBバックアップのリストア

```bash
docker-compose run mongod mongorestore -h $DOCKER_IP:27017 --db kindlized /tmp/dump
```