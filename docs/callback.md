---
title: Auth0 Callback
created: 2024-05-20T19:32
updated: 2024-05-28T22:31
---

<script setup>
import { onMounted } from 'vue';
import { initAuth0 } from './.vitepress/theme/utils/auth/auth.js';

onMounted(async () => {
  const auth0 = await initAuth0();
  if (window.location.search.includes('code=')) {
    try {
      await auth0.handleRedirectCallback();
      // 从localStorage中读取用户登录前的页面URL
      const redirectUrl = localStorage.getItem('preLoginRedirect') || window.location.origin;
      console.log(redirectUrl, 'redirectUrl');
      localStorage.removeItem('preLoginRedirect'); // 清除已使用的重定向URL
      // 重定向回用户登录前的页面
      window.location.replace(redirectUrl);
    } catch (e) {
      console.error(e);
    }
  }
});
</script>

<div class="text-center">
  <p class="text-xl font-semibold text-gray-700">处理登录中...</p>
</div>
