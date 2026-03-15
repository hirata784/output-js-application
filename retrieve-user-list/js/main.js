const btn = document.querySelector("#btn");
const userList = document.querySelector("#user-list");

// ユーザー取得
function makeUser(url) {
    // サーバーへのリクエスト
    return (
        fetch(url)
            // サーバーからのレスポンスをJSON形式で処理
            .then((response) => response.json())
            // ユーザー情報のリストを作成
            .then((users) => {
                userList.innerHTML = "";
                // mapでHTML作成
                const u = users.map((user) => {
                    return `
                <ul>
                <li>${user.name}</li>
                <li>${user.email}</li>
                </ul>
                `;
                });
                // joinで結合
                const html = u.join("");
                // HTMLで表示
                userList.innerHTML = html;
                return "データの取得に成功しました。";
            })
    );
}

btn.addEventListener("click", () => {
    makeUser("https://jsonplaceholder.typicode.com/users")
        .then((message) => {
            console.log(message);
        })
        .catch((error) => {
            console.error("エラー：", error);
        });
});
