module.exports = (bookList) ->
  bookList.map (book) ->
    images = JSON.parse(book.images)
    book.images = images[0].ImageSet[0].MediumImage[0].URL

# {
#     "_id": {
#         "$oid": "54fd3040d1ceb21d6b673238"
#     },
#     "images": "[{\"ImageSet\":[{\"$\":{\"Category\":\"primary\"},\"SwatchImage\":[{\"URL\":[\"http://ecx.images-amazon.com/images/I/5141g9qTBGL._SL30_.jpg\"],\"Height\":[{\"_\":\"30\",\"$\":{\"Units\":\"pixels\"}}],\"Width\":[{\"_\":\"20\",\"$\":{\"Units\":\"pixels\"}}]}],\"SmallImage\":[{\"URL\":[\"http://ecx.images-amazon.com/images/I/5141g9qTBGL._SL75_.jpg\"],\"Height\":[{\"_\":\"75\",\"$\":{\"Units\":\"pixels\"}}],\"Width\":[{\"_\":\"50\",\"$\":{\"Units\":\"pixels\"}}]}],\"ThumbnailImage\":[{\"URL\":[\"http://ecx.images-amazon.com/images/I/5141g9qTBGL._SL75_.jpg\"],\"Height\":[{\"_\":\"75\",\"$\":{\"Units\":\"pixels\"}}],\"Width\":[{\"_\":\"50\",\"$\":{\"Units\":\"pixels\"}}]}],\"TinyImage\":[{\"URL\":[\"http://ecx.images-amazon.com/images/I/5141g9qTBGL._SL110_.jpg\"],\"Height\":[{\"_\":\"110\",\"$\":{\"Units\":\"pixels\"}}],\"Width\":[{\"_\":\"73\",\"$\":{\"Units\":\"pixels\"}}]}],\"MediumImage\":[{\"URL\":[\"http://ecx.images-amazon.com/images/I/5141g9qTBGL._SL160_.jpg\"],\"Height\":[{\"_\":\"160\",\"$\":{\"Units\":\"pixels\"}}],\"Width\":[{\"_\":\"106\",\"$\":{\"Units\":\"pixels\"}}]}],\"LargeImage\":[{\"URL\":[\"http://ecx.images-amazon.com/images/I/5141g9qTBGL.jpg\"],\"Height\":[{\"_\":\"500\",\"$\":{\"Units\":\"pixels\"}}],\"Width\":[{\"_\":\"332\",\"$\":{\"Units\":\"pixels\"}}]}]}]}]",
#     "is_kindlized": false,
#     "url": "http://www.amazon.co.jp/%E5%AF%84%E7%94%9F%E7%8D%A3%EF%BC%88%EF%BC%97%EF%BC%89-%E5%B2%A9%E6%98%8E%E5%9D%87-ebook/dp/B009KWUILA%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB009KWUILA",
#     "price": [
#         {
#             "FormattedPrice": [
#                 "￥ 500"
#             ],
#             "CurrencyCode": [
#                 "JPY"
#             ],
#             "Amount": [
#                 "500"
#             ]
#         }
#     ],
#     "publicationDate": [
#         "2014-09-09"
#     ],
#     "publisher": [
#         "講談社"
#     ],
#     "title": [
#         "新装版 寄生獣(7) (KCデラックス アフタヌーン)"
#     ],
#     "author": [
#         "岩明 均"
#     ],
#     "EAN": [
#         "9784063770605"
#     ],
#     "ASIN": [
#         "4063770605"
#     ],
#     "__v": 0,
#     "AuthorityASIN": [
#         "B000ATE1MO"
#     ],
#     "lastModified": {
#         "$date": "2015-03-18T12:26:02.878Z"
#     },
#     "isKindlized": true,
#     "isKindlizedUrl": true
# }
