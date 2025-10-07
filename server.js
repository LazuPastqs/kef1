import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { Worker } from "worker_threads";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));


const PORT = 3000;

const headers_token = {
    'accept': '*/*',
    'accept-language': 'ru-RU, ru',
    'cache-control': 'no-cache',
    'expires': '-1',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://dostavka.yandex.ru/account/create',
    'sec-ch-ua': '"Chromium";v="136", "YaBrowser";v="25.6", "Not.A/Brand";v="99", "Yowser";v="2.5"',
    'sec-ch-ua-arch': '"x86"',
    'sec-ch-ua-bitness': '"64"',
    'sec-ch-ua-full-version-list': '"Chromium";v="136.0.7103.425", "YaBrowser";v="25.6.2.425", "Not.A/Brand";v="99.0.0.0", "Yowser";v="2.5"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-ch-ua-platform-version': '"10.0.0"',
    'sec-ch-ua-wow64': '?0',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 YaBrowser/25.6.0.0 Safari/537.36',
    'x-application-version': '2025.478.0',
    'x-b2b-client-id': '5fccc6fd87e947169f743f8294e4695b',
    'x-requested-uri': 'https://dostavka.yandex.ru/account/create',
    'y-browser-experiments': 'MTI3MDYyOSwwLC0xOzExMTQyNTgsMCwtMQ==',
};

const cookies_token = {
    'yandexuid': '641629441730561845',
    'yashr': '8790435691730561845',
    'yuidss': '641629441730561845',
    'ymex': '2045921847.yrts.1730561847',
    'gdpr': '0',
    '_ym_uid': '1730561847432703436',
    'amcuid': '4318871511730626135',
    'font_loaded': 'YSv1',
    'skid': '7503702321733499037',
    'delivery_lang': 'ru',
    '_ym_d': '1746809004',
    'yandex_gid': '10723',
    'my': 'YysBqeMA',
    'delivery_client_id': '5fccc6fd87e947169f743f8294e4695b',
    'yabs-vdrf': 'A0',
    'L': 'fVZ0Z2RjRlB2fV8Celh6CHVpamZUeX4LODlWEV0TH3ERPzk=.1752002625.16209.36812.7ff54aecac3d5d4a0e0e2f5e1f164fbd',
    'yandex_login': 'zheckaz4eka',
    'i': 'KHH48CvntGYdp/u47I4OBucGRG2/6w24X2ISxLEX/Mjm+MgeF/b5Dnjy43qyECI4xy3M2nd4jxElQGYI5MdH96h24Iw=',
    'Session_id': '3:1753264703.5.0.1737402533006:3pVxWQ:b0cc.1.1:czoxNzMwNTYxOTM0Nzc2OjJ6dHpzQTo3MDU3.2:1|1026520089.-1.2.3:1737402533.6:2081594238.7:1749836839|1502053375.-1.2.2:12434306.3:1749836839.6:2081594238.7:1749836839|3:11013199.847611.ijUi0LKW1Ky2E41KeMb5kuFbadE',
    'sessar': '1.1204.CiDBIhXRZcv9KjyCAReT7yGkjvYHCPVjhUlGII6Vl8L9qQ.zfe3mrJUEFAtxoD4Ovi7VfeMv1jgVdq3JQLklAKKxH0',
    'sessionid2': '3:1753264703.5.0.1737402533006:3pVxWQ:b0cc.1.1:czoxNzMwNTYxOTM0Nzc2OjJ6dHpzQTo3MDU3.2:1|1026520089.-1.2.3:1737402533.6:2081594238.7:1749836839|1502053375.-1.2.2:12434306.3:1749836839.6:2081594238.7:1749836839|3:11013199.847611.fakesign0000000000000000000',
    'cycada': 'BYsDMK/sK37FG/1x2qSQEfnVqkroctdGBKVeyoUyR58=',
    'is_gdpr': '0',
    'is_gdpr_b': 'CJzWUhC9zQIoAg==',
    'isa': 'wb3EgNB65CUcDI8zA1kHXK6XcHqfoN7o4hBwDE2DXHpbNuO+2F6dHRE91dwENjfuFAHoL+Ozs+tgpFLCx4jY0Tjf+do=',
    'sae': '0:11D57A3A-0E99-4475-BA97-EFEBC79EE0CB:p:25.6.2.425:w:d:RU:20241102',
    '_ym_isad': '1',
    '_ym_visorc': 'b',
    '_yasc': 'GOqyCJKnRGeqBT2hCHVpUWxzarRkvKYqNPdP+JYgQjoR4twfp5YJbVoryKAat8s23G6+bJoEmB0tjsHvjdy7EWshQJAqxdOVnw==',
    'ys': 'svt.1#def_bro.1#ead.2FECB7CF#wprid.1753379304324256-9422155734553356342-balancer-l7leveler-kubr-yp-sas-12-BAL#ybzcc.ru#newsca.native_cache',
    'yp': '1753465678.uc.ru#1753465678.duc.us#1762097847.brd.6301000000#1762097847.cld.2270452#1783424059.dafs.7-3_25-3#1772926577.dc_neuro.10#1754852289.hdrc.1#2052079573.multib.1#2068739295.pcs.1#1784915302.swntab.2977911793#1759826271.szm.0_8999999761581421%3A1920x1080%3A2063x1044%3A16#2067362625.udn.cDp6aGVja2F6NGVrYQ%3D%3D#1753990088.ygu.0#1753690734.dlp.2#1753465695.ap_r.5_5_1',
    'bh': 'ElAiQ2hyb21pdW0iO3Y9IjEzNiIsICJZYUJyb3dzZXIiO3Y9IjI1LjYiLCAiTm90LkEvQnJhbmQiO3Y9Ijk5IiwgIllvd3NlciI7dj0iMi41IhoFIng4NiIiDCIyNS42LjIuNDI1IioCPzAyAiIiOgkiV2luZG93cyJCCCIxMC4wLjAiSgQiNjQiUmciQ2hyb21pdW0iO3Y9IjEzNi4wLjcxMDMuNDI1IiwgIllhQnJvd3NlciI7dj0iMjUuNi4yLjQyNSIsICJOb3QuQS9CcmFuZCI7dj0iOTkuMC4wLjAiLCAiWW93c2VyIjt2PSIyLjUiWgI/MGDp44nEBmoh3Mrh/wiS2KGxA5/P4eoD+/rw5w3r//32D8GjiZYB84EC',
};

const cookies = {
    'ys': 'newsca.native_cache#ybzcc.ru#svt.1#def_bro.1#ead.2FECB7CF',
    'yandexuid': '641629441730561845',
    'yashr': '8790435691730561845',
    'yuidss': '641629441730561845',
    'ymex': '2045921847.yrts.1730561847',
    'gdpr': '0',
    '_ym_uid': '1730561847432703436',
    'amcuid': '4318871511730626135',
    'font_loaded': 'YSv1',
    'skid': '7503702321733499037',
    'delivery_lang': 'ru',
    '_ym_d': '1746809004',
    'yandex_gid': '10723',
    'my': 'YysBqeMA',
    'delivery_client_id': '5fccc6fd87e947169f743f8294e4695b',
    'yabs-vdrf': 'A0',
    'L': 'fVZ0Z2RjRlB2fV8Celh6CHVpamZUeX4LODlWEV0TH3ERPzk=.1752002625.16209.36812.7ff54aecac3d5d4a0e0e2f5e1f164fbd',
    'yandex_login': 'zheckaz4eka',
    'i': 'KHH48CvntGYdp/u47I4OBucGRG2/6w24X2ISxLEX/Mjm+MgeF/b5Dnjy43qyECI4xy3M2nd4jxElQGYI5MdH96h24Iw=',
    '_ym_isad': '1',
    'Session_id': '3:1753264703.5.0.1737402533006:3pVxWQ:b0cc.1.1:czoxNzMwNTYxOTM0Nzc2OjJ6dHpzQTo3MDU3.2:1|1026520089.-1.2.3:1737402533.6:2081594238.7:1749836839|1502053375.-1.2.2:12434306.3:1749836839.6:2081594238.7:1749836839|3:11013199.847611.ijUi0LKW1Ky2E41KeMb5kuFbadE',
    'sessar': '1.1204.CiDBIhXRZcv9KjyCAReT7yGkjvYHCPVjhUlGII6Vl8L9qQ.zfe3mrJUEFAtxoD4Ovi7VfeMv1jgVdq3JQLklAKKxH0',
    'sessionid2': '3:1753264703.5.0.1737402533006:3pVxWQ:b0cc.1.1:czoxNzMwNTYxOTM0Nzc2OjJ6dHpzQTo3MDU3.2:1|1026520089.-1.2.3:1737402533.6:2081594238.7:1749836839|1502053375.-1.2.2:12434306.3:1749836839.6:2081594238.7:1749836839|3:11013199.847611.fakesign0000000000000000000',
    'cycada': 'BYsDMK/sK37FG/1x2qSQEfnVqkroctdGBKVeyoUyR58=',
    'is_gdpr': '0',
    'is_gdpr_b': 'CJzWUhC9zQIoAg==',
    '_ym_visorc': 'b',
    'gpauto': '55_755863:37_617699:100000:3:1753271188',
    'isa': 'wb3EgNB65CUcDI8zA1kHXK6XcHqfoN7o4hBwDE2DXHpbNuO+2F6dHRE91dwENjfuFAHoL+Ozs+tgpFLCx4jY0Tjf+do=',
    'sae': '0:11D57A3A-0E99-4475-BA97-EFEBC79EE0CB:p:25.6.2.425:w:d:RU:20241102',
    'yp': '1753357875.uc.ru#1753357875.duc.us#1753278675.gpauto.55_755863%3A37_617699%3A100000%3A3%3A1753271188#1762097847.brd.6301000000#1762097847.cld.2270452#1783424059.dafs.7-3_25-3#1772926577.dc_neuro.10#1754852289.hdrc.1#2052079573.multib.1#2068631552.pcs.1#1784807553.swntab.1716537487#1759826271.szm.0_8999999761581421%3A1920x1080%3A2063x1044%3A16#2067362625.udn.cDp6aGVja2F6NGVrYQ%3D%3D#1753990088.ygu.0#1753690734.dlp.2#1753305431.ap_r.5_5_1',
    '_yasc': '+xkgJ7T2nVgm3N8xIPOkAam2QjPiwCJcCHy/vyIwEshEpsZf6XuTTZJIjomHW9QOXw90x6mV5KHvjlvRRpJ0WfKj1M6gxo7TJA==',
    'bh': 'ElAiQ2hyb21pdW0iO3Y9IjEzNiIsICJZYUJyb3dzZXIiO3Y9IjI1LjYiLCAiTm90LkEvQnJhbmQiO3Y9Ijk5IiwgIllvd3NlciI7dj0iMi41IhoFIng4NiIiDSIyNS42LjAuMjM3MCIqAj8wMgIiIjoJIldpbmRvd3MiQggiMTAuMC4wIkoEIjY0IlJpIkNocm9taXVtIjt2PSIxMzYuMC43MTAzLjIzNzAiLCAiWWFCcm93c2VyIjt2PSIyNS42LjAuMjM3MCIsICJOb3QuQS9CcmFuZCI7dj0iOTkuMC4wLjAiLCAiWW93c2VyIjt2PSIyLjUiWgI/MGCH4bXDBmoh3Mrh/wiS2KGxA5/P4eoD+/rw5w3r//32D8GjiZYB84EC',
};

// Объединяем оба набора куки — значения из cookies перезапишут cookies_token при совпадении ключей
const mergedCookies = { ...cookies_token, ...cookies };

// Формируем строку cookie
const cookiesString = Object.entries(mergedCookies).map(([k, v]) => `${k}=${v}`).join('; ');
// Данные для расчета оффера
const points = [
    {
        lon: 37.4971252,
        lat: 56.3303072
    },
    {
        lon: 37.4971252,
        lat: 56.3334225
    },
    {
        lon: 37.4971252,
        lat: 56.3365379
    },
    {
        lon: 37.4971252,
        lat: 56.3396532
    },
    {
        lon: 37.4971252,
        lat: 56.3427685
    },
    {
        lon: 37.4971252,
        lat: 56.3458839
    },
    {
        lon: 37.4971252,
        lat: 56.3489992
    },
    {
        lon: 37.4971252,
        lat: 56.3521146
    },
    {
        lon: 37.4971252,
        lat: 56.3552299
    },
    {
        lon: 37.4971252,
        lat: 56.3583452
    },
    {
        lon: 37.5019934,
        lat: 56.3256342
    },
    {
        lon: 37.5019934,
        lat: 56.3287495
    },
    {
        lon: 37.5019934,
        lat: 56.3318649
    },
    {
        lon: 37.5019934,
        lat: 56.3349802
    },
    {
        lon: 37.5019934,
        lat: 56.3380955
    },
    {
        lon: 37.5019934,
        lat: 56.3412109
    },
    {
        lon: 37.5019934,
        lat: 56.3443262
    },
    {
        lon: 37.5019934,
        lat: 56.3474415
    },
    {
        lon: 37.5019934,
        lat: 56.3505569
    },
    {
        lon: 37.5019934,
        lat: 56.3536722
    },
    {
        lon: 37.5019934,
        lat: 56.3567876
    },
    {
        lon: 37.5019934,
        lat: 56.3599029
    },
    {
        lon: 37.5019934,
        lat: 56.3630182
    },
    {
        lon: 37.5068616,
        lat: 56.3240765
    },
    {
        lon: 37.5068616,
        lat: 56.3271919
    },
    {
        lon: 37.5068616,
        lat: 56.3303072
    },
    {
        lon: 37.5068616,
        lat: 56.3334225
    },
    {
        lon: 37.5068616,
        lat: 56.3365379
    },
    {
        lon: 37.5068616,
        lat: 56.3396532
    },
    {
        lon: 37.5068616,
        lat: 56.3427685
    },
    {
        lon: 37.5068616,
        lat: 56.3458839
    },
    {
        lon: 37.5068616,
        lat: 56.3489992
    },
    {
        lon: 37.5068616,
        lat: 56.3521146
    },
    {
        lon: 37.5068616,
        lat: 56.3552299
    },
    {
        lon: 37.5068616,
        lat: 56.3583452
    },
    {
        lon: 37.5068616,
        lat: 56.3614606
    },
    {
        lon: 37.5068616,
        lat: 56.3645759
    },
    {
        lon: 37.5117298,
        lat: 56.3194035
    },
    {
        lon: 37.5117298,
        lat: 56.3225189
    },
    {
        lon: 37.5117298,
        lat: 56.3256342
    },
    {
        lon: 37.5117298,
        lat: 56.3287495
    },
    {
        lon: 37.5117298,
        lat: 56.3318649
    },
    {
        lon: 37.5117298,
        lat: 56.3349802
    },
    {
        lon: 37.5117298,
        lat: 56.3380955
    },
    {
        lon: 37.5117298,
        lat: 56.3412109
    },
    {
        lon: 37.5117298,
        lat: 56.3443262
    },
    {
        lon: 37.5117298,
        lat: 56.3474415
    },
    {
        lon: 37.5117298,
        lat: 56.3505569
    },
    {
        lon: 37.5117298,
        lat: 56.3536722
    },
    {
        lon: 37.5117298,
        lat: 56.3567876
    },
    {
        lon: 37.5117298,
        lat: 56.3599029
    },
    {
        lon: 37.5117298,
        lat: 56.3630182
    },
    {
        lon: 37.5117298,
        lat: 56.3661336
    },
    {
        lon: 37.5117298,
        lat: 56.3692489
    },
    {
        lon: 37.516598,
        lat: 56.3178458
    },
    {
        lon: 37.516598,
        lat: 56.3209612
    },
    {
        lon: 37.516598,
        lat: 56.3240765
    },
    {
        lon: 37.516598,
        lat: 56.3271919
    },
    {
        lon: 37.516598,
        lat: 56.3303072
    },
    {
        lon: 37.516598,
        lat: 56.3334225
    },
    {
        lon: 37.516598,
        lat: 56.3365379
    },
    {
        lon: 37.516598,
        lat: 56.3396532
    },
    {
        lon: 37.516598,
        lat: 56.3427685
    },
    {
        lon: 37.516598,
        lat: 56.3458839
    },
    {
        lon: 37.516598,
        lat: 56.3489992
    },
    {
        lon: 37.516598,
        lat: 56.3521146
    },
    {
        lon: 37.516598,
        lat: 56.3552299
    },
    {
        lon: 37.516598,
        lat: 56.3583452
    },
    {
        lon: 37.516598,
        lat: 56.3614606
    },
    {
        lon: 37.516598,
        lat: 56.3645759
    },
    {
        lon: 37.516598,
        lat: 56.3676912
    },
    {
        lon: 37.516598,
        lat: 56.3708066
    },
    {
        lon: 37.5214662,
        lat: 56.3194035
    },
    {
        lon: 37.5214662,
        lat: 56.3225189
    },
    {
        lon: 37.5214662,
        lat: 56.3256342
    },
    {
        lon: 37.5214662,
        lat: 56.3287495
    },
    {
        lon: 37.5214662,
        lat: 56.3318649
    },
    {
        lon: 37.5214662,
        lat: 56.3349802
    },
    {
        lon: 37.5214662,
        lat: 56.3380955
    },
    {
        lon: 37.5214662,
        lat: 56.3412109
    },
    {
        lon: 37.5214662,
        lat: 56.3443262
    },
    {
        lon: 37.5214662,
        lat: 56.3474415
    },
    {
        lon: 37.5214662,
        lat: 56.3505569
    },
    {
        lon: 37.5214662,
        lat: 56.3536722
    },
    {
        lon: 37.5214662,
        lat: 56.3567876
    },
    {
        lon: 37.5214662,
        lat: 56.3599029
    },
    {
        lon: 37.5214662,
        lat: 56.3630182
    },
    {
        lon: 37.5214662,
        lat: 56.3661336
    },
    {
        lon: 37.5214662,
        lat: 56.3692489
    },
    {
        lon: 37.5263344,
        lat: 56.3178458
    },
    {
        lon: 37.5263344,
        lat: 56.3209612
    },
    {
        lon: 37.5263344,
        lat: 56.3240765
    },
    {
        lon: 37.5263344,
        lat: 56.3271919
    },
    {
        lon: 37.5263344,
        lat: 56.3303072
    },
    {
        lon: 37.5263344,
        lat: 56.3334225
    },
    {
        lon: 37.5263344,
        lat: 56.3365379
    },
    {
        lon: 37.5263344,
        lat: 56.3396532
    },
    {
        lon: 37.5263344,
        lat: 56.3427685
    },
    {
        lon: 37.5263344,
        lat: 56.3458839
    },
    {
        lon: 37.5263344,
        lat: 56.3489992
    },
    {
        lon: 37.5263344,
        lat: 56.3521146
    },
    {
        lon: 37.5263344,
        lat: 56.3552299
    },
    {
        lon: 37.5263344,
        lat: 56.3583452
    },
    {
        lon: 37.5263344,
        lat: 56.3614606
    },
    {
        lon: 37.5263344,
        lat: 56.3645759
    },
    {
        lon: 37.5263344,
        lat: 56.3676912
    },
    {
        lon: 37.5263344,
        lat: 56.3708066
    },
    {
        lon: 37.5312026,
        lat: 56.3194035
    },
    {
        lon: 37.5312026,
        lat: 56.3225189
    },
    {
        lon: 37.5312026,
        lat: 56.3256342
    },
    {
        lon: 37.5312026,
        lat: 56.3287495
    },
    {
        lon: 37.5312026,
        lat: 56.3318649
    },
    {
        lon: 37.5312026,
        lat: 56.3349802
    },
    {
        lon: 37.5312026,
        lat: 56.3380955
    },
    {
        lon: 37.5312026,
        lat: 56.3412109
    },
    {
        lon: 37.5312026,
        lat: 56.3443262
    },
    {
        lon: 37.5312026,
        lat: 56.3474415
    },
    {
        lon: 37.5312026,
        lat: 56.3505569
    },
    {
        lon: 37.5312026,
        lat: 56.3536722
    },
    {
        lon: 37.5312026,
        lat: 56.3567876
    },
    {
        lon: 37.5312026,
        lat: 56.3599029
    },
    {
        lon: 37.5312026,
        lat: 56.3630182
    },
    {
        lon: 37.5312026,
        lat: 56.3661336
    },
    {
        lon: 37.5312026,
        lat: 56.3692489
    },
    {
        lon: 37.5360708,
        lat: 56.3178458
    },
    {
        lon: 37.5360708,
        lat: 56.3209612
    },
    {
        lon: 37.5360708,
        lat: 56.3240765
    },
    {
        lon: 37.5360708,
        lat: 56.3271919
    },
    {
        lon: 37.5360708,
        lat: 56.3303072
    },
    {
        lon: 37.5360708,
        lat: 56.3334225
    },
    {
        lon: 37.5360708,
        lat: 56.3365379
    },
    {
        lon: 37.5360708,
        lat: 56.3396532
    },
    {
        lon: 37.5360708,
        lat: 56.3427685
    },
    {
        lon: 37.5360708,
        lat: 56.3458839
    },
    {
        lon: 37.5360708,
        lat: 56.3489992
    },
    {
        lon: 37.5360708,
        lat: 56.3521146
    },
    {
        lon: 37.5360708,
        lat: 56.3552299
    },
    {
        lon: 37.5360708,
        lat: 56.3583452
    },
    {
        lon: 37.5360708,
        lat: 56.3614606
    },
    {
        lon: 37.5360708,
        lat: 56.3645759
    },
    {
        lon: 37.5360708,
        lat: 56.3676912
    },
    {
        lon: 37.5360708,
        lat: 56.3708066
    },
    {
        lon: 37.540939,
        lat: 56.3194035
    },
    {
        lon: 37.540939,
        lat: 56.3225189
    },
    {
        lon: 37.540939,
        lat: 56.3256342
    },
    {
        lon: 37.540939,
        lat: 56.3287495
    },
    {
        lon: 37.540939,
        lat: 56.3318649
    },
    {
        lon: 37.540939,
        lat: 56.3349802
    },
    {
        lon: 37.540939,
        lat: 56.3380955
    },
    {
        lon: 37.540939,
        lat: 56.3412109
    },
    {
        lon: 37.540939,
        lat: 56.3443262
    },
    {
        lon: 37.540939,
        lat: 56.3474415
    },
    {
        lon: 37.540939,
        lat: 56.3505569
    },
    {
        lon: 37.540939,
        lat: 56.3536722
    },
    {
        lon: 37.540939,
        lat: 56.3567876
    },
    {
        lon: 37.540939,
        lat: 56.3599029
    },
    {
        lon: 37.540939,
        lat: 56.3630182
    },
    {
        lon: 37.540939,
        lat: 56.3661336
    },
    {
        lon: 37.540939,
        lat: 56.3692489
    },
    {
        lon: 37.5458072,
        lat: 56.3178458
    },
    {
        lon: 37.5458072,
        lat: 56.3209612
    },
    {
        lon: 37.5458072,
        lat: 56.3240765
    },
    {
        lon: 37.5458072,
        lat: 56.3271919
    },
    {
        lon: 37.5458072,
        lat: 56.3303072
    },
    {
        lon: 37.5458072,
        lat: 56.3334225
    },
    {
        lon: 37.5458072,
        lat: 56.3365379
    },
    {
        lon: 37.5458072,
        lat: 56.3396532
    },
    {
        lon: 37.5458072,
        lat: 56.3427685
    },
    {
        lon: 37.5458072,
        lat: 56.3458839
    },
    {
        lon: 37.5458072,
        lat: 56.3489992
    },
    {
        lon: 37.5458072,
        lat: 56.3521146
    },
    {
        lon: 37.5458072,
        lat: 56.3552299
    },
    {
        lon: 37.5458072,
        lat: 56.3583452
    },
    {
        lon: 37.5458072,
        lat: 56.3614606
    },
    {
        lon: 37.5458072,
        lat: 56.3645759
    },
    {
        lon: 37.5458072,
        lat: 56.3676912
    },
    {
        lon: 37.5458072,
        lat: 56.3708066
    },
    {
        lon: 37.5506754,
        lat: 56.3194035
    },
    {
        lon: 37.5506754,
        lat: 56.3225189
    },
    {
        lon: 37.5506754,
        lat: 56.3256342
    },
    {
        lon: 37.5506754,
        lat: 56.3287495
    },
    {
        lon: 37.5506754,
        lat: 56.3318649
    },
    {
        lon: 37.5506754,
        lat: 56.3349802
    },
    {
        lon: 37.5506754,
        lat: 56.3380955
    },
    {
        lon: 37.5506754,
        lat: 56.3412109
    },
    {
        lon: 37.5506754,
        lat: 56.3443262
    },
    {
        lon: 37.5506754,
        lat: 56.3474415
    },
    {
        lon: 37.5506754,
        lat: 56.3505569
    },
    {
        lon: 37.5506754,
        lat: 56.3536722
    },
    {
        lon: 37.5506754,
        lat: 56.3567876
    },
    {
        lon: 37.5506754,
        lat: 56.3599029
    },
    {
        lon: 37.5506754,
        lat: 56.3630182
    },
    {
        lon: 37.5506754,
        lat: 56.3661336
    },
    {
        lon: 37.5506754,
        lat: 56.3692489
    },
    {
        lon: 37.5555436,
        lat: 56.3178458
    },
    {
        lon: 37.5555436,
        lat: 56.3209612
    },
    {
        lon: 37.5555436,
        lat: 56.3240765
    },
    {
        lon: 37.5555436,
        lat: 56.3271919
    },
    {
        lon: 37.5555436,
        lat: 56.3303072
    },
    {
        lon: 37.5555436,
        lat: 56.3334225
    },
    {
        lon: 37.5555436,
        lat: 56.3365379
    },
    {
        lon: 37.5555436,
        lat: 56.3396532
    },
    {
        lon: 37.5555436,
        lat: 56.3427685
    },
    {
        lon: 37.5555436,
        lat: 56.3458839
    },
    {
        lon: 37.5555436,
        lat: 56.3489992
    },
    {
        lon: 37.5555436,
        lat: 56.3521146
    },
    {
        lon: 37.5555436,
        lat: 56.3552299
    },
    {
        lon: 37.5555436,
        lat: 56.3583452
    },
    {
        lon: 37.5555436,
        lat: 56.3614606
    },
    {
        lon: 37.5555436,
        lat: 56.3645759
    },
    {
        lon: 37.5555436,
        lat: 56.3676912
    },
    {
        lon: 37.5555436,
        lat: 56.3708066
    },
    {
        lon: 37.5604118,
        lat: 56.3194035
    },
    {
        lon: 37.5604118,
        lat: 56.3225189
    },
    {
        lon: 37.5604118,
        lat: 56.3256342
    },
    {
        lon: 37.5604118,
        lat: 56.3287495
    },
    {
        lon: 37.5604118,
        lat: 56.3318649
    },
    {
        lon: 37.5604118,
        lat: 56.3349802
    },
    {
        lon: 37.5604118,
        lat: 56.3380955
    },
    {
        lon: 37.5604118,
        lat: 56.3412109
    },
    {
        lon: 37.5604118,
        lat: 56.3443262
    },
    {
        lon: 37.5604118,
        lat: 56.3474415
    },
    {
        lon: 37.5604118,
        lat: 56.3505569
    },
    {
        lon: 37.5604118,
        lat: 56.3536722
    },
    {
        lon: 37.5604118,
        lat: 56.3567876
    },
    {
        lon: 37.5604118,
        lat: 56.3599029
    },
    {
        lon: 37.5604118,
        lat: 56.3630182
    },
    {
        lon: 37.5604118,
        lat: 56.3661336
    },
    {
        lon: 37.5604118,
        lat: 56.3692489
    },
    {
        lon: 37.56528,
        lat: 56.3178458
    },
    {
        lon: 37.56528,
        lat: 56.3209612
    },
    {
        lon: 37.56528,
        lat: 56.3240765
    },
    {
        lon: 37.56528,
        lat: 56.3271919
    },
    {
        lon: 37.56528,
        lat: 56.3303072
    },
    {
        lon: 37.56528,
        lat: 56.3334225
    },
    {
        lon: 37.56528,
        lat: 56.3365379
    },
    {
        lon: 37.56528,
        lat: 56.3396532
    },
    {
        lon: 37.56528,
        lat: 56.3427685
    },
    {
        lon: 37.56528,
        lat: 56.3458839
    },
    {
        lon: 37.56528,
        lat: 56.3489992
    },
    {
        lon: 37.56528,
        lat: 56.3521146
    },
    {
        lon: 37.56528,
        lat: 56.3552299
    },
    {
        lon: 37.56528,
        lat: 56.3583452
    },
    {
        lon: 37.56528,
        lat: 56.3614606
    },
    {
        lon: 37.56528,
        lat: 56.3645759
    },
    {
        lon: 37.56528,
        lat: 56.3676912
    },
    {
        lon: 37.56528,
        lat: 56.3708066
    },
    {
        lon: 37.5701482,
        lat: 56.3194035
    },
    {
        lon: 37.5701482,
        lat: 56.3225189
    },
    {
        lon: 37.5701482,
        lat: 56.3256342
    },
    {
        lon: 37.5701482,
        lat: 56.3287495
    },
    {
        lon: 37.5701482,
        lat: 56.3318649
    },
    {
        lon: 37.5701482,
        lat: 56.3349802
    },
    {
        lon: 37.5701482,
        lat: 56.3380955
    },
    {
        lon: 37.5701482,
        lat: 56.3412109
    },
    {
        lon: 37.5701482,
        lat: 56.3443262
    },
    {
        lon: 37.5701482,
        lat: 56.3474415
    },
    {
        lon: 37.5701482,
        lat: 56.3505569
    },
    {
        lon: 37.5701482,
        lat: 56.3536722
    },
    {
        lon: 37.5701482,
        lat: 56.3567876
    },
    {
        lon: 37.5701482,
        lat: 56.3599029
    },
    {
        lon: 37.5701482,
        lat: 56.3630182
    },
    {
        lon: 37.5701482,
        lat: 56.3661336
    },
    {
        lon: 37.5701482,
        lat: 56.3692489
    },
    {
        lon: 37.5750164,
        lat: 56.3209612
    },
    {
        lon: 37.5750164,
        lat: 56.3240765
    },
    {
        lon: 37.5750164,
        lat: 56.3271919
    },
    {
        lon: 37.5750164,
        lat: 56.3303072
    },
    {
        lon: 37.5750164,
        lat: 56.3334225
    },
    {
        lon: 37.5750164,
        lat: 56.3365379
    },
    {
        lon: 37.5750164,
        lat: 56.3396532
    },
    {
        lon: 37.5750164,
        lat: 56.3427685
    },
    {
        lon: 37.5750164,
        lat: 56.3458839
    },
    {
        lon: 37.5750164,
        lat: 56.3489992
    },
    {
        lon: 37.5750164,
        lat: 56.3521146
    },
    {
        lon: 37.5750164,
        lat: 56.3552299
    },
    {
        lon: 37.5750164,
        lat: 56.3583452
    },
    {
        lon: 37.5750164,
        lat: 56.3614606
    },
    {
        lon: 37.5750164,
        lat: 56.3645759
    },
    {
        lon: 37.5750164,
        lat: 56.3676912
    },
    {
        lon: 37.5798846,
        lat: 56.3225189
    },
    {
        lon: 37.5798846,
        lat: 56.3256342
    },
    {
        lon: 37.5798846,
        lat: 56.3287495
    },
    {
        lon: 37.5798846,
        lat: 56.3318649
    },
    {
        lon: 37.5798846,
        lat: 56.3349802
    },
    {
        lon: 37.5798846,
        lat: 56.3380955
    },
    {
        lon: 37.5798846,
        lat: 56.3412109
    },
    {
        lon: 37.5798846,
        lat: 56.3443262
    },
    {
        lon: 37.5798846,
        lat: 56.3474415
    },
    {
        lon: 37.5798846,
        lat: 56.3505569
    },
    {
        lon: 37.5798846,
        lat: 56.3536722
    },
    {
        lon: 37.5798846,
        lat: 56.3567876
    },
    {
        lon: 37.5798846,
        lat: 56.3599029
    },
    {
        lon: 37.5798846,
        lat: 56.3630182
    },
    {
        lon: 37.5798846,
        lat: 56.3661336
    },
    {
        lon: 37.5847528,
        lat: 56.3271919
    },
    {
        lon: 37.5847528,
        lat: 56.3303072
    },
    {
        lon: 37.5847528,
        lat: 56.3334225
    },
    {
        lon: 37.5847528,
        lat: 56.3365379
    },
    {
        lon: 37.5847528,
        lat: 56.3396532
    },
    {
        lon: 37.5847528,
        lat: 56.3427685
    },
    {
        lon: 37.5847528,
        lat: 56.3458839
    },
    {
        lon: 37.5847528,
        lat: 56.3489992
    },
    {
        lon: 37.5847528,
        lat: 56.3521146
    },
    {
        lon: 37.5847528,
        lat: 56.3552299
    },
    {
        lon: 37.5847528,
        lat: 56.3583452
    },
    {
        lon: 37.5847528,
        lat: 56.3614606
    },
    {
        lon: 37.589621,
        lat: 56.3287495
    },
    {
        lon: 37.589621,
        lat: 56.3318649
    },
    {
        lon: 37.589621,
        lat: 56.3349802
    },
    {
        lon: 37.589621,
        lat: 56.3380955
    },
    {
        lon: 37.589621,
        lat: 56.3412109
    },
    {
        lon: 37.589621,
        lat: 56.3443262
    },
    {
        lon: 37.589621,
        lat: 56.3474415
    },
    {
        lon: 37.589621,
        lat: 56.3505569
    },
    {
        lon: 37.589621,
        lat: 56.3536722
    },
    {
        lon: 37.589621,
        lat: 56.3567876
    },
    {
        lon: 37.589621,
        lat: 56.3599029
    }
];



async function getCsrfToken() {
    const tokenResponse = await fetch(
        'https://dostavka.yandex.ru/account/api/csrf_token/',
        { method: 'GET', headers: { ...headers_token, cookie: cookiesString } }
    );
    const tokenJson = await tokenResponse.json();
    return String(tokenJson['sk'] ?? '');
}

// Функция запроса цены для одной точки с уже полученным токеном
async function getOfferForPoint(point, token) {
    const headers = {
        ...headers_token,
        'content-type': 'application/json',
        'origin': 'https://dostavka.yandex.ru',
        'x-csrf-token': token,
        'cookie': cookiesString
    };

    const data = {
        items: [
            { title: 'Другое', cost_value: '0', cost_currency: 'RUB', quantity: 1, pickup_point: 0, dropoff_point: 1 }
        ],
        requirements: { taxi_class: ['express'], cargo_options: [] },
        route_points: [
            point,
            point
        ],
        payment_info: { kind: 'card', has_disable_reason: false }
    };

    const response = await fetch(
        'https://dostavka.yandex.ru/api/b2b/phoenix/dcaa/cargo/v2/offers/calculate',
        { method: 'POST', headers, body: JSON.stringify(data) }
    );
    const json = await response.json();
    const price = json['claims_offers']?.[3]?.['price']?.['total_price'] ?? 0;
    return { lat: point.lat, lon: point.lon, price };
}

// API возвращает массив офферов
app.get("/offers", async (req, res) => {
  try {
    const token = await getCsrfToken();
    const numCores = Math.min(4, os.cpus().length);
    const chunkSize = Math.ceil(points.length / numCores);

    const chunks = [];
    for (let i = 0; i < points.length; i += chunkSize) {
      chunks.push(points.slice(i, i + chunkSize));
    }

    const results = await Promise.all(
      chunks.map(
        (chunk) =>
          new Promise((resolve) => {
            const worker = new Worker("./worker.js", {
              workerData: { chunk, token, headers_token, cookiesString },
            });
            worker.on("message", resolve);
            worker.on("error", (e) => resolve([]));
          })
      )
    );

    res.json(results.flat());
  } catch (err) {
    console.error("Ошибка:", err);
    res.status(500).json({ error: err.message });
  }
});
app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));