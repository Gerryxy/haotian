document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.industry-tab');
    const clients = document.querySelectorAll('.client-logo');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有 tab 的 active 类
            tabs.forEach(t => t.classList.remove('active'));
            // 给当前点击的 tab 添加 active 类
            tab.classList.add('active');

            // 获取当前选中的行业
            const industry = tab.dataset.industry;

            // 隐藏所有客户
            clients.forEach(client => {
                client.style.display = 'none';
            });

            // 显示选中行业的客户
            document.querySelectorAll(`.client-logo.${industry}`).forEach(client => {
                client.style.display = 'flex';
            });
        });
    });
}); 