/* ALACarte 简体中文语言包（运行时注入，不修改任何业务逻辑）
 * 只替换"渲染出来的文本"和 placeholder/title 等展示属性，因此不可能影响功能。
 * 加载方式：由 index.html 引入；改完刷新浏览器即可生效。 */
(function () {
  if (window.__alacarteZh) return;
  window.__alacarteZh = true;

  var D = {
    /* ===== 导航 / 通用 ===== */
    "Home": "首页", "Search": "搜索", "Library": "音乐库", "Cloud Library": "云端曲库",
    "Cloud": "云端", "Downloads": "下载", "Following": "关注", "Status": "状态",
    "Settings": "设置", "Account": "账号", "Navigation": "导航", "Activity feed": "活动动态",
    "Back": "返回", "Close": "关闭", "Cancel": "取消", "Confirm": "确认", "Delete": "删除",
    "Clear": "清除", "Save": "保存", "Saved": "已保存", "Saved.": "已保存。", "Cleared.": "已清除。",
    "Dismiss": "忽略", "Show all": "显示全部", "Select all": "全选", "Deselect all": "取消全选",
    "Show more": "显示更多", "Show less": "收起", "Copy": "复制", "Copied": "已复制",
    "Yes": "是", "No": "否", "Done": "完成", "Edit": "编辑", "Refresh": "刷新",
    "Saving…": "保存中…", "Deleting…": "删除中…", "Loading…": "加载中…", "Checking…": "检查中…",
    "Starting…": "启动中…", "Stopping…": "停止中…", "Aborting…": "正在中止…",
    "Queuing…": "排队中…", "Queueing…": "加入队列中…", "Revoking…": "正在撤销…",
    "Verifying…": "验证中…", "Downloading…": "下载中…", "Signing in…": "正在登录…",
    "Signing out…": "正在登出…", "Reconnecting": "正在重连", "Connecting": "连接中",

    /* ===== 登录 / 账号 ===== */
    "Welcome back": "欢迎回来", "Sign in": "登录", "Sign out": "登出", "Sign Out": "登出",
    "Sign in to continue.": "登录后继续。", "Sign in required": "需要登录",
    "Create your account": "创建你的账号", "Create account": "创建账号",
    "Creating account…": "正在创建账号…", "Username": "用户名", "Password": "密码",
    "Current password": "当前密码", "New password": "新密码", "Confirm new password": "确认新密码",
    "Change password": "修改密码", "Change username": "修改用户名", "New username": "新用户名",
    "Password updated": "密码已更新", "Username updated": "用户名已更新",
    "Passwords don’t match.": "两次输入的密码不一致。",
    "Pick a username and password.": "请填写用户名和密码。",
    "Pick a different username to update.": "请换一个用户名再更新。",
    "Username can use letters, digits, dots, underscores, and hyphens.":
      "用户名可使用字母、数字、点、下划线和连字符。",
    "Password: at least 12 characters.": "密码至少 12 位。",
    "Show password": "显示密码", "Hide password": "隐藏密码",
    "Signing out…": "正在登出…", "Confirm sign out": "确认登出", "Sign out?": "要登出吗？",
    "Confirm sign out everywhere": "确认在所有设备登出",
    "Sign out everywhere": "在所有设备登出",
    "Signed out on all other devices.": "已在其他所有设备上登出。",
    "Failed to revoke sessions": "撤销会话失败",
    "Setup token is required for first-time setup.": "首次设置需要初始化令牌。",
    "You can change this later from Settings → Account.": "之后可在「设置 → 账号」中修改。",
    "Account service": "账号服务", "Signed in as": "当前登录账号",

    /* ===== Apple ID / 解密服务 ===== */
    "Apple ID credentials": "Apple ID 凭据", "Apple ID email": "Apple ID 邮箱",
    "Connect your Apple Music account": "连接你的 Apple Music 账号",
    "Re-run sign in": "重新登录", "Save & sign in": "保存并登录", "Cancel sign-in": "取消登录",
    "Save credentials": "保存凭据", "Currently stored.": "已保存。",
    "Signed in successfully. Ready to download.": "登录成功，可以开始下载了。",
    "Apple ID": "Apple ID", "Apple Music": "Apple Music", "Apple Music (default)": "Apple Music（默认）",
    "Apple Music wrapper": "Apple Music 解密服务", "Decryption wrapper": "解密服务",
    "Wrapper ready": "解密服务就绪", "Wrapper event": "解密服务事件",
    "Wrapper appears stalled": "解密服务疑似卡住", "Wrapper stalled — aborting job": "解密服务卡住——正在中止任务",
    "Download wrapper stalled and was auto-recovered.": "下载解密服务卡住，已自动恢复。",
    "Apple Music wrapper is offline — add credentials in Settings.": "Apple Music 解密服务离线——请在「设置」中添加凭据。",
    "Offline. Re-authenticate in Settings to bring the wrapper back.": "已离线。请到「设置」重新登录以恢复解密服务。",
    "Wrapper sign-in failed": "解密服务登录失败",
    "Signing in to Apple Music": "正在登录 Apple Music",
    "Signing in to Apple Music — this can take up to 90 seconds": "正在登录 Apple Music——最长可能需要 90 秒",
    "Preparing sign-in…": "正在准备登录…", "Preparing sign-in": "正在准备登录",
    "Preparing secure container…": "正在准备安全容器…",
    "Starting Apple Music wrapper…": "正在启动 Apple Music 解密服务…",
    "Starting wrapper services": "正在启动解密服务", "Creating wrapper session": "正在创建解密会话",
    "Waiting for your 2FA code": "等待你输入两步验证码", "Waiting for 2FA code": "等待两步验证码",
    "Two-factor code": "两步验证码", "Verifying 2FA code": "正在验证两步验证码",
    "Verifying 2FA code…": "正在验证两步验证码…",
    "Enter the 6-digit code Apple showed on your trusted device": "输入 Apple 在受信设备上显示的 6 位验证码",
    "Check your trusted Apple device and enter the code in Settings.":
      "请查看你的 Apple 受信设备，并在「设置」中输入验证码。",
    "Could not start sign-in": "无法发起登录", "Sign-in failed": "登录失败",
    "Unable to reach authentication service": "无法连接到认证服务",
    "Couldn’t load authentication state.": "无法加载认证状态。",
    "Too many attempts. Please wait and try again.": "尝试次数过多，请稍后再试。",
    "Clear the lockout first": "请先解除锁定",
    "Checking Apple Music access…": "正在检查 Apple Music 访问权限…",
    "Checking Apple service reachability…": "正在检查 Apple 服务连通性…",
    "Apple Music backend services are authenticated and ready.": "Apple Music 后端服务已认证，就绪。",
    "Could not fetch the public Apple Music bearer token.": "无法获取 Apple Music 公开令牌。",
    "Apple Music token": "Apple Music 令牌", "Apple token": "Apple 令牌",
    "Apple rejected the saved token. Refresh it in Settings — it expires periodically.":
      "Apple 已拒绝保存的令牌。请到「设置」重新获取——它会定期过期。",
    "media-user-token": "media-user-token（歌词用）",
    "Required for lyrics.": "下载歌词时需要（可选）。",
    /* 这段说明被 <a> 标签切成三段，逐段翻译 */
    "Required for lyrics. In your browser open": "下载歌词时需要（可选）。请在浏览器打开",
    ", play any song, then in the web inspector storage tab open the cookies for music.apple.com and double-click the value of the media-user-token row to copy the full string, it's long and opaque":
      "，播放任意一首歌，然后在开发者工具的存储面板里打开 music.apple.com 的 Cookie，双击 media-user-token 那一行的值即可复制完整字符串（很长，且难以辨认）",
    "Paste media-user-token": "粘贴 media-user-token",
    "Save token": "保存令牌", "Your media-user-token was rejected": "你的 media-user-token 被拒绝",

    /* ===== 曲库 / 商店 ===== */
    "Catalog": "曲库", "Storefront": "商店区域", "Content rating": "内容分级",
    "Prefer explicit": "优先显式版", "Prefer clean": "优先洁净版", "Show both": "两者都显示",
    "Release scope": "发行范围", "Versions to offer": "可选版本", "Offer:": "提供：",
    "Full albums only": "仅完整专辑", "Albums, singles, and EPs": "专辑、单曲与 EP",
    "Short-form releases only": "仅短篇发行（单曲/EP）", "Singles & EPs": "单曲与 EP",
    "Try Atmos when available": "有杜比全景声时优先", "Prefer Dolby Atmos": "优先杜比全景声",
    "Get Atmos version": "下载杜比全景声版本", "Get lossless version": "下载无损版本",
    "Get AAC version": "下载 AAC 版本", "Other versions": "其他版本",

    /* ===== 音质 ===== */
    "Download quality": "下载音质", "Choose download quality": "选择下载音质",
    "Choose quality": "选择音质", "Quality": "音质", "Auto (recommended)": "自动（推荐）",
    "Hi-Res Lossless": "高解析无损", "Lossless": "无损", "Hi-Res": "高解析",
    "Dolby Atmos": "杜比全景声", "Atmos": "全景声", "AAC": "AAC", "ALAC": "ALAC",
    "Prefer ALAC": "优先 ALAC", "Prefer AAC": "优先 AAC", "Prefer FLAC conversion": "优先转换为 FLAC",
    "Smaller lossy files": "有损格式，文件更小",
    "Ask for quality before manual downloads": "手动下载前先询问音质",
    "Keep Apple Lossless output": "保留 Apple 无损原始格式",
    "Convert lossless downloads to FLAC": "把无损下载转换为 FLAC",

    /* ===== 音乐库输出 ===== */
    "Library output": "音乐库输出", "Music folder": "音乐文件夹", "Naming convention": "命名规则",
    "Qobuz-compatible": "Qobuz 兼容命名", "Library tags": "音乐库标签",
    "Backfill library tags": "补全音乐库标签", "Start backfill": "开始补全标签",
    "Stop backfill": "停止补全", "Tag backfill started": "标签补全已开始",
    "Failed to start backfill": "启动标签补全失败",
    "Music output folder is not writable.": "音乐输出目录不可写。",
    "Store temp staging inside music library": "把临时文件存放在音乐库目录内",
    "Lyrics format": "歌词格式", "Lyrics type": "歌词类型", "Lyrics only": "仅歌词",
    "Lyrics + translation": "歌词 + 翻译",
    "LRC — line-synced (recommended)": "LRC —— 逐行同步（推荐）",
    "TTML — word/syllable sync": "TTML —— 逐词/逐音节同步",
    "Lyrics sidecar available": "有独立歌词文件", "No lyrics sidecar": "无独立歌词文件",
    "No lyrics": "无歌词", "Lyrics": "歌词",

    /* ===== 自动下载 / 关注 ===== */
    "Auto-downloads": "自动下载", "Enable Auto-Downloads": "启用自动下载",
    "Auto-downloads paused": "自动下载已暂停", "Check frequency": "检查频率",
    "Every hour": "每小时", "Every 6 hours": "每 6 小时", "Every 12 hours": "每 12 小时",
    "Daily": "每天", "Weekly": "每周",
    "Waiting for first check": "等待首次检查", "Waiting for first sync": "等待首次同步",
    "Follow artist": "关注歌手", "Unfollow artist": "取消关注歌手", "Followed artist": "关注的歌手",
    "Follow playlist": "关注歌单", "Unfollow playlist": "取消关注歌单", "Followed playlist": "关注的歌单",
    "Following section": "关注页", "Library section": "音乐库页",
    "Followed artists checked": "关注歌手已检查", "Followed playlists synced": "关注歌单已同步",
    "Checking followed artists": "正在检查关注的歌手", "Syncing followed playlists": "正在同步关注的歌单",
    "Followed artist event": "关注歌手事件", "Followed playlist event": "关注歌单事件",
    "No artists followed yet.": "还没有关注任何歌手。",
    "No playlists followed yet.": "还没有关注任何歌单。",
    "Open an artist page and use Follow to start watching for new albums and singles.":
      "打开歌手页面并点「关注」，即可开始追踪新专辑和单曲。",
    "Playlist followed. New tracks will download automatically.": "已关注歌单。新曲目将自动下载。",
    "Playlist unfollowed. Your existing downloads stay in the library.": "已取消关注歌单。已下载的内容仍保留在音乐库中。",
    "Failed to follow artist": "关注歌手失败", "Failed to unfollow artist": "取消关注歌手失败",
    "Failed to follow playlist": "关注歌单失败", "Failed to unfollow playlist": "取消关注歌单失败",
    "Failed to load followed items": "加载关注列表失败", "Failed to sync playlist": "同步歌单失败",
    "Playlist sync failed": "歌单同步失败", "Followed artist check failed": "关注歌手检查失败",
    "Failed to check for new music": "检查新音乐失败",
    "Browse cloud playlists": "浏览云端歌单", "Find artists": "查找歌手",

    /* ===== 下载 / 队列 ===== */
    "Download": "下载", "Downloads": "下载", "Download Playlist": "下载歌单",
    "Download in progress": "下载进行中", "Downloads are currently running": "当前有下载任务正在运行",
    "Confirm download all": "确认下载全部", "Confirm abort all": "确认中止全部",
    "Abort all": "全部中止", "Queue albums": "加入专辑队列", "Queue": "队列",
    "Active jobs": "进行中的任务", "No active jobs": "没有进行中的任务",
    "Nothing active.": "当前没有进行中的任务。", "Recent failures": "最近失败",
    "No recent failed jobs": "最近没有失败的任务", "No downloadable tracks": "没有可下载的曲目",
    "Already in library": "音乐库中已存在", "In library": "已在库中", "In Library": "已在库中",
    "Already imported": "已导入", "Album imported": "专辑已导入",
    "Playlist imported": "歌单已导入", "Track imported": "曲目已导入",
    "Queued album import": "已加入专辑导入队列", "Queued playlist import": "已加入歌单导入队列",
    "Queued track import": "已加入曲目导入队列",
    "Enqueue failed": "加入队列失败", "Failed to queue downloads": "加入下载队列失败",
    "Bulk download failed": "批量下载失败", "Import failed": "导入失败",
    "Auto-download triggered": "自动下载已触发", "Auto-download failed": "自动下载失败",
    "Playlist auto-download triggered": "歌单自动下载已触发",
    "Playlist auto-download failed": "歌单自动下载失败",
    "Downloaded": "已下载", "Queued": "排队中", "Running": "进行中", "Failed": "失败",
    "Cancelled": "已取消", "Unavailable": "不可用", "Latest": "最新",
    "Issue": "问题", "Delete failed": "删除失败", "Failed to load": "加载失败",
    "Failed to load library": "加载音乐库失败", "Search failed": "搜索失败",
    "Something went wrong": "出错了",
    "Something is not ready": "有组件尚未就绪", "Confirm delete": "确认删除",
    "Jump to latest": "跳到最新", "No events yet": "暂无事件", "Backend log": "后端日志",
    "Backend stream": "后端流", "M3U8 stream service": "M3U8 流服务",
    "Open status": "打开状态", "Open settings": "打开设置", "Open navigation": "打开导航",
    "Checking system status…": "正在检查系统状态…", "Loading recent job state…": "正在加载最近任务状态…",

    /* ===== 筛选 / 列表 ===== */
    "Filter results": "筛选结果", "Filter album types": "筛选专辑类型",
    "Filter this library page": "筛选当前音乐库页面",
    "Date added (newest)": "添加时间（最新优先）", "Date added (oldest)": "添加时间（最早优先）",
    "Name": "名称", "Title": "标题", "Album": "专辑", "Albums": "专辑",
    "Artist": "歌手", "Artists": "歌手", "Song": "歌曲", "Songs": "歌曲",
    "Single": "单曲", "Singles": "单曲", "Playlist": "歌单", "Playlists": "歌单",
    "EP": "EP", "EPs": "EP", "LP": "LP", "LPs": "LP", "Live": "现场",
    "Unknown artist": "未知歌手", "User-created": "用户创建",
    "New release": "新发行", "New track": "新曲目",
    "No albums found.": "未找到专辑。", "No singles found.": "未找到单曲。",
    "No playlists found.": "未找到歌单。", "No albums to queue.": "没有可加入队列的专辑。",
    "No albums match your filter.": "没有符合筛选条件的专辑。",
    "No singles match your filter.": "没有符合筛选条件的单曲。",
    "No playlists match your filter.": "没有符合筛选条件的歌单。",
    "Nothing here yet.": "这里还什么都没有。",
    "Everything": "全部", "Explicit": "显式版", "Clean": "洁净版",
    "Artists, albums, songs, playlists, or Apple Music links…": "歌手、专辑、歌曲、歌单，或 Apple Music 链接…",

    /* ===== Navidrome ===== */
    "Navidrome Integration": "Navidrome 集成", "Navidrome URL": "Navidrome 地址",
    "Enable automatic Navidrome scan": "下载完成后自动触发 Navidrome 扫描",
    "Save Navidrome settings": "保存 Navidrome 设置",
    "Wait a few minutes, then come back here, click": "等几分钟后回到此页，点击",

    /* ===== 商店区域 ===== */
    "United States": "美国", "United Kingdom": "英国", "Hong Kong": "中国香港",
    "Taiwan": "中国台湾", "Japan": "日本", "South Korea": "韩国", "Singapore": "新加坡",
    "Malaysia": "马来西亚", "Thailand": "泰国", "Vietnam": "越南", "Indonesia": "印度尼西亚",
    "Philippines": "菲律宾", "India": "印度", "Australia": "澳大利亚", "New Zealand": "新西兰",
    "Canada": "加拿大", "Mexico": "墨西哥", "Brazil": "巴西", "Argentina": "阿根廷",
    "Chile": "智利", "Colombia": "哥伦比亚", "Germany": "德国", "France": "法国",
    "Italy": "意大利", "Spain": "西班牙", "Netherlands": "荷兰", "Belgium": "比利时",
    "Austria": "奥地利", "Switzerland": "瑞士", "Sweden": "瑞典", "Norway": "挪威",
    "Denmark": "丹麦", "Finland": "芬兰", "Poland": "波兰", "Greece": "希腊",
    "Ireland": "爱尔兰", "Turkey": "土耳其", "Israel": "以色列", "Egypt": "埃及",
    "South Africa": "南非", "Saudi Arabia": "沙特阿拉伯", "United Arab Emirates": "阿联酋",

    /* ===== 第二轮补充（跨行 JSX 文案，首轮漏抽）===== */
    "Good listening": "好好享受音乐",
    "Active": "进行中",
    "Active work": "进行中的任务",
    "Recently imported": "最近导入",
    "Nothing downloading right now.": "当前没有正在下载的任务。",
    "No completed downloads yet.": "还没有已完成的下载。",
    "No active jobs.": "没有进行中的任务。",
    "No activity yet.": "暂无动态。",
    "Waiting for backend events.": "等待后端事件。",
    "Loading more…": "加载更多…",
    "Ready": "就绪",
    "System": "系统", "System health": "系统健康",
    "Browse": "浏览", "Unfollow": "取消关注", "Follow": "关注",
    "Retry": "重试", "Complete": "已完成", "Partial": "部分完成",
    "Yours": "你的", "just now": "刚刚",
    "Confirm password": "确认密码",
    "Setup token from server logs": "服务器日志中的初始化令牌",
    "Current:": "当前：", "Cover size": "封面尺寸",
    "Download all": "全部下载", "Download missing": "下载缺失部分",
    "Download multiple": "多选下载", "Download existing tracks": "下载已有曲目",
    "Download matching releases": "下载匹配的发行版", "Download lyrics": "下载歌词",
    "Queue download": "加入下载队列",
    "Open Settings": "打开设置", "Open activity": "查看动态", "Open Following": "打开关注页",
    "Sync now": "立即同步", "Check now": "立即检查",
    "Sign out on all devices": "在所有设备登出",
    "Filter library items": "筛选音乐库条目", "Sort library items": "排序音乐库条目",
    "Future releases only": "仅新发行", "Future additions only": "仅新增内容",
    "Apple Account locked": "Apple 账号被锁定",
    "All tracks saved": "全部曲目已保存",
    "Abort downloads": "中止下载",
    "Stopping after the current file…": "当前文件完成后停止…",
    "Controls how track and album folder names are written.": "控制曲目与专辑文件夹的命名方式。",
    "Show other version options on album pages": "在专辑页显示其他版本选项",
    "Download lyrics": "下载歌词",
    "Scan your library for missing tags?": "扫描音乐库补全缺失的标签？",
    "Triggers a Subsonic API scan immediately after a successful download.": "下载成功后立即触发 Subsonic API 扫描。",
    "Keep the default quality for automatic downloads, but choose per album, song, or playlist when starting downloads yourself.":
      "自动下载使用默认音质；你自己发起下载时，可按专辑／歌曲／歌单单独选择。",
    "For albums already in the library, offer pills to download the album again in the formats selected below. Each version is stored in its own folder.":
      "对于已在库中的专辑，显示按钮以便按下方选中的格式重新下载；每个版本存放在独立文件夹中。",
    "Pause background checks for followed artists and playlists without changing what you follow.":
      "暂停关注歌手／歌单的后台检查，但不取消关注。",
    "No credentials stored. Enter your Apple ID used for Apple Music.": "尚未保存凭据。请输入你用于 Apple Music 的 Apple ID。",
    "No credentials stored. Enter your Navidrome admin credentials.": "尚未保存凭据。请输入 Navidrome 管理员凭据。",
    "Off (recommended): use": "关闭（推荐）：使用",
    "This applies only to the download you are starting now.": "仅适用于你本次发起的下载。",
    "Applies to every item queued by this action.": "适用于本次操作加入队列的所有条目。",
    "Applies to every selected album in this queue.": "适用于本次队列中选中的每张专辑。",
    "Applies if you download the current discography now.": "若现在下载当前全部作品，则按此设置执行。",
    "Applies if you download the existing tracks now.": "若现在下载已有曲目，则按此设置执行。",
    "Choose what this follow should watch and download.": "选择关注后要追踪和下载的范围。",
    "This cancels every queued and running download. Completed history is kept.":
      "这将取消所有排队中与进行中的下载，已完成记录会保留。",
    "This removes the song file and its lyrics sidecar from your library.": "这会从音乐库中删除该歌曲文件及其歌词文件。",
    "Stop watching for new releases? Your existing downloads stay in the library.":
      "确定停止追踪新发行？已下载的内容仍保留在音乐库中。",
    "Stop watching for new tracks? Your existing downloads stay in the library.":
      "确定停止追踪新曲目？已下载的内容仍保留在音乐库中。",
    "Try searching for an artist, album, or song — or paste an Apple Music link.":
      "试试搜索歌手、专辑或歌曲，或直接粘贴 Apple Music 链接。",
    "Follow artists to watch for new releases and playlists to auto-download tracks you add to them.":
      "关注歌手可追踪新发行；关注歌单可自动下载你新增的曲目。",
    "Open one of your Apple Music playlists (or any Apple playlist) and use Follow. ALACarte will download every track you add to it.":
      "打开你的某个 Apple Music 歌单（或任意 Apple 歌单）并点「关注」，ALACarte 会下载你加入其中的每首曲目。",
    "ALACarte will watch this playlist and automatically download tracks you add to it. Removing a track from the playlist keeps its download in your library.":
      "ALACarte 会追踪该歌单并自动下载你新增的曲目；从歌单移除曲目不会删除已下载的文件。",
    "Sign in once with the new password on a trusted Apple device so Apple trusts the account again.":
      "请先在受信的 Apple 设备上用新密码登录一次，让 Apple 重新信任该账号。",
    "Retrying without doing the above will only deepen the lockout — this is Apple's anti-abuse protection, not a bug here.":
      "不做上述处理就反复重试只会延长锁定时间——这是 Apple 的防滥用机制，不是本程序的缺陷。",

    /* ===== 第三轮补充（直接从构建产物精确取值）===== */
    ", and enter the new credentials.": "，然后输入新的凭据。",
    ". Adjusts automatically to keep Apple Music API calls under the daily safety budget.": "。会自动调整频率，确保 Apple Music API 调用不超过每日安全额度。",
    ". Items already in your local library are skipped automatically.": "。已在本地音乐库中的条目会自动跳过。",
    "Couldn’t reach Apple Music": "无法连接 Apple Music",
    "Delete album \"": "删除专辑「",
    "Show wrapper log": "显示解密服务日志",
    "This removes all tracks and lyrics in this album folder for": "这会删除该专辑文件夹中的全部曲目与歌词，对象是",
    "To list your saved library here, paste your media-user-token in Settings. Without it, ALACarte can only fetch the public catalog.": "要在这里列出你收藏的音乐库，请在「设置」中粘贴 media-user-token；没有它，ALACarte 只能获取公开曲库。",
    "for download.": "用于下载。",
    "for future releases, with the option to download matching releases now.": "用于追踪新发行，并可选择立即下载匹配的发行版。",
    "in Apple Music and they'll show up here.": "加入 Apple Music 后就会出现在这里。",
    "in your Apple Music library": "在你的 Apple Music 音乐库中",
    "is now followed.": "已开始关注。",
    "not in library": "不在音乐库中",
    "not on Apple Music": "Apple Music 上没有",
    "strips featured-artist tags and trailing “– Single” suffixes to match Qobuz/Octo Fiesta naming.": "会去掉合唱歌手标记和结尾的「– Single」后缀，以匹配 Qobuz/Octo Fiesta 命名规则。",

    /* ===== 第四轮补充（局部定位精确取值）===== */
    "Apple sent a 6-digit code to your trusted devices. If you only see Allow / Not Me, generate a code from Settings → Apple ID → Sign-In & Security → Get Verification Code.": "Apple 已向你的受信设备发送 6 位验证码。如果只看到「允许 / 不是我」，请在 设置 → Apple ID → 登录与安全 → 获取验证码 中生成一个验证码。",
    "Downloads are stamped with ISRC and barcode tags so duplicate detection works even when folder names don't match Apple's metadata. Backfilling matches every untagged FLAC in your library against Apple Music and updates the files in place.": "下载的文件会写入 ISRC 和条码标签，因此即使文件夹名与 Apple 的元数据不一致，也能准确识别重复。补全功能会把音乐库中所有未打标签的 FLAC 与 Apple Music 比对，并就地更新文件。",
    "Each artist and playlist is checked at most once every": "每位歌手和每个歌单最多每隔",
    "Loading followed": "正在加载关注的",
    "Reset your password at": "在此重置密码：",
    "Currently ≈ every": "当前约",

    /* ===== 覆盖率检查补充 ===== */
    "Delete playlist \"": "删除歌单「",
    "Failed to change password": "修改密码失败",
    "Failed to change username": "修改用户名失败",
    "Failed to download missing releases": "下载缺失发行版失败",
    "Failed to download missing tracks": "下载缺失曲目失败",
    "Failed to update release scope": "更新发行范围失败",
    "Latest release": "最新发行",
    "Network or token error while probing the Apple Music library.": "探测 Apple Music 音乐库时出现网络或令牌错误。",
  };

  /* 动态文案（带数字/变量的）。第二项可以是字符串，也可以是函数（接收匹配数组） */
  var RULES = [
    /* 商店区域下拉框形如 "United States (US)" / "Turkey (TR)"：查表翻译国家名，保留区域代码 */
    [/^(.+?) \(([A-Z]{2,4})\)$/, function (m) { return (D[m[1]] || m[1]) + " (" + m[2] + ")"; }],
    [/^(\d+)×(\d+)\s*\(recommended\)$/i, "$1×$2（推荐）"],
    [/^(\d+)×(\d+)\s*\(max, large\)$/i, "$1×$2（上限，体积较大）"],
    [/^(\d+)×(\d+)$/i, "$1×$2"],
    [/^(\d+)\s+tracks?$/i, "$1 首"],
    [/^(\d+)\s+songs?$/i, "$1 首"],
    [/^(\d+)\s+albums?$/i, "$1 张专辑"],
    [/^(\d+)\s+singles?$/i, "$1 首单曲"],
    [/^(\d+)\s+eps?$/i, "$1 张 EP"],
    [/^(\d+)\s+playlists?$/i, "$1 个歌单"],
    [/^(\d+)\s+artists?$/i, "$1 位歌手"],
    [/^(\d+)\s+of\s+(\d+)$/i, "$1 / $2"],
    [/^(\d+)\s+selected$/i, "已选 $1 项"],
    [/^(\d+)\s+(minutes?|mins?)\s+ago$/i, "$1 分钟前"],
    [/^(\d+)\s+(hours?)\s+ago$/i, "$1 小时前"],
    [/^(\d+)\s+(days?)\s+ago$/i, "$1 天前"],
    [/^just now$/i, "刚刚"]
  ];

  var ATTRS = ["placeholder", "title", "aria-label", "alt"];

  function translate(str) {
    if (!str) return null;
    var key = str.trim();
    if (!key) return null;
    if (Object.prototype.hasOwnProperty.call(D, key)) return D[key];
    for (var i = 0; i < RULES.length; i++) {
      var mm = key.match(RULES[i][0]);
      if (mm) {
        var rep = RULES[i][1];
        return typeof rep === "function" ? rep(mm) : key.replace(RULES[i][0], rep);
      }
    }
    return null;
  }

  function doText(node) {
    var out = translate(node.nodeValue);
    if (out !== null && out !== node.nodeValue.trim()) {
      node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), out);
    }
  }

  function doAttrs(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i], v = el.getAttribute && el.getAttribute(a);
      if (!v) continue;
      var out = translate(v);
      if (out !== null) el.setAttribute(a, out);
    }
  }

  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { doText(root); return; }
    if (root.nodeType !== 1) return;
    var tag = root.tagName;
    if (!tag) return;
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return;
    if (tag === "INPUT" || tag === "TEXTAREA") { doAttrs(root); return; }
    doAttrs(root);
    // 保险：原生 <select> 的 <option> 若没有显式 value，浏览器会把它的显示文字当作
    // 表单值，翻译文字会连带改掉取值。这种情况只翻译属性，不动文字。
    if (tag === "OPTION" && !root.hasAttribute("value")) return;
    var kids = root.childNodes;
    for (var i = 0; i < kids.length; i++) walk(kids[i]);
  }

  function run() {
    walk(document.body);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      run();
      observe();
    });
  } else {
    run();
    observe();
  }

  function observe() {
    if (!window.MutationObserver) return;
    var obs = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === "characterData") {
          var p = m.target.parentNode;
          if (p && p.tagName === "OPTION" && !p.hasAttribute("value")) continue;
          doText(m.target);
          continue;
        }
        if (m.type === "attributes") { doAttrs(m.target); continue; }
        for (var j = 0; j < m.addedNodes.length; j++) walk(m.addedNodes[j]);
      }
    });
    obs.observe(document.body, {
      childList: true, subtree: true, characterData: true,
      attributes: true, attributeFilter: ATTRS
    });
  }
})();
