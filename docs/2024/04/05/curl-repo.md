---
title: 安装 curl 时遇到的软件源问题
date: 2024/04/05
tags:
  - Debian
  - debug
---

# 安装 curl 时遇到的软件源问题

## 目标

为了更新 v2ray 服务端，根据 [v2fly/fhs-install-v2ray](https://github.com/v2fly/fhs-install-v2ray)，需要执行以下指令：

```shell
bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh)
```

然而，在执行命令时提示 `curl: command not found`

```
# bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh)

-bash: curl: command not found
```

也就是说 curl 还没安装，需要安装 [curl](https://curl.se/) 。

## 问题

使用 `apt install curl` 安装 curl，然后就提示了报错信息

```
# apt install curl

Reading package lists... Done
Building dependency tree
Reading state information... Done
The following additional packages will be installed:
  libcurl4
The following NEW packages will be installed:
  curl libcurl4
0 upgraded, 2 newly installed, 0 to remove and 0 not upgraded.
Need to get 601 kB of archives.
After this operation, 1,127 kB of additional disk space will be used.
Do you want to continue? [Y/n] y
Err:1 http://security.debian.org/debian-security buster/updates/main amd64 libcurl4 amd64 7.64.0-4+deb10u6
  404  Not Found [IP: 146.75.94.132 80]
Err:2 http://security.debian.org/debian-security buster/updates/main amd64 curl amd64 7.64.0-4+deb10u6
  404  Not Found [IP: 146.75.94.132 80]
E: Failed to fetch http://security.debian.org/debian-security/pool/updates/main/c/curl/libcurl4_7.64.0-4+deb10u6_amd64.deb  404  Not Found [IP: 146.75.94.132 80]
E: Failed to fetch http://security.debian.org/debian-security/pool/updates/main/c/curl/curl_7.64.0-4+deb10u6_amd64.deb  404  Not Found [IP: 146.75.94.132 80]
E: Unable to fetch some archives, maybe run apt-get update or try with --fix-missing?
```

## 解决

根据 Stack Exchange 的 [这篇回答](https://unix.stackexchange.com/questions/743839/apt-get-update-failed-to-fetch-debian-amd64-packages-while-building-dockerfile-f)，了解到是 [软件源](https://en.wikipedia.org/wiki/Software_repository) 的问题。

不过这篇回答提到要把软件源更改为 `archive.debian.org` ，但那是 `Debian 9` 的软件源，而我的系统是 `Debian 10`

```
# cat /etc/os-release

PRETTY_NAME="Debian GNU/Linux 10 (buster)"
NAME="Debian GNU/Linux"
VERSION_ID="10"
VERSION="10 (buster)"
VERSION_CODENAME=buster
ID=debian
HOME_URL="https://www.debian.org/"
SUPPORT_URL="https://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"
```

所以我尝试使用以下指令设置软件源为 `http://deb.debian.org/debian`

```shell
echo "deb http://deb.debian.org/debian buster main" > /etc/apt/sources.list
```

然后再执行 `apt install curl`，就成功了

```
# apt install curl

Reading package lists... Done
Building dependency tree
Reading state information... Done
The following additional packages will be installed:
  libcurl4
The following NEW packages will be installed:
  curl libcurl4
0 upgraded, 2 newly installed, 0 to remove and 0 not upgraded.
Need to get 597 kB of archives.
After this operation, 1,125 kB of additional disk space will be used.
Do you want to continue? [Y/n] y
Get:1 http://deb.debian.org/debian buster/main amd64 libcurl4 amd64 7.64.0-4+deb10u2 [332 kB]
Get:2 http://deb.debian.org/debian buster/main amd64 curl amd64 7.64.0-4+deb10u2 [265 kB]
Fetched 597 kB in 0s (4,978 kB/s)
Selecting previously unselected package libcurl4:amd64.
(Reading database ... 34038 files and directories currently installed.)
Preparing to unpack .../libcurl4_7.64.0-4+deb10u2_amd64.deb ...
Unpacking libcurl4:amd64 (7.64.0-4+deb10u2) ...
Selecting previously unselected package curl.
Preparing to unpack .../curl_7.64.0-4+deb10u2_amd64.deb ...
Unpacking curl (7.64.0-4+deb10u2) ...
Setting up libcurl4:amd64 (7.64.0-4+deb10u2) ...
Setting up curl (7.64.0-4+deb10u2) ...
Processing triggers for man-db (2.8.5-2) ...
Processing triggers for libc-bin (2.28-10+deb10u2) ...
```
