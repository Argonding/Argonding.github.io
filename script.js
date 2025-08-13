function setActive() {
    const currentPage = window.location.pathname.split("/").pop();
    const hash = window.location.hash.substring(1); // 获取hash值(如#waders)
    
    // 清除所有active类
    document.querySelectorAll('.navbar a').forEach(link => {
        link.classList.remove('active');
    });
    
    // 设置主导航活动项
    let activeId = '';
    switch (currentPage) {
        case 'index.html':
            activeId = 'nav-index';
            break;
        case 'photography.html':
            activeId = 'nav-photography';
            break;
        case 'bird.html':
            activeId = 'nav-bird';
            // 如果是bird.html且有hash，尝试设置下拉菜单项为active
            if (hash) {
                const subLink = document.querySelector(`.dropdown-content a[href="#${hash}"]`);
                if (subLink) subLink.classList.add('active');
            }
            break;
        case 'about.html':
            activeId = 'nav-about';
            break;
        default:
            activeId = 'nav-index';
    }
    
    // 设置主链接为active
    const activeLink = document.getElementById(activeId);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}


document.getElementById('search').addEventListener('input', function() {
    const searchTerm = this.value.trim();
    const duckItems = document.querySelectorAll('.duck-item');
    let hasResults = false;
    let isComposing = false; // 标记是否正在输入法组合过程中
    
    // 监听输入法开始组合事件
    this.addEventListener('compositionstart', () => {
        isComposing = true;
    });
    
    // 监听输入法结束组合事件
    this.addEventListener('compositionend', () => {
        isComposing = false;
        performSearch(); // 组合结束后执行搜索
    });
    
    // 如果不是输入法组合过程，则执行搜索
    if (!isComposing) {
        performSearch();
    }
    
    function performSearch() {
        // 如果搜索词为空，显示所有项目
        if (searchTerm === '') {
            duckItems.forEach(item => {
                item.style.display = 'flex';
            });
            removeNoResultsMessage();
            return;
        }
        
        const searchTermLower = searchTerm.toLowerCase();
        let anyMatch = false;
        
        duckItems.forEach(item => {
            const name = item.querySelector('.duck-name').textContent.toLowerCase();
            const description = item.querySelector('.duck-description').textContent.toLowerCase();
            
            if (name.includes(searchTermLower) || description.includes(searchTermLower)) {
                item.style.display = 'flex';
                anyMatch = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // 只有在输入法不活跃且确实没有结果时才显示"没有找到"
        if (!anyMatch && !isComposing && searchTerm !== '') {
            showNoResultsMessage();
        } else {
            removeNoResultsMessage();
        }
    }
    
    function showNoResultsMessage() {
        if (!document.getElementById('no-results')) {
            const noResultsDiv = document.createElement('div');
            noResultsDiv.id = 'no-results';
            noResultsDiv.className = 'no-results';
            noResultsDiv.textContent = '没有找到匹配的小鸟，请尝试其他关键词。';
            document.getElementById('duck-container').appendChild(noResultsDiv);
        }
    }
    
    function removeNoResultsMessage() {
        const noResults = document.getElementById('no-results');
        if (noResults) {
            noResults.remove();
        }
    }
});