---
title: 魔改一下 VitePress 当个人主页用
date: 2024/10/29
tags:
  - VitePress
  - Vue
---

# 魔改一下 VitePress 当个人主页用

## 序

[我的个人主页](https://tangjiayan.com/) 是基于 VitePress 搭建的，[之前](https://github.com/tangjan/www/tree/0bec649e3d2a45303a4f95026b8511ebf19114aa) 它是长这样的：

![1-old-www](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/10/29/vitepress-www-adaptation/1-old-www.png)

左右不协调，实在是有点丑。

于是我用 [Google Slides](https://workspace.google.com/products/slides/) 简单做了个设计稿：

![2-google-slides-www](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/10/29/vitepress-www-adaptation/2-google-slides-www.png)

以此为目标，研究了一下怎么开发 VitePress 实现设计稿。

## 引入组件

调研了一番和「SNS 链接」「主题切换按钮」相关的组件，最终确定将 [VitePress 官方仓库](https://github.com/vuejs/vitepress/tree/main/src/client/theme-default/components) 中的

- [VPSocialLink.vue](https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/components/VPSocialLink.vue)
- [VPSocialLinks.vue](https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/components/VPSocialLinks.vue)
- [VPSwitch.vue](https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/components/VPSwitch.vue)
- [VPSwitchAppearance.vue](https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/components/VPSwitchAppearance.vue)

这四个组件引入到了我的仓库里。

## MyLayout.vue

根据 [布局插槽](https://vitepress.dev/zh/guide/extending-default-theme#layout-slots) 提供的插槽，测试了一下，选了个合适的插槽 `home-hero-after`，写了个 `MyLayout.vue` 组件：

::: details `MyLayout.vue`

```vue
<script setup>
import DefaultTheme from 'vitepress/theme'

import VPSwitchAppearance from './VPSwitchAppearance.vue'
import VPSocialLinks from './VPSocialLinks.vue'

import { useData } from '../composables/data'
const { theme } = useData()

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <div>
        <VPSocialLinks :links="theme.socialLinks" />
      </div>
      <div class="my_VPSwitch">
        <VPSwitchAppearance />
      </div>
    </template>
  </Layout>
</template>
```

:::

因为 `VPSocialLinks` 组件要用到 `theme.socialLinks`，所以引入了 `theme`。

## 按钮居中

SNS 链接 `VPSocialLinks` 组件 `<style>` 内自带居中 CSS 样式，不用调手动整了。

```vue
<style scoped>
.VPSocialLink {
  display: flex;
  -content: center;
  align-items: center;
}
</style>
```

需要手动调整居中的是切换按钮。

我给切换按钮在 `MyLayout.vue` 中加了个 `my_VPSwitch` 类，然后在 [`custom.css`](https://vitepress.dev/zh/guide/extending-default-theme#customizing-css) 中调整了一下居中和 `padding`。

```css
.my_VPSwitch {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
```

完事。

## 背景图

在做的时候就想好了，要用一张纯白色的线稿作为背景图，这样访客点击切换主题按钮时可以被惊艳一下子。

`╰(￣ω￣ｏ)`

![3-bg](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/10/29/vitepress-www-adaptation/3-bg.png)

在 Google 以 `初音未来 线稿` (`Hatsune Miku Line Art`) 为关键词，随便找了两张 MiKU 的线稿，输入给了 ChatGPT，让它写个脚本处理了一下。

::: details ChatGPT 处理线稿

### Prompt

![4-lineart](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/10/29/vitepress-www-adaptation/4-lineart.png)

白色的部分变为透明，黑色的部分变为白色，发给我，谢谢

### Response

![5-chatgpt-lineart](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/10/29/vitepress-www-adaptation/5-chatgpt-lineart.png)

```py
# Load the new image
image_path = '/mnt/data/image.png'
image_new = Image.open(image_path)

# Convert the image to grayscale
grayscale_image_new = image_new.convert("L")

# Create a new image with an alpha channel (RGBA) based on the grayscale values
transparent_image_new = Image.new("RGBA", grayscale_image_new.size)

# Iterate through each pixel to apply the transformation:
# Convert non-white areas to white and white areas to transparent
for x in range(grayscale_image_new.width):
    for y in range(grayscale_image_new.height):
        pixel = grayscale_image_new.getpixel((x, y))
        # Set white areas (close to 255) to be transparent
        if pixel > 200:
            transparent_image_new.putpixel((x, y), (255, 255, 255, 0))  # Transparent
        else:
            transparent_image_new.putpixel((x, y), (255, 255, 255, 255))  # Solid white

# Save the transformed image
output_path_new = '/mnt/data/converted_image_transparent.png'
transparent_image_new.save(output_path_new)

output_path_new
```

:::

然后估算了一下中间的留白尺寸，用 PS 把两张图片拼接在了一起，设为了 `body` 的背景。

## 尝试用 DALL-E 做图

尝试自己用 ChatGPT 的 DALL-E 做了几张线稿，但效果不是很理想。

::: details 1
![6-DALLE-1](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/10/29/vitepress-www-adaptation/6-DALLE-1.webp)
:::

::: details 2
![7-DALLE-2](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/10/29/vitepress-www-adaptation/7-DALLE-2.webp)
:::

::: details 3
![8-DALLE-3](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/10/29/vitepress-www-adaptation/8-DALLE-3.webp)
:::

::: details 4
![9-DALLE-4](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/10/29/vitepress-www-adaptation/9-DALLE-4.webp)
:::

::: details 5
![10-DALLE-5](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/10/29/vitepress-www-adaptation/10-DALLE-5.png)
:::

[Stable Diffusion](https://zh.wikipedia.org/zh-cn/Stable_Diffusion) 在研究了。
