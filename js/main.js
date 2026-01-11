// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    const chineseInput = document.getElementById('chineseInput');
    const generateBtn = document.getElementById('generateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const previewSection = document.getElementById('previewSection');
    const tianzigengContainer = document.getElementById('tianzigeng');

    // 生成字帖按钮点击事件
    generateBtn.addEventListener('click', function() {
        const text = chineseInput.value.trim();
        
        if (!text) {
            alert('请输入中文内容！');
            return;
        }

        // 生成田字格
        generateTianzigeng(text);
        
        // 显示预览区域
        previewSection.style.display = 'block';
        
        // 滚动到预览区域
        setTimeout(() => {
            previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        
        // 延迟打开打印对话框
        setTimeout(() => {
            window.print();
        }, 500);
    });

    // 清空按钮点击事件
    clearBtn.addEventListener('click', function() {
        chineseInput.value = '';
        tianzigengContainer.innerHTML = '';
        previewSection.style.display = 'none';
    });

    // 生成田字格函数
    function generateTianzigeng(text) {
        // 清空之前的内容
        tianzigengContainer.innerHTML = '';
        
        // 将文本转换为字符数组
        const chars = Array.from(text);
        
        // 使用 pinyin-pro 的整句转换，获取更准确的拼音（包括轻声）
        let pinyinArray = [];
        try {
            // 先将整句转换为拼音数组，这样可以识别词语上下文
            const fullPinyin = pinyinPro.pinyin(text, { 
                toneType: 'symbol',  // 使用符号标注声调
                type: 'array'  // 返回数组格式，每个字对应一个拼音
            });
            pinyinArray = fullPinyin;
        } catch (error) {
            console.error('拼音转换错误:', error);
            // 如果转换失败，使用逐字转换作为备选
            pinyinArray = chars.map(char => {
                if (/[\u4e00-\u9fa5]/.test(char)) {
                    return pinyinPro.pinyin(char, { toneType: 'symbol' });
                }
                return char;
            });
        }
        
        // 每行最多11个字
        const charsPerRow = 11;
        let currentRow = null;
        let currentRowCount = 0;
        
        // 为每个字符生成田字格
        chars.forEach((char, index) => {
            // 如果需要新起一行
            if (currentRowCount === 0 || currentRowCount >= charsPerRow) {
                currentRow = document.createElement('div');
                currentRow.className = 'tianzigeng-row';
                tianzigengContainer.appendChild(currentRow);
                currentRowCount = 0;
            }
            
            // 如果是空格，创建空白占位
            if (char === ' ') {
                const space = document.createElement('div');
                space.className = 'tianzigeng-space';
                currentRow.appendChild(space);
                currentRowCount++;
                return;
            }
            
            // 如果是换行符，强制换行
            if (char === '\n') {
                currentRowCount = charsPerRow; // 强制下一个字符新起一行
                return;
            }
            
            // 获取对应的拼音
            let pinyinText = '';
            if (/[\u4e00-\u9fa5]/.test(char)) {
                // 使用整句转换得到的拼音数组
                pinyinText = pinyinArray[index] || char;
            } else {
                // 非中文字符直接显示
                pinyinText = char;
            }
            
            // 创建田字格项
            const item = document.createElement('div');
            item.className = 'tianzigeng-item';
            
            // 拼音
            const pinyin = document.createElement('div');
            pinyin.className = 'pinyin';
            pinyin.textContent = pinyinText;
            
            // 田字格（不需要添加斜线，CSS中用伪元素实现十字虚线）
            const grid = document.createElement('div');
            grid.className = 'grid';
            
            // 组装
            item.appendChild(pinyin);
            item.appendChild(grid);
            currentRow.appendChild(item);
            
            currentRowCount++;
        });
    }

    // 设置默认示例文本（可选）
    chineseInput.value = '我爱学习中文';
});
