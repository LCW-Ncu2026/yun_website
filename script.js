// 1. 获取 DOM 元素
const avatarInput = document.getElementById('avatarInput');
const nameInput = document.getElementById('nameInput');
const schoolInput = document.getElementById('schoolInput');
const skillsInput = document.getElementById('skillsInput');
const bioInput = document.getElementById('bioInput');
const qqInput = document.getElementById('qqInput');
const wechatInput = document.getElementById('wechatInput');
const emailInput = document.getElementById('emailInput');
const githubInput = document.getElementById('githubInput');

const avatarPreview = document.getElementById('avatarPreview');
const namePreview = document.getElementById('namePreview');
const schoolPreview = document.getElementById('schoolPreview');
const skillsPreview = document.getElementById('skillsPreview');
const bioPreview = document.getElementById('bioPreview');
const contactsPreview = document.getElementById('contactsPreview');

const downloadBtn = document.getElementById('downloadBtn');
const cardToExport = document.getElementById('cardToExport');

// 2. 监听头像上传并预览
avatarInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            avatarPreview.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// 3. 实时更新文字信息
nameInput.addEventListener('input', () => {
    namePreview.textContent = nameInput.value || '你的姓名';
});

schoolInput.addEventListener('input', () => {
    schoolPreview.textContent = schoolInput.value || '学校与专业';
});

bioInput.addEventListener('input', () => {
    bioPreview.textContent = bioInput.value || '这里显示你的个人简介...';
});

// 4. 更新技能标签 (逗号分隔)
skillsInput.addEventListener('input', () => {
    skillsPreview.innerHTML = ''; // 清空旧的
    const skills = skillsInput.value.split(',').filter(s => s.trim() !== '');
    if (skills.length === 0) {
        skillsPreview.innerHTML = '<span>技能标签</span>';
    } else {
        skills.forEach(skill => {
            const span = document.createElement('span');
            span.textContent = skill.trim();
            skillsPreview.appendChild(span);
        });
    }
});

// 5. 更新联系方式
function updateContacts() {
    contactsPreview.innerHTML = '';
    if (qqInput.value) contactsPreview.innerHTML += `<p>🐧 QQ: ${qqInput.value}</p >`;
    if (wechatInput.value) contactsPreview.innerHTML += `<p>💬 微信: ${wechatInput.value}</p >`;
    if (emailInput.value) contactsPreview.innerHTML += `<p>📧 邮箱: ${emailInput.value}</p >`;
    if (githubInput.value) contactsPreview.innerHTML += `<p>🐙 GitHub: ${githubInput.value}</p >`;
    
    if (contactsPreview.innerHTML === '') {
        contactsPreview.innerHTML = '<p>📧 邮箱: 待填写</p ><p>🐙 GitHub: 待填写</p >';
    }
}
qqInput.addEventListener('input', updateContacts);
wechatInput.addEventListener('input', updateContacts);
emailInput.addEventListener('input', updateContacts);
githubInput.addEventListener('input', updateContacts);

// 6. 核心魔法：生成海报并下载
downloadBtn.addEventListener('click', () => {
    // 改变按钮文字提示
    downloadBtn.textContent = '正在生成海报...';
    
    // html2canvas 截图
    html2canvas(cardToExport, {
        backgroundColor: '#1e1e2f', // 给海报加个底色
        scale: 2 // 提高清晰度
    }).then(canvas => {
        // 创建一个隐藏的 a 标签触发下载
        const link = document.createElement('a');
        link.download = '我的云端名片.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        // 恢复按钮文字
        downloadBtn.textContent = '保存名片为海报 📸';
    });
});