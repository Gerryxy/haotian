const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// 静态文件服务
app.use(express.static('public'));

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 