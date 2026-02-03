(function () {
  if (!window.CMS || !window.React) return;
  const h = window.React.createElement;

  const wrap = (title, body, meta) =>
    h('div', { style: { padding: '18px', fontFamily: 'sans-serif' } },
      h('h2', { style: { margin: '0 0 8px' } }, title || 'Untitled'),
      meta ? h('div', { style: { color: '#666', fontSize: '12px', marginBottom: '10px' } }, meta) : null,
      body
    );

  const makePreview = (label) => ({ entry, widgetFor }) => {
    const title = entry.getIn(['data', 'title']) || entry.getIn(['data', 'name']);
    const summary = entry.getIn(['data', 'summary']);
    const body = widgetFor ? widgetFor('body') : null;
    return wrap(title, h('div', {}, summary ? h('p', {}, summary) : null, body), label);
  };

  const register = (name, label) => window.CMS.registerPreviewTemplate(name, makePreview(label));

  register('news_ja', 'News (JA)');
  register('news_en', 'News (EN)');
  register('projects_ja', 'Projects (JA)');
  register('projects_en', 'Projects (EN)');
  register('members_ja', 'Members (JA)');
  register('members_en', 'Members (EN)');
  register('pages_ja', 'Pages (JA)');
  register('pages_en', 'Pages (EN)');
  register('teaching_ja', 'Teaching (JA)');
  register('teaching_en', 'Teaching (EN)');
})();