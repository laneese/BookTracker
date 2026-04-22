/* ─────────────────────────────────────────
   Ever After Reading Journal — script.js
───────────────────────────────────────── */

const STORAGE_KEY = 'everAfterReadingJournal_v1';
const RING_C = 2 * Math.PI * 85;

const SPINE_COLORS = [
  '#8b3a3a','#2a5f6b','#4a6b2a','#6b4a2a','#3a2a6b',
  '#6b2a5a','#2a4a6b','#6b5a2a','#3a6b4a','#5a3a6b',
  '#6b3a2a','#2a6b5a','#7a3a50','#3a5a7a','#5a7a3a'
];

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const GENRE_COLORS = {
  Fantasy: '#9b70c0', Fiction: '#4a9eb5', 'Non-Fiction': '#c0a050',
  Romance: '#c07090', Mystery: '#7070c0', Thriller: '#c07070',
  Historical: '#b08840', SciFi: '#50b4c8', Biography: '#70b470', Other: '#909090'
};

const FORMAT_COLORS = { Physical: '#c8832a', eBook: '#2a6b72', Audiobook: '#6b4a9b' };

// ── Mock Data ──
function mockState() {
  return {
    reader: { name: 'Sarah', goal: 52, year: 2026 },
    books: [
      { id: 1, title: 'The Name of the Wind', author: 'Patrick Rothfuss', genre: 'Fantasy', status: 'Read', pages: 662, currentPage: 662, date: '2026-01-14', format: 'Physical', rating: 5, review: 'One of the most beautifully written fantasy novels I have ever read.', quote: 'There are three things all wise men fear: the sea in storm, a night with no moon, and the anger of a gentle man.' },
      { id: 2, title: 'Educated', author: 'Tara Westover', genre: 'Biography', status: 'Read', pages: 334, currentPage: 334, date: '2026-01-28', format: 'Audiobook', rating: 5, review: 'Devastating and triumphant. Could not stop listening.', quote: '' },
      { id: 3, title: 'Project Hail Mary', author: 'Andy Weir', genre: 'SciFi', status: 'Read', pages: 476, currentPage: 476, date: '2026-02-10', format: 'Physical', rating: 5, review: 'The most fun I have had reading in years. Ryland Grace is unforgettable.', quote: '' },
      { id: 4, title: 'The Midnight Library', author: 'Matt Haig', genre: 'Fiction', status: 'Read', pages: 288, currentPage: 288, date: '2026-02-22', format: 'eBook', rating: 4, review: 'Quietly profound. Made me think about my own choices differently.', quote: 'You don\'t have to understand life. You just have to live it.' },
      { id: 5, title: 'Gone Girl', author: 'Gillian Flynn', genre: 'Thriller', status: 'Read', pages: 422, currentPage: 422, date: '2026-03-05', format: 'Physical', rating: 4, review: 'Twisted and gripping from page one. Finished it in two days.', quote: '' },
      { id: 6, title: 'A Court of Thorns and Roses', author: 'Sarah J. Maas', genre: 'Fantasy', status: 'Read', pages: 419, currentPage: 419, date: '2026-03-18', format: 'Physical', rating: 4, review: 'Completely addictive. Started the next one immediately.', quote: '' },
      { id: 7, title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'Non-Fiction', status: 'Read', pages: 443, currentPage: 443, date: '2026-03-30', format: 'eBook', rating: 4, review: 'Changed how I see everything. Dense but worth every page.', quote: '' },
      { id: 8, title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', genre: 'Fiction', status: 'Read', pages: 400, currentPage: 400, date: '2026-04-08', format: 'Physical', rating: 5, review: 'An absolutely stunning book. Cried at the end.', quote: 'Be the leading lady of your own life.' },
      { id: 9, title: 'In the Woods', author: 'Tana French', genre: 'Mystery', status: 'Read', pages: 429, currentPage: 429, date: '2026-04-18', format: 'Physical', rating: 4, review: 'Atmospheric and haunting. The Dublin Murder Squad series is exceptional.', quote: '' },
      { id: 10, title: 'Demon Copperhead', author: 'Barbara Kingsolver', genre: 'Fiction', status: 'Reading', pages: 548, currentPage: 210, date: '', format: 'Physical', rating: 0, review: '', quote: '' },
      { id: 11, title: 'Fourth Wing', author: 'Rebecca Yarros', genre: 'Fantasy', status: 'Reading', pages: 517, currentPage: 89, date: '', format: 'eBook', rating: 0, review: '', quote: '' },
    ],
    tbr: [
      { id: 101, title: 'All the Light We Cannot See', author: 'Anthony Doerr', genre: 'Historical', priority: 'High', source: 'Friend', why: 'Everyone I trust says it is perfect' },
      { id: 102, title: 'The Long Walk', author: 'Stephen King', genre: 'Thriller', priority: 'High', source: 'Goodreads', why: 'Heard it is his most disturbing and brilliant work' },
      { id: 103, title: 'Piranesi', author: 'Susanna Clarke', genre: 'Fantasy', priority: 'High', source: 'BookTok', why: 'Unlike anything anyone has described to me' },
      { id: 104, title: 'Atomic Habits', author: 'James Clear', genre: 'Non-Fiction', priority: 'Medium', source: 'Friend', why: 'Building better systems this year' },
      { id: 105, title: 'The Goldfinch', author: 'Donna Tartt', genre: 'Fiction', priority: 'Medium', source: 'Review', why: 'Pulitzer winner, always meant to read it' },
      { id: 106, title: 'Mexican Gothic', author: 'Silvia Moreno-Garcia', genre: 'Mystery', priority: 'Medium', source: 'BookTok', why: 'Gothic horror with a female lead' },
      { id: 107, title: 'The Hitchhiker\'s Guide to the Galaxy', author: 'Douglas Adams', genre: 'SciFi', priority: 'Low', source: 'Friend', why: 'Classic I have never gotten around to' },
    ],
    quotes: [
      { id: 201, text: 'There are three things all wise men fear: the sea in storm, a night with no moon, and the anger of a gentle man.', book: 'The Name of the Wind', author: 'Patrick Rothfuss', page: '394', note: 'This stopped me cold. Read it three times.' },
      { id: 202, text: 'You don\'t have to understand life. You just have to live it.', book: 'The Midnight Library', author: 'Matt Haig', page: '158', note: 'Needed this one.' },
      { id: 203, text: 'Be the leading lady of your own life.', book: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', page: '322', note: 'My new mantra.' },
      { id: 204, text: 'The universe is under no obligation to make sense to you.', book: 'Astrophysics for People in a Hurry', author: 'Neil deGrasse Tyson', page: '12', note: 'Humbling in the best way.' },
    ],
    series: [
      { id: 301, name: 'The Kingkiller Chronicle', author: 'Patrick Rothfuss', genre: 'Fantasy', total: 3, read: [1], notes: 'Waiting desperately for book 3.' },
      { id: 302, name: 'A Court of Thorns and Roses', author: 'Sarah J. Maas', genre: 'Fantasy', total: 5, read: [1, 2], notes: 'ACOTAR universe — reading in order.' },
      { id: 303, name: 'Dublin Murder Squad', author: 'Tana French', genre: 'Mystery', total: 6, read: [1], notes: 'Each book follows a different detective.' },
    ],
    bookRating: 0
  };
}

// ── Default state ──
function defaultState() {
  return {
    reader: { name: '', goal: 0, year: new Date().getFullYear() },
    books: [],
    tbr: [],
    quotes: [],
    series: [],
    bookRating: 0
  };
}

let state = defaultState();

// ── Storage ──
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Only use stored state if it has actual books (not a fresh install)
      if (parsed.books && parsed.books.length > 0) {
        state = Object.assign(defaultState(), parsed);
        return;
      }
    }
    // Load mock data for fresh installs
    state = mockState();
    saveState();
  } catch(e) {
    state = mockState();
  }
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch(e) { console.warn('Save error:', e); }
}

// ── Toast ──
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window._toastT);
  window._toastT = setTimeout(() => t.classList.remove('show'), 2000);
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initTabs();
  initStarRating();
  restoreInputs();
  renderAll();
});

function renderAll() {
  updateDashboard();
  renderLibrary();
  renderTBR();
  renderStats();
  renderQuotes();
  renderSeriesList();
}

// ── Tabs ──
function initTabs() {
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
      renderAll();
    });
  });
}

// ── Restore inputs ──
function restoreInputs() {
  const nameEl = document.getElementById('readerName');
  const goalEl = document.getElementById('readingGoal');
  if (nameEl && state.reader.name) nameEl.value = state.reader.name;
  if (goalEl && state.reader.goal) goalEl.value = state.reader.goal;
  document.getElementById('goalYear').textContent = state.reader.year;

  nameEl.addEventListener('input', () => {
    state.reader.name = nameEl.value;
    saveState();
    updateDashboard();
  });
  goalEl.addEventListener('input', () => {
    state.reader.goal = parseInt(goalEl.value) || 0;
    saveState();
    updateDashboard();
  });
}

// ── Star rating ──
function initStarRating() {
  const wrap = document.getElementById('bookStarRating');
  if (!wrap) return;
  wrap.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', () => {
      state.bookRating = parseInt(star.dataset.val);
      updateStars();
    });
    star.addEventListener('mouseover', () => {
      wrap.querySelectorAll('.star').forEach(s => {
        s.classList.toggle('lit', parseInt(s.dataset.val) <= parseInt(star.dataset.val));
      });
    });
    star.addEventListener('mouseout', updateStars);
  });
}

function updateStars() {
  document.querySelectorAll('#bookStarRating .star').forEach(s => {
    s.classList.toggle('lit', parseInt(s.dataset.val) <= state.bookRating);
  });
}

function formatStars(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

// ── Dashboard ──
function updateDashboard() {
  const thisYear = new Date().getFullYear();
  const booksThisYear = state.books.filter(b => {
    if (!b.date) return false;
    return new Date(b.date).getFullYear() === thisYear && b.status === 'Read';
  });

  const goal = state.reader.goal || 0;
  const readCount = booksThisYear.length;
  const goalPct = goal ? Math.min(readCount / goal, 1) : 0;

  document.getElementById('goalFill').style.strokeDashoffset = RING_C * (1 - goalPct);
  document.getElementById('goalPct').textContent = goal ? Math.round(goalPct * 100) + '%' : '—';
  document.getElementById('goalCount').textContent = goal ? `${readCount} of ${goal}` : 'Set a goal above';

  const allRead = state.books.filter(b => b.status === 'Read').length;
  const readPct = Math.min(allRead / Math.max(allRead, 50), 1);
  document.getElementById('readFill').style.strokeDashoffset = RING_C * (1 - readPct);
  document.getElementById('booksReadNum').textContent = allRead;

  const tbrCount = state.tbr.length;
  const tbrPct = Math.min(tbrCount / Math.max(tbrCount, 30), 1);
  document.getElementById('tbrFill').style.strokeDashoffset = RING_C * (1 - tbrPct);
  document.getElementById('tbrNum').textContent = tbrCount;

  const totalPages = state.books.filter(b => b.status === 'Read').reduce((s,b) => s + (b.pages || 0), 0);
  const ratings = state.books.filter(b => b.rating > 0).map(b => b.rating);
  const avgRating = ratings.length ? (ratings.reduce((a,b) => a+b, 0) / ratings.length).toFixed(1) : '—';
  const genres = new Set(state.books.filter(b => b.status === 'Read').map(b => b.genre));

  document.getElementById('statPages').textContent = totalPages.toLocaleString();
  document.getElementById('statAvgRating').textContent = avgRating === '—' ? '—' : avgRating + '★';
  document.getElementById('statGenres').textContent = genres.size;
  document.getElementById('statSeries').textContent = state.series.length;

  renderCurrentlyReading();
  renderShelf();
}

function renderCurrentlyReading() {
  const wrap = document.getElementById('currentlyReadingList');
  const reading = state.books.filter(b => b.status === 'Reading');
  if (reading.length === 0) {
    wrap.innerHTML = '<p class="empty-msg">📖 No books in progress. Add one in My Library!</p>';
    return;
  }
  wrap.innerHTML = reading.map((b, i) => {
    const color = SPINE_COLORS[i % SPINE_COLORS.length];
    const pct = b.pages ? Math.min(Math.round(((b.currentPage||0) / b.pages) * 100), 100) : 0;
    return `
      <div class="current-book-card">
        <div class="book-spine-mini" style="background:${color}"></div>
        <div class="current-book-info">
          <div class="current-book-title">${b.title}</div>
          <div class="current-book-author">${b.author}</div>
          <div class="current-book-progress">${b.pages ? `Page ${b.currentPage||0} of ${b.pages}` : 'Pages not set'}</div>
          <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
          <div style="font-size:11px;color:var(--text-dim);margin-top:4px">${pct}% complete</div>
        </div>
      </div>`;
  }).join('');
}

function renderShelf() {
  const shelf = document.getElementById('shelfDisplay');
  const recentRead = state.books.filter(b => b.status === 'Read').slice(-20);
  if (recentRead.length === 0) {
    shelf.innerHTML = '<span class="shelf-empty">Your shelf is empty — start logging books!</span>';
    return;
  }
  shelf.innerHTML = recentRead.map((b, i) => {
    const color = SPINE_COLORS[i % SPINE_COLORS.length];
    const height = 120 + Math.floor(Math.random() * 50);
    return `
      <div class="book-spine" style="background:${color};height:${height}px" title="${b.title} by ${b.author}">
        <span class="spine-text">${b.title}</span>
      </div>`;
  }).join('');
}

// ── Library ──
function addBook() {
  const title = document.getElementById('bookTitle').value.trim();
  const author = document.getElementById('bookAuthor').value.trim();
  if (!title) { alert('Please enter a book title.'); return; }

  state.books.push({
    id: Date.now(),
    title,
    author,
    genre: document.getElementById('bookGenre').value,
    status: document.getElementById('bookStatus').value,
    pages: parseInt(document.getElementById('bookPages').value) || 0,
    currentPage: 0,
    date: document.getElementById('bookDate').value,
    format: document.getElementById('bookFormat').value,
    rating: state.bookRating,
    review: document.getElementById('bookReview').value.trim(),
    quote: document.getElementById('bookQuote').value.trim()
  });

  const quoteText = document.getElementById('bookQuote').value.trim();
  if (quoteText) {
    state.quotes.push({
      id: Date.now() + 1,
      text: quoteText,
      book: title,
      author,
      page: '',
      note: ''
    });
  }

  ['bookTitle','bookAuthor','bookPages','bookReview','bookQuote'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('bookDate').value = '';
  state.bookRating = 0;
  updateStars();

  saveState();
  renderAll();
  toast('Book added to your library ✦');
}

function deleteBook(id) {
  state.books = state.books.filter(b => b.id !== id);
  saveState();
  renderAll();
}

function renderLibrary() {
  const search = (document.getElementById('librarySearch')?.value || '').toLowerCase();
  const genre = document.getElementById('libraryGenreFilter')?.value || 'All';
  const status = document.getElementById('libraryStatusFilter')?.value || 'All';
  const sort = document.getElementById('librarySortFilter')?.value || 'recent';

  let books = state.books.filter(b =>
    (genre === 'All' || b.genre === genre) &&
    (status === 'All' || b.status === status) &&
    (b.title.toLowerCase().includes(search) || (b.author||'').toLowerCase().includes(search))
  );

  if (sort === 'rating') books.sort((a,b) => b.rating - a.rating);
  else if (sort === 'title') books.sort((a,b) => a.title.localeCompare(b.title));
  else if (sort === 'pages') books.sort((a,b) => b.pages - a.pages);
  else books.sort((a,b) => b.id - a.id);

  const tbody = document.getElementById('libraryBody');
  if (!tbody) return;

  if (books.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="8">${state.books.length === 0 ? 'No books yet. Log your first book above! 📚' : 'No matches found.'}</td></tr>`;
    return;
  }

  tbody.innerHTML = books.map(b => `
    <tr>
      <td>
        <strong style="color:var(--cream);font-family:'Playfair Display',serif">${b.title}</strong>
        <br><small style="color:var(--text-dim)">${b.author || '—'}</small>
        ${b.review ? `<br><small style="color:var(--text-dim);font-style:italic">"${b.review.slice(0,60)}${b.review.length>60?'...':''}"</small>` : ''}
      </td>
      <td><span class="genre-badge ${b.genre}">${b.genre}</span></td>
      <td style="color:var(--text-mid)">${b.pages ? b.pages.toLocaleString() : '—'}</td>
      <td style="color:var(--amber)">${b.rating ? '★'.repeat(b.rating) : '—'}</td>
      <td style="color:var(--text-mid);font-size:12px">${b.format || '—'}</td>
      <td style="color:var(--text-dim);font-size:12px">${b.date ? new Date(b.date+'T12:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) : '—'}</td>
      <td><span style="font-size:12px;color:${b.status==='Read'?'var(--teal-light)':b.status==='Reading'?'var(--amber-light)':'var(--text-dim)'}">${b.status}</span></td>
      <td><button class="btn-danger" onclick="deleteBook(${b.id})">✕</button></td>
    </tr>`).join('');
}

// ── TBR ──
function addTBR() {
  const title = document.getElementById('tbrTitle').value.trim();
  if (!title) { alert('Please enter a book title.'); return; }

  state.tbr.push({
    id: Date.now(),
    title,
    author: document.getElementById('tbrAuthor').value.trim(),
    genre: document.getElementById('tbrGenre').value,
    priority: document.getElementById('tbrPriority').value,
    source: document.getElementById('tbrSource').value,
    why: document.getElementById('tbrWhy').value.trim()
  });

  ['tbrTitle','tbrAuthor','tbrWhy'].forEach(id => document.getElementById(id).value = '');
  saveState();
  renderAll();
  toast('Added to TBR ✦');
}

function deleteTBR(id) {
  state.tbr = state.tbr.filter(t => t.id !== id);
  saveState();
  renderAll();
}

function moveTBRToReading(id) {
  const item = state.tbr.find(t => t.id === id);
  if (!item) return;
  state.books.push({
    id: Date.now(),
    title: item.title,
    author: item.author,
    genre: item.genre,
    status: 'Reading',
    pages: 0, currentPage: 0,
    date: '', format: 'Physical',
    rating: 0, review: '', quote: ''
  });
  state.tbr = state.tbr.filter(t => t.id !== id);
  saveState();
  renderAll();
  toast('Moved to Currently Reading ✦');
}

function renderTBR() {
  const search = (document.getElementById('tbrSearch')?.value || '').toLowerCase();
  const priority = document.getElementById('tbrPriorityFilter')?.value || 'All';

  const priorityOrder = { High: 0, Medium: 1, Low: 2 };
  let items = state.tbr.filter(t =>
    (priority === 'All' || t.priority === priority) &&
    (t.title.toLowerCase().includes(search) || (t.author||'').toLowerCase().includes(search))
  ).sort((a,b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  const wrap = document.getElementById('tbrList');
  if (!wrap) return;

  if (items.length === 0) {
    wrap.innerHTML = '<p class="empty-msg">📚 Your TBR is empty. Add some books above!</p>';
    return;
  }

  const priorityEmoji = { High: '🔥', Medium: '📌', Low: '💤' };

  wrap.innerHTML = items.map((t, i) => `
    <div class="tbr-card">
      <div class="tbr-priority">${i+1}</div>
      <div class="tbr-info">
        <div class="tbr-title">${t.title}</div>
        <div class="tbr-author">${t.author || 'Author unknown'} · <span class="genre-badge ${t.genre}" style="font-size:10px">${t.genre}</span></div>
        <div class="tbr-source">${priorityEmoji[t.priority]} ${t.priority} Priority · Found via ${t.source}${t.why ? ' · "' + t.why + '"' : ''}</div>
      </div>
      <button class="btn-secondary" onclick="moveTBRToReading(${t.id})" style="font-size:11px;padding:7px 12px">Start Reading</button>
      <button class="btn-danger" onclick="deleteTBR(${t.id})">✕</button>
    </div>`).join('');
}

// ── Stats ──
function renderStats() {
  const readBooks = state.books.filter(b => b.status === 'Read');
  const total = readBooks.length;
  const totalPages = readBooks.reduce((s,b) => s + (b.pages||0), 0);
  const ratings = readBooks.filter(b => b.rating > 0).map(b => b.rating);
  const avgRating = ratings.length ? (ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(1) : '—';

  const genreCounts = {};
  readBooks.forEach(b => { genreCounts[b.genre] = (genreCounts[b.genre]||0) + 1; });
  const topGenre = Object.entries(genreCounts).sort((a,b)=>b[1]-a[1])[0];

  const longest = readBooks.length ? Math.max(...readBooks.map(b=>b.pages||0)) : 0;
  const avgPages = total ? Math.round(totalPages/total) : 0;

  document.getElementById('statsTotal').textContent = total;
  document.getElementById('statsTotalPages').textContent = totalPages.toLocaleString();
  document.getElementById('statsAvgRating').textContent = avgRating === '—' ? '—' : avgRating + '★';
  document.getElementById('statsTopGenre').textContent = topGenre ? topGenre[0] : '—';
  document.getElementById('statsLongest').textContent = longest ? longest.toLocaleString() : '—';
  document.getElementById('statsAvgPages').textContent = avgPages ? avgPages.toLocaleString() : '—';

  renderGenreDonut();
  renderMonthlyBar();
  renderFormatDonut();
  renderRatingBar();
}

function renderGenreDonut() {
  const wrap = document.getElementById('genreDonutWrap');
  if (!wrap) return;
  const readBooks = state.books.filter(b => b.status === 'Read');
  const counts = {};
  readBooks.forEach(b => { counts[b.genre] = (counts[b.genre]||0) + 1; });
  const entries = Object.entries(counts).sort((a,b)=>b[1]-a[1]);
  const total = entries.reduce((s,[,v])=>s+v,0);

  if (entries.length === 0) {
    wrap.innerHTML = '<div class="donut-empty-msg"><span class="emoji">📊</span><div class="msg">Log some books to see your genre breakdown</div></div>';
    return;
  }

  wrap.innerHTML = `<div style="position:relative"><canvas id="genreCanvas" width="200" height="200"></canvas></div><div class="donut-legend" id="genreLegend"></div>`;

  const canvas = document.getElementById('genreCanvas');
  const ctx = canvas.getContext('2d');
  let angle = -Math.PI/2;
  entries.forEach(([genre, val]) => {
    const slice = (val/total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(100,100);
    ctx.arc(100,100,80,angle,angle+slice);
    ctx.arc(100,100,45,angle+slice,angle,true);
    ctx.closePath();
    ctx.fillStyle = GENRE_COLORS[genre] || '#909090';
    ctx.fill();
    angle += slice;
  });
  ctx.fillStyle = '#f5edd8';
  ctx.font = 'bold 14px Lato';
  ctx.textAlign = 'center';
  ctx.fillText(total + ' books', 100, 105);

  document.getElementById('genreLegend').innerHTML = entries.map(([g,v]) => `
    <div class="legend-item">
      <div class="legend-dot" style="background:${GENRE_COLORS[g]||'#909090'}"></div>
      <span>${g}: <strong>${v}</strong></span>
    </div>`).join('');
}

function renderFormatDonut() {
  const wrap = document.getElementById('formatDonutWrap');
  if (!wrap) return;
  const readBooks = state.books.filter(b => b.status === 'Read');
  const counts = {};
  readBooks.forEach(b => { counts[b.format||'Physical'] = (counts[b.format||'Physical']||0) + 1; });
  const entries = Object.entries(counts);
  const total = entries.reduce((s,[,v])=>s+v,0);

  if (entries.length === 0) {
    wrap.innerHTML = '<div class="donut-empty-msg"><span class="emoji">📱</span><div class="msg">Log some books to see your format breakdown</div></div>';
    return;
  }

  wrap.innerHTML = `<div style="position:relative"><canvas id="formatCanvas" width="200" height="200"></canvas></div><div class="donut-legend" id="formatLegend"></div>`;

  const canvas = document.getElementById('formatCanvas');
  const ctx = canvas.getContext('2d');
  let angle = -Math.PI/2;
  entries.forEach(([format, val]) => {
    const slice = (val/total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(100,100);
    ctx.arc(100,100,80,angle,angle+slice);
    ctx.arc(100,100,45,angle+slice,angle,true);
    ctx.closePath();
    ctx.fillStyle = FORMAT_COLORS[format] || '#909090';
    ctx.fill();
    angle += slice;
  });
  ctx.fillStyle = '#f5edd8';
  ctx.font = 'bold 13px Lato';
  ctx.textAlign = 'center';
  ctx.fillText(total + ' books', 100, 105);

  document.getElementById('formatLegend').innerHTML = entries.map(([f,v]) => `
    <div class="legend-item">
      <div class="legend-dot" style="background:${FORMAT_COLORS[f]||'#909090'}"></div>
      <span>${f}: <strong>${v}</strong></span>
    </div>`).join('');
}

function renderMonthlyBar() {
  const wrap = document.getElementById('monthlyBarChart');
  if (!wrap) return;
  const year = new Date().getFullYear();
  const monthly = Array(12).fill(0);
  state.books.filter(b => b.status === 'Read' && b.date).forEach(b => {
    const d = new Date(b.date + 'T12:00:00');
    if (d.getFullYear() === year) monthly[d.getMonth()]++;
  });
  const max = Math.max(...monthly, 1);

  if (monthly.every(m => m === 0)) {
    wrap.innerHTML = '<p style="color:var(--text-dim);font-style:italic;text-align:center;padding:20px">Log books with dates to see your monthly reading pace.</p>';
    return;
  }

  wrap.innerHTML = monthly.map((count, i) => `
    <div class="bar-row">
      <span class="bar-cat">${MONTHS[i]}</span>
      <div class="bar-outer"><div class="bar-inner" style="width:${(count/max)*100}%;background:var(--amber)"></div></div>
      <span class="bar-val">${count}</span>
    </div>`).join('');
}

function renderRatingBar() {
  const wrap = document.getElementById('ratingBarChart');
  if (!wrap) return;
  const counts = [0,0,0,0,0];
  state.books.filter(b => b.rating > 0).forEach(b => { counts[b.rating-1]++; });
  const max = Math.max(...counts, 1);

  if (counts.every(c => c === 0)) {
    wrap.innerHTML = '<p style="color:var(--text-dim);font-style:italic;text-align:center;padding:20px">Rate some books to see your rating distribution.</p>';
    return;
  }

  wrap.innerHTML = [5,4,3,2,1].map(r => `
    <div class="bar-row">
      <span class="bar-cat" style="color:var(--amber)">${'★'.repeat(r)}</span>
      <div class="bar-outer"><div class="bar-inner" style="width:${(counts[r-1]/max)*100}%;background:var(--amber)"></div></div>
      <span class="bar-val">${counts[r-1]}</span>
    </div>`).join('');
}

// ── Quotes ──
function addQuote() {
  const text = document.getElementById('quoteText').value.trim();
  if (!text) { alert('Please enter the quote text.'); return; }

  state.quotes.push({
    id: Date.now(),
    text,
    book: document.getElementById('quoteBook').value.trim(),
    author: document.getElementById('quoteAuthor').value.trim(),
    page: document.getElementById('quotePage').value,
    note: document.getElementById('quoteNote').value.trim()
  });

  ['quoteText','quoteBook','quoteAuthor','quotePage','quoteNote'].forEach(id => document.getElementById(id).value = '');
  saveState();
  renderQuotes();
  toast('Quote saved ✦');
}

function deleteQuote(id) {
  state.quotes = state.quotes.filter(q => q.id !== id);
  saveState();
  renderQuotes();
}

function renderQuotes() {
  const search = (document.getElementById('quoteSearch')?.value || '').toLowerCase();
  const wrap = document.getElementById('quotesList');
  if (!wrap) return;

  const filtered = state.quotes.filter(q =>
    q.text.toLowerCase().includes(search) ||
    (q.book||'').toLowerCase().includes(search) ||
    (q.author||'').toLowerCase().includes(search)
  );

  if (filtered.length === 0) {
    wrap.innerHTML = '<p class="empty-msg">✨ No quotes saved yet. Start collecting the lines that move you.</p>';
    return;
  }

  wrap.innerHTML = filtered.map(q => `
    <div class="quote-card">
      <div class="quote-text">${q.text}</div>
      <div class="quote-source">
        ${q.book ? `<strong>${q.book}</strong>` : ''}
        ${q.author ? ` · ${q.author}` : ''}
        ${q.page ? ` · p.${q.page}` : ''}
      </div>
      ${q.note ? `<div style="font-size:12px;color:var(--text-dim);margin-top:8px;font-style:italic">${q.note}</div>` : ''}
      <button class="btn-danger" onclick="deleteQuote(${q.id})" style="margin-top:10px">✕ Remove</button>
    </div>`).join('');
}

// ── Series ──
function addSeries() {
  const name = document.getElementById('seriesName').value.trim();
  if (!name) { alert('Please enter a series name.'); return; }
  const total = parseInt(document.getElementById('seriesTotal').value) || 2;

  state.series.push({
    id: Date.now(),
    name,
    author: document.getElementById('seriesAuthor').value.trim(),
    genre: document.getElementById('seriesGenre').value,
    total,
    read: [],
    notes: document.getElementById('seriesNotes').value.trim()
  });

  ['seriesName','seriesAuthor','seriesTotal','seriesNotes'].forEach(id => document.getElementById(id).value = '');
  saveState();
  renderSeriesList();
  toast('Series added ✦');
}

function toggleSeriesBook(seriesId, bookNum) {
  const s = state.series.find(s => s.id === seriesId);
  if (!s) return;
  const idx = s.read.indexOf(bookNum);
  if (idx >= 0) s.read.splice(idx, 1);
  else s.read.push(bookNum);
  saveState();
  renderSeriesList();
}

function deleteSeries(id) {
  state.series = state.series.filter(s => s.id !== id);
  saveState();
  renderSeriesList();
}

function renderSeriesList() {
  const wrap = document.getElementById('seriesList');
  if (!wrap) return;

  if (state.series.length === 0) {
    wrap.innerHTML = '<p class="empty-msg">📚 No series added yet. Start tracking a series above!</p>';
    return;
  }

  wrap.innerHTML = state.series.map(s => {
    const books = Array.from({length: s.total}, (_, i) => i+1);
    const readPct = Math.round((s.read.length / s.total) * 100);
    return `
      <div class="series-card">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div class="series-name">${s.name}</div>
            <div class="series-author">${s.author || 'Author unknown'} · <span class="genre-badge ${s.genre}" style="font-size:10px">${s.genre}</span> · ${s.read.length}/${s.total} books read (${readPct}%)</div>
          </div>
          <button class="btn-danger" onclick="deleteSeries(${s.id})">✕</button>
        </div>
        <div class="series-books" style="margin-top:12px">
          ${books.map(n => `
            <div class="series-book ${s.read.includes(n)?'read':'unread'}" onclick="toggleSeriesBook(${s.id},${n})">
              Book ${n}${s.read.includes(n)?' ✓':''}
            </div>`).join('')}
        </div>
        ${s.notes ? `<div style="font-size:12px;color:var(--text-dim);margin-top:10px;font-style:italic">${s.notes}</div>` : ''}
      </div>`;
  }).join('');
}

// ── Export / Import ──
function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().slice(0,10);
  a.href = url;
  a.download = `reading-journal-backup-${stamp}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast('Backup downloaded ✦');
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (!confirm('This will replace all your current data. Continue?')) return;
      state = Object.assign(defaultState(), imported);
      saveState();
      restoreInputs();
      renderAll();
      toast('Data restored ✦');
    } catch(err) {
      alert('Could not read that file. Make sure it\'s a backup from this journal.');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}
