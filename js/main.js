// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    const chineseInput = document.getElementById('chineseInput');
    const generateBtn = document.getElementById('generateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const previewSection = document.getElementById('previewSection');
    const tianzigengContainer = document.getElementById('tianzigeng');
    const worksheetTitle = document.getElementById('worksheetTitle');

    // 生成字帖按钮点击事件
    generateBtn.addEventListener('click', function() {
        const text = chineseInput.value.trim();
        
        if (!text) {
            alert('请输入中文内容！');
            return;
        }

        // 获取选中的字帖类型
        const worksheetType = document.querySelector('input[name="worksheetType"]:checked').value;
        
        // 更新标题
        if (worksheetType === 'hanzi') {
            worksheetTitle.textContent = '拼音默写汉字练习';
        } else {
            worksheetTitle.textContent = '汉字默写拼音练习';
        }

        // 生成田字格
        generateTianzigeng(text, worksheetType);
        
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
    function generateTianzigeng(text, worksheetType) {
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
            // 如果是换行符，重置行计数，准备开始新行
            if (char === '\n') {
                currentRowCount = 0; // 重置为0，下一个字符将开始新行
                return;
            }
            
            // 如果当前行已满11个字，忽略后续字符直到遇到换行符
            if (currentRowCount >= charsPerRow) {
                return;
            }
            
            // 如果需要新起一行
            if (currentRowCount === 0) {
                currentRow = document.createElement('div');
                // 根据模式添加不同的类名
                currentRow.className = worksheetType === 'pinyin' ? 'tianzigeng-row row-pinyin' : 'tianzigeng-row';
                tianzigengContainer.appendChild(currentRow);
            }
            
            // 如果是空格，创建空白占位
            if (char === ' ') {
                const space = document.createElement('div');
                // 根据模式设置不同的高度
                space.className = worksheetType === 'pinyin' ? 'tianzigeng-space space-pinyin' : 'tianzigeng-space';
                currentRow.appendChild(space);
                currentRowCount++;
                return;
            }
            
            // 获取对应的拼音和汉字
            let pinyinText = '';
            let hanziText = char;
            
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
            
            // 根据字帖类型决定显示内容
            if (worksheetType === 'hanzi') {
                // 显示拼音，学生默写汉字
                const pinyin = document.createElement('div');
                pinyin.className = 'pinyin';
                pinyin.textContent = pinyinText;
                item.appendChild(pinyin);
                
                // 田字格（空白）
                const grid = document.createElement('div');
                grid.className = 'grid';
                item.appendChild(grid);
            } else {
                // 显示汉字，学生默写拼音
                const pinyin = document.createElement('div');
                pinyin.className = 'pinyin pinyin-blank';
                pinyin.textContent = ''; // 拼音区域留空
                item.appendChild(pinyin);
                
                // 田字格（显示汉字）
                const grid = document.createElement('div');
                grid.className = 'grid grid-with-char';
                
                const charSpan = document.createElement('span');
                charSpan.className = 'character';
                charSpan.textContent = hanziText;
                grid.appendChild(charSpan);
                
                item.appendChild(grid);
            }
            
            currentRow.appendChild(item);
            currentRowCount++;
        });
    }

    // 设置默认示例文本
    chineseInput.value = '我爱 学习 中文 英文\n火了 大了 儿子 个子\n人口 大人 大山 可是';
});
