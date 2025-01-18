<template>
  <div class="timeline-wrap">
    <!-- 时间轴头部 -->
    <div class="timeline-header">
      <a-tag v-if="$category" class="content" closable @close="goToLink('/archives')">
        {{ $category }} (共 {{ $articleData.length }} 篇)
      </a-tag>
      <a-tag v-else-if="$tag" class="content" closable @close="goToLink('/archives')">
        {{ $tag }} (共 {{ $articleData.length }} 篇)
      </a-tag>
      <a-tag v-else-if="$year" class="content" closable @close="goToLink('/archives')">
        {{ $year }}年 (共 {{ $articleData.length }} 篇)
      </a-tag>
      <a-tag v-else class="content">共 {{ articleData.length }} 篇，未完待续······</a-tag>
    </div>

    <!-- 时间轴主体 -->
    <div class="timeline-item" v-for="(item, year) in archiveData">
      <div class="year">
        <img
          class="chinese-zodiac"
          @click="goToLink('/archives', 'year', String(year).replace('年', ''))"
          :src="
            '/images/svg/chinese-zodiac/' +
            getChineseZodiac(String(year).replace('年', '')) +
            '.svg'
          "
          :title="getChineseZodiacAlias(String(year).replace('年', ''))"
          alt="生肖"
        />
        <span>{{ year }}</span>
      </div>
      <div class="timeline-item-content">
        <div v-for="(articles, month) in item">
          <span class="month">
            {{ month }}
          </span>
          <div class="articles">
            <span v-for="article in articles" class="article">
              <svg
                role="img"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                class="arco-icon arco-icon-bug"
                stroke-width="4"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                style="color: #39c5bb"
              >
                <path
                  d="M16.734 12.686 5.42 24l11.314 11.314m14.521-22.628L42.57 24 31.255 35.314M27.2 6.28l-6.251 35.453"
                ></path>
              </svg>
              <a class="title" @click="handleToNewPage(article.path)">{{ article.title }}</a>
              <br />
              <ArchiveMetaData :article="article" />
            </span>
          </div>
        </div>
      </div>
      <div id="main"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  getQueryParam,
  goToLink,
  getChineseZodiac,
  getChineseZodiacAlias,
} from '../utils/archive/archive'
import { data as articleData } from '../utils/archive/article.data.js'
import ArchiveMetaData from './ArchiveMetaData.vue'

// 文章原始数据和归档数据
let $articleData: any
let archiveData: any

// 要筛选的分类、标签、年份
let $category: any
let $tag: any
let $year: any

/**
 * 初始化时间轴
 */
function initTimeline() {
  $articleData = []
  archiveData = {}

  // 如果URL路径有category或tag或year参数, 默认筛选出指定category或tag或year的文章数据
  // 例如: /archives?category=Bug万象集
  // 例如: /archives?tag=JVM
  // 例如: /archives?year=2020
  $category = getQueryParam('category')
  $tag = getQueryParam('tag')
  $year = getQueryParam('year')
  if ($category && $category.trim() != '') {
    for (let i = 0; i < articleData.length; i++) {
      let article = articleData[i]
      if (article.categories && article.categories.includes($category)) {
        $articleData.push(article)
      }
    }
  } else if ($tag && $tag.trim() != '') {
    for (let i = 0; i < articleData.length; i++) {
      let article = articleData[i]
      if (article.tags && article.tags.includes($tag)) {
        $articleData.push(article)
      }
    }
  } else if ($year && $year.trim() != '') {
    for (let i = 0; i < articleData.length; i++) {
      let article = articleData[i]
      if (article.date && new Date(article.date).getFullYear() == $year) {
        $articleData.push(article)
      }
    }
  } else {
    $articleData.push(...articleData)
  }

  // 文章数据归档处理
  // 1.对文章数据进行降序排序
  $articleData.sort((a: any, b: any) => b.date.localeCompare(a.date))
  // 2.按年、月进行归档
  for (let i = 0; i < $articleData.length; i++) {
    const article = $articleData[i]
    let year = new Date(article.date).getFullYear() + '年'
    let month = new Date(article.date).getMonth() + 1 + '月'

    if (!archiveData[year]) {
      archiveData[year] = {}
    }
    if (!archiveData[year][month]) {
      archiveData[year][month] = []
    }

    archiveData[year][month].push(article)
  }
}
initTimeline()

/* 跳转到新页面 */
function handleToNewPage(url: string) {
  const path = url.replace('archiving/', '')
  window.open(path, '_blank')
}
</script>

<style scoped>
:deep(.arco-tag) {
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
:deep(.arco-icon) {
  width: 1em;
  height: 1em;
}

.timeline-wrap {
  margin-top: 18px;
  word-break: break-all;
}

.timeline-wrap .timeline-header {
  padding-bottom: 20px;
}

.timeline-wrap .timeline-header .icon {
  fill: var(--vp-c-text-2);
  height: 22px;
  width: 22px;
}

.timeline-wrap .timeline-header .content {
  position: relative;
  left: -17px;
  font-size: 16px;
}

.timeline-wrap .timeline-item {
  padding: 0 0 0 20px;
  border-left: 1px solid #5d9df0;
  line-height: 1;
  position: relative;
}

.timeline-wrap .timeline-item:not(:last-child) {
  padding-bottom: 20px;
}

.timeline-wrap .timeline-item .year {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.6em;
}

.chinese-zodiac {
  display: inline-block;
  width: 20px;
  height: 20px;
  position: absolute;
  left: -10.5px;
  top: -1px;
  background: #fff;
  border: 1px solid #84b9e5;
  border-radius: 50%;
  cursor: pointer;
}

.timeline-wrap .timeline-item .timeline-item-time {
  margin-bottom: 12px;
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timeline-wrap .timeline-item .month {
  padding: 8px 0 8px 0;
  display: block;
  color: var(--vp-c-text-1);
  font-size: 16px;
  font-weight: bold;
  position: relative;
}

.timeline-wrap .timeline-item .timeline-item-content {
  font-size: 14px;
}

.timeline-wrap .timeline-item .articles {
  line-height: 1;
  padding-top: 7px;
}

.timeline-wrap .timeline-item .articles .article {
  display: block;
  position: relative;
  margin-bottom: 20px;
  line-height: 1.5;
}

.timeline-wrap .timeline-item .articles svg {
  position: absolute;
  left: -27.5px;
  top: 3.5px;
  background: #fff;
  border: 1px solid #84b9e5;
  border-radius: 50%;
  cursor: pointer;
}

.timeline-wrap .timeline-item .articles .article span {
  color: var(--vp-c-text-2);
}

.vp-doc a {
  font-weight: 400;
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.vp-doc a:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}
</style>
