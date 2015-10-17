module.exports = (bookList) ->
  bookList.map (book) ->
    try
      images = JSON.parse(book.images)
      images = images[0].ImageSet[0].MediumImage[0].URL[0]
    catch err
      images = ''
    finally
      book.images = images
    return book
