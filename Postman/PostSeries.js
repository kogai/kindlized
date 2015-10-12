/*
1. Seriesコレクションから新刊を持った(hasNewReleaseな)シリーズ配列を取得
2. [1]から[{
  seriesId, // シリーズID
  newReleases, // 新刊書籍IDの配列
}]を生成
2.1. [1]から[...seriesId]を生成
3. 各ユーザーに対して処理を開始
4. UserコレクションのSeriesListプロパティに$in: [...seriesId]なシリーズを取得
5. [2]からBookコレクションを経由して新刊書籍リストを生成
6. メール配信処理
*/
class PostSeries {

}

export default PostSeries;
export const postSeries = new PostSeries();
