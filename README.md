# kindlized
Amazonに出品されている物理書籍のKindle化(kindlized)を調べるサービスです。
登録した書籍がKindle化すると、アカウント宛に通知が届きます。

## 概要
- サービス側(app.js)
	1. アカウントを作成する
	2. Kindle化通知を希望する書籍を選択する
	3. Kindle化通知は著者毎 / シリーズ毎に登録できる
- データベース側(db.js)
	1. amazon production api から書籍の情報を定期的に取得してDBに記録する
	2. DB内の書籍がKindle化されているか定期的に調査する
	3. Kindle化されていたらアカウントに通知する