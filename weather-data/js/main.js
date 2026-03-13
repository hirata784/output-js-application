const cityName = document.querySelector("#city-name");
const btn = document.querySelector("#btn");
const result = document.querySelector("#result");
const loading = document.querySelector("#loading");
const errorBox = document.querySelector("#error");

// 都市の経度と緯度
const city = [
    { name: "東京", latitude: 35.6895, longitude: 139.6917 },
    { name: "京都", latitude: 35.0211, longitude: 135.7538 },
    { name: "大阪", latitude: 34.6938, longitude: 135.5011 },
];

// UIの状態を更新するヘルパー関数
function showElement(element) {
    element.style.display = "block";
}

function hideElement(element) {
    element.style.display = "none";
}

// ページ読み込み時と同時に処理
window.addEventListener("DOMContentLoaded", function () {
    // 選択肢を作成
    city.forEach((c) => {
        const option = document.createElement("option");
        option.innerText = c.name;
        option.value = c.name;
        cityName.appendChild(option);
    });
});

// 天気取得
btn.addEventListener("click", async function () {
    // 前回の結果を削除する
    result.textContent = "";

    // ローディング状態
    showElement(loading);
    hideElement(errorBox);

    try {
        // 選択した都市の経度と緯度を取得する
        const indexCity = city.find(({ name }) => name == cityName.value);
        // 選択していない場合、エラー表示
        if (indexCity === undefined) {
            throw new Error("都市名が未選択です。");
        }
        const latitude = indexCity.latitude;
        const longitude = indexCity.longitude;

        // 最高気温、最低気温、天気コードを取得
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Asia%2FTokyo&forecast_days=1`,
        );

        if (!response.ok) {
            throw new Error(`HTTPエラー：${response.status}`);
        }
        const weather = await response.json();
        // データ表示
        hideElement(loading);

        // データがある場合
        // 天気コードより、天気テキストを取得
        let weatherName = "";
        if (weather.daily.weather_code[0] === 0) {
            weatherName = "快晴";
        } else if (
            weather.daily.weather_code[0] >= 1 &&
            weather.daily.weather_code[0] <= 3
        ) {
            weatherName = "晴れ〜曇り";
        } else if (
            weather.daily.weather_code[0] >= 45 &&
            weather.daily.weather_code[0] <= 48
        ) {
            weatherName = "霧";
        } else if (
            weather.daily.weather_code[0] >= 51 &&
            weather.daily.weather_code[0] <= 67
        ) {
            weatherName = "霧雨・雨";
        } else if (
            weather.daily.weather_code[0] >= 71 &&
            weather.daily.weather_code[0] <= 75
        ) {
            weatherName = "雪";
        } else if (
            weather.daily.weather_code[0] >= 80 &&
            weather.daily.weather_code[0] <= 82
        ) {
            weatherName = "にわか雨";
        } else if (
            weather.daily.weather_code[0] >= 85 &&
            weather.daily.weather_code[0] <= 86
        ) {
            weatherName = "にわか雪";
        } else if (
            weather.daily.weather_code[0] >= 95 &&
            weather.daily.weather_code[0] <= 99
        ) {
            weatherName = "雷雨";
        }

        // 結果を表示する
        const div = document.createElement("div");

        div.innerHTML = `
        <p>${weather.daily.time[0]}</p>
        <p>天気：${weatherName}</p>
        <p>最高気温：${weather.daily.temperature_2m_max[0]}</p>
        <p>最低気温：${weather.daily.temperature_2m_min[0]}</p>
        `;

        // 結果を追記する
        result.appendChild(div);
        console.log(weather.daily);
    } catch (error) {
        hideElement(loading);
        showElement(errorBox);
        console.error("Fetch error：", error);
    }
});
