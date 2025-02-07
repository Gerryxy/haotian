async function loadNews() {
    const newsGrid = document.getElementById('newsGrid');
    const loading = document.getElementById('newsLoading');
    
    try {
        const response = await fetch('/data/news.json');
        const news = await response.json();
        
        loading.style.display = 'none';
        newsGrid.innerHTML = news.map(item => `
            <div class="news-item">
                <h3><a href="${item.url}" target="_blank">${item.title}</a></h3>
                <p class="news-date">${item.date}</p>
                <p class="news-source">${item.source}</p>
                <p class="news-excerpt">${item.excerpt}</p>
            </div>
        `).join('');
        
    } catch (error) {
        loading.innerHTML = '<span class="error">加载失败，请稍后重试</span>';
        console.error('Error loading news:', error);
    }
}

// 页面加载时获取新闻
document.addEventListener('DOMContentLoaded', loadNews); 