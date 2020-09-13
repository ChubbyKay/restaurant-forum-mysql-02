// 此檔案作用為處理 使用者 前台餐廳相關的request

// restController 是一個物件
const restController = {
  // getRestaurants 是 restController 的其中一個屬性
  // getRestaurants 是個函式，負責瀏覽餐廳頁面
  getRestaurants: (req, res) => {
    return res.render('restaurants')
  }
}
module.exports = restController