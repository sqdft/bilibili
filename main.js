document.getElementById('btnExtract').addEventListener('click', async () => {
    const bvid = document.getElementById('bvidInput').value.trim();
    const resultDiv = document.getElementById('result');
    if (!bvid) {
      resultDiv.innerHTML = `<div class="error">请输入有效的BV号或视频链接</div>`;
      return;
    }
  
    resultDiv.innerHTML = '正在提取封面，请稍等...';
  
    try {
      // 注意：这里请求后端接口地址，如果前端和后端不在同域，可能要写完整URL并处理CORS
      const res = await fetch(`/api/cover?bvid=${encodeURIComponent(bvid)}`);
      if (!res.ok) throw new Error('服务器响应异常');
  
      const data = await res.json();
  
      if (data.cover_url) {
        // 图片代理路径（根据你后端实际代理接口调整）
        const imgUrl = `/proxy-image?url=${encodeURIComponent(data.cover_url)}`;
  
        resultDiv.innerHTML = `
          <div class="video-info">
            <h2>${data.title || '未获取标题'}</h2>
            <p>UP主：${data.author || '未知'}</p>
          </div>
          <div class="cover">
            <img src="${imgUrl}" alt="封面图" />
            <div class="download-btn">
              <a href="${imgUrl}" download="cover.jpg">
                <button>📥 下载封面图</button>
              </a>
            </div>
          </div>
        `;
      } else {
        resultDiv.innerHTML = `<div class="error">❌ 提取失败：${data.error || '未知错误'}</div>`;
      }
    } catch (err) {
      resultDiv.innerHTML = `<div class="error">❌ 网络错误或服务器异常</div>`;
      console.error(err);
    }
  });
  