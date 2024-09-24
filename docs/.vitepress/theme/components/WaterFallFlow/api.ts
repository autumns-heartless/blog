/*
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-14 13:34:56
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-09-21 09:23:25
 */

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

export const getList = ({ page = 1, pageSize = 20 }) => {
  const url = `${website}/products.json?page=${page}&limit=${pageSize}`
  return fetch(url)
    .then(res => res.json())
    .then(res => res.products).then((res) => {
      return res.map((item: any) => {
        return {
          id: randomID(),
          star: false,
          price: item.variants[0].price,
          src: {
            original: Math.random() > 0.1 ? item.images[0].src : 'https://www.example.com/non-existent-image.jpg',
            // original: 'https://tq-alg-public.s3.us-west-2.amazonaws.com/kol/Seraphina_1702987997_0.png',
          },
          backgroundColor: randomColor(),
          name: item.title,
        }
      })
    })
}
