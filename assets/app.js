/* ===== Java 程序题练习 · 交互逻辑 ===== */
(function () {
  'use strict';

  var DATA = window.QUIZ_DATA || { meta: {}, questions: [] };
  var QUESTIONS = DATA.questions;
  var STORE_KEY = 'java-practice:' + (DATA.meta.title || 'quiz') + ':v1';

  var STARTER = [
    'import java.util.Scanner;',
    '',
    'public class Main {',
    '    public static void main(String[] args) {',
    '        Scanner sc = new Scanner(System.in);',
    '',
    '        // 在这里写你的代码',
    '',
    '    }',
    '}',
    ''
  ].join('\n');

  /* ---------- 状态 ---------- */
  var state = { idx: 0, theme: 'light', progress: {} };

  function loadState() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var s = JSON.parse(raw);
        if (s && typeof s === 'object') {
          state.idx = Number.isInteger(s.idx) ? s.idx : 0;
          state.theme = s.theme === 'dark' ? 'dark' : 'light';
          state.progress = s.progress && typeof s.progress === 'object' ? s.progress : {};
        }
      }
    } catch (e) { /* ignore */ }
  }

  var saveTimer = null;
  function saveState(now) {
    if (saveTimer) clearTimeout(saveTimer);
    var doIt = function () {
      try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
      saveTimer = null;
    };
    if (now) doIt(); else saveTimer = setTimeout(doIt, 350);
  }

  function rec(q) {
    var id = String(q.id);
    if (!state.progress[id]) state.progress[id] = {};
    return state.progress[id];
  }

  function codeOf(q) {
    var r = rec(q);
    return typeof r.code === 'string' ? r.code : STARTER;
  }

  /* ---------- DOM ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var qlist = $('qlist'), stemEl = $('stem'), qNo = $('qNo'), qType = $('qType');
  var stdinEl = $('stdin'), doneChk = $('doneChk'), consoleEl = $('console');
  var verdictEl = $('verdict'), metricsEl = $('metrics');
  var stdoutBlock = $('stdoutBlock'), stdoutEl = $('stdout');
  var stderrBlock = $('stderrBlock'), stderrEl = $('stderr');
  var compileBlock = $('compileBlock'), compileOutEl = $('compileOut');
  var runBtn = $('runBtn'), verifyBtn = $('verifyBtn'), runStatus = $('runStatus'), noticeEl = $('notice');
  var refBox = $('refBox'), refCodeEl = $('refCode');
  var toastEl = $('toast'), lightbox = $('lightbox'), lightboxImg = $('lightboxImg');
  var sidebar = $('sidebar'), scrim = $('scrim');

  /* ---------- 工具 ---------- */
  var toastTimer = null;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 1900);
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function b64encode(str) {
    var bytes = new TextEncoder().encode(str);
    var bin = '', chunk = 0x8000;
    for (var i = 0; i < bytes.length; i += chunk) {
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    return btoa(bin);
  }

  function b64decode(s) {
    if (!s) return '';
    try {
      var bin = atob(s);
      var bytes = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return new TextDecoder().decode(bytes);
    } catch (e) { return ''; }
  }

  /* ---------- 编辑器 ---------- */
  var editor = (function () {
    var el = $('editor');
    var ta = null;

    if (window.CodeMirror && window.CodeMirror.fromTextArea) {
      try {
        ta = window.CodeMirror.fromTextArea(el, {
          mode: 'text/x-java',
          theme: 'material-darker',
          lineNumbers: true,
          indentUnit: 4,
          tabSize: 4,
          smartIndent: true,
          autoCloseBrackets: true,
          matchBrackets: true,
          styleActiveLine: true,
          lineWrapping: false,
          extraKeys: {
            'Ctrl-Enter': function () { doRun(); },
            'Cmd-Enter': function () { doRun(); },
            Tab: function (cm) { cm.execCommand('indentMore'); },
            'Shift-Tab': function (cm) { cm.execCommand('indentLess'); }
          }
        });
        ta.on('change', function () {
          rec(QUESTIONS[state.idx]).code = ta.getValue();
          saveState();
        });
        return {
          get: function () { return ta.getValue(); },
          set: function (v) { ta.setValue(v); },
          refresh: function () { ta.refresh(); },
          focus: function () { ta.focus(); }
        };
      } catch (e) { ta = null; }
    }

    el.addEventListener('input', function () {
      rec(QUESTIONS[state.idx]).code = el.value;
      saveState();
    });
    el.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); doRun(); return; }
      if (e.key === 'Tab') {
        e.preventDefault();
        var s = el.selectionStart, t = el.selectionEnd;
        el.value = el.value.slice(0, s) + '    ' + el.value.slice(t);
        el.selectionStart = el.selectionEnd = s + 4;
        rec(QUESTIONS[state.idx]).code = el.value;
        saveState();
      }
    });
    return {
      get: function () { return el.value; },
      set: function (v) { el.value = v; },
      refresh: function () {},
      focus: function () { el.focus(); }
    };
  })();

  /* ---------- 列表渲染 ---------- */
  var filter = 'all';
  var keyword = '';

  function currentQ() { return QUESTIONS[state.idx] || QUESTIONS[0]; }

  function renderList() {
    var kw = keyword.trim().toLowerCase();
    var html = '';
    var shown = 0;
    QUESTIONS.forEach(function (q, i) {
      var r = rec(q);
      if (filter === 'done' && !r.done) return;
      if (filter === 'todo' && r.done) return;
      if (kw && !((q.no + ' ' + q.summary).toLowerCase().indexOf(kw) >= 0)) return;
      shown++;
      var cls = [];
      if (i === state.idx) cls.push('active');
      if (r.done) cls.push('done');
      html += '<li class="' + cls.join(' ') + '" data-idx="' + i + '">' +
        '<span class="badge">' + (r.done ? '✓' : q.no) + '</span>' +
        '<span class="qtext">' + esc(q.summary) + '</span></li>';
    });
    if (!shown) html = '<li class="empty">没有匹配的题目</li>';
    qlist.innerHTML = html;

    var done = QUESTIONS.filter(function (q) { return rec(q).done; }).length;
    $('progressText').textContent = done + ' / ' + QUESTIONS.length;
    $('progressBar').style.width = (QUESTIONS.length ? (done / QUESTIONS.length) * 100 : 0) + '%';
  }

  /* ---------- 题目渲染 ---------- */
  function renderQuestion() {
    var q = currentQ();
    var r = rec(q);

    qNo.textContent = '第 ' + q.no + ' 题';
    qType.textContent = q.type;

    stemEl.innerHTML = q.stem;
    Array.prototype.forEach.call(stemEl.querySelectorAll('.stem-img'), function (img) {
      img.addEventListener('click', function () {
        lightboxImg.src = img.src;
        lightbox.hidden = false;
      });
    });

    editor.set(codeOf(q));
    stdinEl.value = typeof r.stdin === 'string' ? r.stdin : (q.sampleStdin || '');
    doneChk.checked = !!r.done;

    refBox.hidden = true;
    refCodeEl.textContent = q.refCode || '（本题没有收录参考答案）';
    hideNotice();

    if (r.resultVersion === 2 && r.verdictText) {
      consoleEl.hidden = false;
      verdictEl.textContent = r.verdictText || '—';
      verdictEl.className = 'verdict ' + (r.verdictClass || '');
      metricsEl.textContent = r.metrics || '';
      stdoutEl.textContent = r.out || '（程序没有任何输出）';
      stdoutBlock.hidden = false;
      if (r.errOut) { stderrBlock.hidden = false; stderrEl.textContent = r.errOut; } else { stderrBlock.hidden = true; }
      if (r.compileOut) { compileBlock.hidden = false; compileOutEl.textContent = r.compileOut; } else { compileBlock.hidden = true; }
    } else {
      consoleEl.hidden = true;
    }

    document.title = '第 ' + q.no + ' 题 · Java 程序题练习';
    $('subTitle').textContent = (DATA.meta.title || '') + ' · ' + QUESTIONS.length + ' 道程序题';
    closeSidebar();
    editor.refresh();
  }

  function select(i, scroll) {
    if (i < 0 || i >= QUESTIONS.length) return;
    state.idx = i;
    saveState();
    renderList();
    renderQuestion();
    if (scroll !== false) {
      var li = qlist.querySelector('li.active');
      if (li && li.scrollIntoView) li.scrollIntoView({ block: 'nearest' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------- 提示条 ---------- */
  function showNotice(msg, actionText, actionFn) {
    noticeEl.innerHTML = '';
    noticeEl.appendChild(document.createTextNode(msg));
    if (actionText && actionFn) {
      var b = document.createElement('button');
      b.className = 'mini';
      b.textContent = actionText;
      b.addEventListener('click', actionFn);
      noticeEl.appendChild(b);
    }
    noticeEl.hidden = false;
  }
  function hideNotice() { noticeEl.hidden = true; noticeEl.innerHTML = ''; }

  /* ---------- 在线运行 ---------- */
  // Judge0 CE 公共实例：language_id 62 = Java (OpenJDK)
  var JUDGE0_URL = 'https://ce.judge0.com/submissions?base64_encoded=true&wait=true';
  var WANDBOX_URL = 'https://wandbox.org/api/compile.json';

  var STATUS_TEXT = {
    3: ['运行成功（未验证）', 'warn'],
    4: ['Wrong Answer', 'bad'],
    5: ['Time Limit Exceeded', 'bad'],
    6: ['Compilation Error', 'bad'],
    13: ['Internal Error', 'warn'],
    14: ['Exec Format Error', 'bad']
  };

  function statusInfo(id) {
    if (STATUS_TEXT[id]) return { text: STATUS_TEXT[id][0], cls: STATUS_TEXT[id][1] };
    if (id >= 7 && id <= 12) return { text: 'Runtime Error', cls: 'bad' };
    return { text: '完成', cls: '' };
  }

  function request(url, options) {
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, 30000);
    options.signal = controller.signal;
    return fetch(url, options).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    }).finally(function () { clearTimeout(timer); });
  }

  function runJudge0(code, stdin) {
    return request(JUDGE0_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language_id: 62,
        source_code: b64encode(code),
        stdin: b64encode(stdin),
        cpu_time_limit: 5,
        wall_time_limit: 15
      })
    }).then(function poll(j) {
      if (j.status && (j.status.id === 1 || j.status.id === 2)) {
        if (!j.token) throw new Error('评测服务没有返回任务编号');
        var deadline = Date.now() + 30000;
        function check() {
          if (Date.now() > deadline) throw new Error('评测等待超时');
          return new Promise(function (resolve) { setTimeout(resolve, 1000); }).then(function () {
            return request('https://ce.judge0.com/submissions/' + encodeURIComponent(j.token) + '?base64_encoded=true', { method: 'GET' });
          }).then(function (next) {
            if (next.status && (next.status.id === 1 || next.status.id === 2)) return check();
            return next;
          });
        }
        return check();
      }
      return j;
    }).then(function (j) {
      if (j.error) { var e = new Error(j.error); e.code = 'API'; throw e; }
      if (!j.status || typeof j.status.id !== 'number') throw new Error('评测服务返回无效结果');
      var info = statusInfo(j.status && j.status.id);
      return {
        backend: 'Judge0 · Java ' + (j.status ? j.status.description : ''),
        verdict: info.text,
        cls: info.cls,
        stdout: b64decode(j.stdout),
        stderr: b64decode(j.stderr),
        compile: b64decode(j.compile_output),
        message: b64decode(j.message),
        time: j.time, memory: j.memory,
        statusId: j.status && j.status.id
      };
    });
  }

  function runWandbox(code, stdin) {
    // Wandbox 的 Java 要求文件名 prog.java，因此把公有类名改成 prog
    var fixed = code.replace(/\bpublic\s+class\s+[A-Za-z_$][\w$]*/, 'public class prog');
    return request(WANDBOX_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        compiler: 'openjdk-jdk-21+35',
        code: fixed,
        stdin: stdin,
        'compiler-option-raw': '-encoding\nUTF-8',
        'runtime-option-raw': '-Dfile.encoding=UTF-8\n-Dsun.stdout.encoding=UTF-8\n-Dsun.stderr.encoding=UTF-8'
      })
    }).then(function (j) {
      if (j.status == null) throw new Error('备用服务返回无效结果');
      var ok = String(j.status) === '0';
      return {
        backend: 'Wandbox · Java',
        verdict: ok ? '运行成功（未验证）' : 'Compilation Error / Runtime Error',
        cls: ok ? 'warn' : 'bad',
        stdout: j.program_output || '',
        stderr: j.program_error || '',
        compile: j.compiler_error || j.compiler_output || '',
        message: '',
        time: null, memory: null,
        statusId: ok ? 3 : 6
      };
    });
  }

  function renderResult(r, stdinUsed, q) {
    var parts = [r.backend];
    if (r.time != null) parts.push('耗时 ' + r.time + ' s');
    if (r.memory != null) parts.push('内存 ' + (r.memory / 1024).toFixed(1) + ' MB');
    var out = r.stdout || '';
    var err = r.stderr || r.message || '';
    var comp = r.compile || '';
    var recd = rec(q);
    recd.out = out;
    recd.errOut = err;
    recd.compileOut = comp;
    recd.verdictText = r.verdict || '完成';
    recd.verdictClass = r.cls || '';
    recd.resultVersion = 2;
    recd.metrics = parts.join('  ·  ');
    saveState();
    if (currentQ().id !== q.id) return;
    consoleEl.hidden = false;
    verdictEl.textContent = r.verdict || '完成';
    verdictEl.className = 'verdict ' + (r.cls || '');

    metricsEl.textContent = recd.metrics;

    stdoutEl.textContent = out || (r.statusId === 3 ? '（程序没有任何输出）' : '');
    stdoutBlock.hidden = false;

    stderrEl.textContent = err;
    stderrBlock.hidden = !err;

    compileOutEl.textContent = comp;
    compileBlock.hidden = !comp;

    // 友好的失败提示
    if (r.statusId === 6 && /class .* is public, should be declared/.test(comp)) {
      showNotice('在线评测要求文件名为 Main.java，公有类名必须是 Main。', '自动改成 Main', function () {
        var fixed = editor.get().replace(/\bpublic\s+class\s+[A-Za-z_$][\w$]*/, 'public class Main');
        editor.set(fixed);
        rec(currentQ()).code = fixed;
        saveState();
        hideNotice();
        doRun();
      });
    } else if (r.statusId === 11 || (r.statusId >= 7 && r.statusId <= 12)) {
      if (!stdinUsed) {
        showNotice('程序似乎需要键盘输入，但「程序输入 stdin」是空的。填好输入内容再运行一次试试。');
      }
    }
  }

  var running = false;

  function normalizeOutput(s) {
    // 保留数字/英文词的边界，避免把「1 23」误当作「12 3」。
    return (String(s || '').match(/[A-Za-z0-9_$]+|[^\s]/g) || []).join('\u0000');
  }
  function normalizeInput(s) { return String(s || '').trim().replace(/\s+/g, ' '); }

  function assess(r, test) {
    if (r.statusId !== 3) return r;
    if (!normalizeOutput(r.stdout)) {
      r.verdict = '答案不正确：程序没有输出';
      r.cls = 'bad';
    } else if (!test || !normalizeOutput(test.expectedStdout)) {
      r.verdict = '运行成功（当前输入未验证）';
      r.cls = 'warn';
    } else if (normalizeOutput(r.stdout) === normalizeOutput(test.expectedStdout)) {
      r.verdict = '当前用例通过';
      r.cls = 'ok';
    } else {
      r.verdict = '答案不正确：输出不匹配';
      r.cls = 'bad';
      r.message = '期望输出：\n' + test.expectedStdout;
    }
    return r;
  }

  function execute(code, stdin) {
    return runJudge0(code, stdin).catch(function () {
      runStatus.textContent = '主评测服务不可用，正在尝试备用服务…';
      return runWandbox(code, stdin);
    });
  }

  function doRun(verifyAll) {
    verifyAll = verifyAll === true;
    if (running) return;
    var q = currentQ();
    var code = editor.get();
    if (!code.trim() || normalizeOutput(code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '')) ===
        normalizeOutput(STARTER.replace(/\/\/[^\n]*/g, ''))) {
      hideNotice();
      renderResult({ verdict: '尚未作答：请先完成模板', cls: 'bad', statusId: 4,
        stdout: '', backend: '输入检查' }, false, q);
      editor.focus();
      return;
    }

    var m = code.match(/\bpublic\s+class\s+([A-Za-z_$][\w$]*)/);
    if (m && m[1] !== 'Main') {
      showNotice('检测到公有类名是 “' + m[1] + '”，在线评测要求公有类必须叫 Main。', '自动改成 Main', function () {
        var fixed = code.replace(/\bpublic\s+class\s+[A-Za-z_$][\w$]*/, 'public class Main');
        editor.set(fixed);
        rec(q).code = fixed;
        saveState();
        hideNotice();
      });
      return;
    }

    var stdin = stdinEl.value;
    rec(q).stdin = stdin;
    saveState();

    running = true;
    runBtn.disabled = true;
    verifyBtn.disabled = true;
    runStatus.textContent = '正在编译并运行…（首次可能需要几秒）';
    runStatus.className = 'run-status busy';
    hideNotice();

    var started = Date.now();

    var tests = q.tests || [];
    var task;
    if (verifyAll && !tests.length) {
      task = Promise.reject(new Error('本题暂无测试用例'));
    } else if (verifyAll) {
      task = (async function () {
        var last;
        for (var i = 0; i < tests.length; i++) {
          runStatus.textContent = '正在验证用例 ' + (i + 1) + ' / ' + tests.length;
          last = assess(await execute(code, tests[i].stdin), tests[i]);
          if (last.cls !== 'ok') {
            last.verdict = '用例 ' + (i + 1) + ' / ' + tests.length + ' 未通过：' + last.verdict;
            last.message = '测试输入：\n' + (tests[i].stdin || '（无）') + '\n' + (last.message || '');
            return last;
          }
        }
        last.verdict = '全部用例通过（' + tests.length + ' / ' + tests.length + '）';
        return last;
      })();
    } else {
      var test = tests.find(function (t) { return normalizeInput(t.stdin) === normalizeInput(stdin); });
      task = execute(code, stdin).then(function (r) { return assess(r, test); });
    }
    task
      .then(function (r) {
        runStatus.textContent = '运行完成，用时 ' + ((Date.now() - started) / 1000).toFixed(1) + ' 秒';
        runStatus.className = 'run-status';
        renderResult(r, !!stdin.trim(), q);
      })
      .catch(function (e) {
        runStatus.textContent = '';
        runStatus.className = 'run-status';
        renderResult({ verdict: '服务不可用（未验证）', cls: 'warn', stdout: '', backend: '在线运行', statusId: 13 }, false, q);
        if (currentQ().id === q.id) showNotice('在线运行服务暂时不可用（' + (e && e.message ? e.message : '网络错误') +
          '）。可以稍后重试，或先「查看参考答案」自己核对。');
      })
      .then(function () {
        running = false;
        runBtn.disabled = false;
        verifyBtn.disabled = false;
      });
  }

  /* ---------- 主题 ---------- */
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    $('themeBtn').textContent = state.theme === 'dark' ? '☀️' : '🌙';
  }

  /* ---------- 侧栏（移动端） ---------- */
  function openSidebar() { sidebar.classList.add('open'); scrim.classList.add('show'); }
  function closeSidebar() { sidebar.classList.remove('open'); scrim.classList.remove('show'); }

  /* ---------- 事件绑定 ---------- */
  qlist.addEventListener('click', function (e) {
    var li = e.target.closest ? e.target.closest('li[data-idx]') : null;
    if (li) select(Number(li.dataset.idx));
  });

  $('filters').addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('button[data-filter]') : null;
    if (!b) return;
    filter = b.dataset.filter;
    Array.prototype.forEach.call(this.querySelectorAll('.chip'), function (c) {
      c.classList.toggle('active', c === b);
    });
    renderList();
  });

  $('searchInput').addEventListener('input', function () {
    keyword = this.value;
    renderList();
  });

  stdinEl.addEventListener('input', function () {
    rec(currentQ()).stdin = stdinEl.value;
    saveState();
  });

  doneChk.addEventListener('change', function () {
    rec(currentQ()).done = doneChk.checked;
    saveState(true);
    renderList();
  });

  runBtn.addEventListener('click', doRun);
  verifyBtn.addEventListener('click', function () { doRun(true); });

  $('refBtn').addEventListener('click', function () {
    refBox.hidden = !refBox.hidden;
    if (!refBox.hidden && refBox.scrollIntoView) refBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  $('loadRefBtn').addEventListener('click', function () {
    var q = currentQ();
    if (!q.refCode) { toast('本题没有参考答案'); return; }
    editor.set(q.refCode);
    rec(q).code = q.refCode;
    saveState(true);
    toast('参考答案已载入编辑器');
  });

  $('copyBtn').addEventListener('click', function () {
    var code = editor.get();
    var done = function () { toast('代码已复制'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(done, function () { toast('复制失败，请手动选择'); });
    } else {
      var ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { toast('复制失败'); }
      document.body.removeChild(ta);
    }
  });

  $('resetBtn').addEventListener('click', function () {
    if (!confirm('确定要把本题代码重置为初始模板吗？')) return;
    editor.set(STARTER);
    rec(currentQ()).code = STARTER;
    saveState(true);
    toast('已重置为初始模板');
  });

  $('clearOutBtn').addEventListener('click', function () {
    consoleEl.hidden = true;
    var r = rec(currentQ());
    delete r.out; delete r.errOut; delete r.compileOut; delete r.verdictText; delete r.verdictClass; delete r.metrics;
    saveState();
  });

  $('resetAllBtn').addEventListener('click', function () {
    if (!confirm('会清空所有题目的代码、输入和完成标记，确定吗？')) return;
    state.progress = {};
    saveState(true);
    renderList();
    renderQuestion();
    toast('已清空全部进度');
  });

  $('themeBtn').addEventListener('click', function () {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    saveState(true);
  });

  $('menuBtn').addEventListener('click', openSidebar);
  scrim.addEventListener('click', closeSidebar);

  lightbox.addEventListener('click', function () {
    lightbox.hidden = true;
    lightboxImg.src = '';
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      lightbox.hidden = true;
      closeSidebar();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); doRun(); }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      select(state.idx + (e.key === 'ArrowDown' ? 1 : -1));
    }
  });

  window.addEventListener('resize', function () { editor.refresh(); });

  /* ---------- 启动 ---------- */
  loadState();
  applyTheme();
  if (window.CodeMirror && !window.CodeMirror.fromTextArea) { /* 极端情况：脚本未加载完全 */ }
  renderList();
  renderQuestion();
  if (!QUESTIONS.length) {
    stemEl.innerHTML = '<p>没有读取到题目数据，请确认 assets/questions.js 是否正常加载。</p>';
  }
})();
