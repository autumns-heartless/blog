# 1.项目难点

## 1.1.高德地图用户定位，范围打卡

### 1.1.1.需求

获取用户所在位置和采集点以及采集范围，判断用户的位置是否在采集范围内，如果在就允许采集，不在则不允许

### 1.1.2.实现

#### 1.1.2.1.定位

```vue
uni.getLocation({ type: "gcj02", //返回可以用于uni.openLocation的经纬度 geocode: true, success:
function (res) { that.loc.latitude = res.latitude; that.loc.longitude = res.longitude; that.address
=
`${res.address.province}${res.address.city}${res.address.district}${res.address.street}${res.address.streetNum}${res.address.poiName}${res.address.cityCode}`;
}, });
```

服务平台一定要选择<font style="color:#DF2A3F;">Android 平台</font>，否则 uni.getLocation({ type: 'gcj02' })不支持

![](https://cdn.nlark.com/yuque/0/2024/png/38473181/1728715386688-8dd8ba98-cf9b-4dea-8f8f-c8fa5840579c.png)

选择完成之后在 manifest.json 的 App 模块配置即可

![](https://cdn.nlark.com/yuque/0/2024/png/38473181/1728715634991-de4e37ff-541b-4732-a732-ead323fb5416.png)

:::color4
注意：这种方法只支持 Android app

:::

#### 1.1.2.2.地图展示、范围打卡

采集点位置经纬度、采集点范围、用户位置经纬度都获取到了

接下来只需要计算两个经纬度直接的距离然后判断它是否大于这个采集范围的圆的半径

```vue
// 计算两个经纬度点之间的距离（单位：米） calculateDistance(lat1, lon1, lat2, lon2) { const toRad =
(value) => (value * Math.PI) / 180; const R = 6371000; // 地球半径，单位：米 const dLat = toRad(lat2
- lat1); const dLon = toRad(lon2 - lon1); const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2); const c = 2
* Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); return R * c; },
```

```vue
// 判断点是否在圆内 const distance = this.calculateDistance( op.latitude, op.longitude,
op.clatitude, op.clongitude ); if (distance > op.radius) { uni.showToast({ title:
"您当前的位置不在采集点范围内", icon: "none", }); return }
```

## 1.2.地图搜索选点

直接上链接，好用哈哈哈哈哈

[高德地图--地图选点插件 - DCloud 插件市场](https://ext.dcloud.net.cn/plugin?id=16882)

## 1.3.全局悬浮窗

都很好用哇，记录一下

[全局悬浮按钮拖拽框自动吸边自定义图片等 - DCloud 插件市场](https://ext.dcloud.net.cn/plugin?id=16026)

[全局悬浮球悬浮按钮可拖动自动吸边 - DCloud 插件市场](https://ext.dcloud.net.cn/plugin?id=16264)
