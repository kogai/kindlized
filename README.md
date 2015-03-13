# kindlized
Amazonに出品されている物理書籍のKindle化(kindlized)を調べるサービスです。
登録した書籍がKindle化すると、アカウント宛に通知が届きます。

[![Circle CI](https://circleci.com/gh/kogai/kindlized.svg?style=svg)](https://circleci.com/gh/kogai/kindlized)

## 概要
### サービス側(app.js)
1. アカウントを作成する
2. Kindle化通知を希望する書籍を選択する
	- Kindle化通知を書籍毎に選択する
	- Kindle化通知を著者毎に選択する
		- 新しく著者を登録する
			- 入力された文言がAmazonに著者として存在するか照合する
			- 著者が存在したら既存の著者と照合する
			- 新しく登録した著者の書籍を選択する
		- 既存の著者の書籍を選択する
	- Kindle化通知をシリーズ毎に選択する
		- 新しくシリーズを登録する
		- 既存のシリーズを登録する
3. Kindle化通知を希望している書籍を表示する

### データベース側(db.js)
1. amazon production api から書籍の情報を定期的に取得してDBに記録する
2. DB内の書籍がKindle化されているか定期的に調査する
3. Kindle化されていたらアカウントに通知する
