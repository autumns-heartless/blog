/**
 * 获取随机ID
 * @param {*} length
 * @returns
 */
export function randomID(length = 6) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}

const COLORS = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399']

function getRandomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomColor() {
  return COLORS[getRandomNum(0, 4)]
}

const website = 'https://wanderprints.com'
// const website = 'https://www.getphotoblanket.com';

const variants = [
  {
    "id": 41206819192914,
    "title": "Glass / 2.76in",
    "option1": "Glass",
    "option2": "2.76in",
    "option3": null,
    "sku": "CGQD269NGO2759-2.76in",
    "requires_shipping": true,
    "taxable": false,
    "featured_image": {
      "id": 31784271741010,
      "product_id": 7391803048018,
      "position": 1,
      "created_at": "2024-09-26T00:36:20-07:00",
      "updated_at": "2024-09-26T00:36:22-07:00",
      "alt": "Christmas,Family,Happy - Funny Marshmallow Hot Cocoa Cup - Personalized Circle Glass Ornament",
      "width": 1000,
      "height": 1000,
      "src": "https://cdn.shopify.com/s/files/1/2418/2505/files/QD269-NGO2759-MockupDF.webp?v=1727336182",
      "variant_ids": [41206819192914, 41206819225682]
    },
    "available": true,
    "price": "15.95",
    "grams": 0,
    "compare_at_price": null,
    "position": 1,
    "product_id": 7391803048018,
    "created_at": "2024-09-26T00:36:00-07:00",
    "updated_at": "2024-09-26T02:36:32-07:00"
  }
]

export const getList = ({ page = 1, pageSize = 20 }) => {
  // const jsonUrl = `${website}/products.json?page=${page}&limit=${pageSize}`
  const jsonUrl = '/baby.json'; // 修改为本地 JSON 文件的路径
  const imageBaseUrl = 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/';
  let random = Math.random() > 0.1;
  return fetch(jsonUrl)
    .then(res => res.json())
    .then(res => res.products).then((res) => {
      return res.map((item: any) => {
        return {
          id: randomID(),
          star: false,
          price: variants[0].price,
          src: {
            original: random ? `${imageBaseUrl}${item.src}` : `${imageBaseUrl}images/411526.jpg`,
            // original: 'https://tq-alg-public.s3.us-west-2.amazonaws.com/kol/Seraphina_1702987997_0.png',
          },
          backgroundColor: randomColor(),
          name: random ? item.title : '不要乱碰爸爸电脑~',
        }
      })
    })
}
