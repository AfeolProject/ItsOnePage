const form = document.querySelector('#builderForm');
const previewFrame = document.querySelector('#previewFrame');

const resetButton = document.querySelector('#resetButton');
const exportHtmlButton = document.querySelector(
  '#exportHtmlButton',
);
const exportCssButton = document.querySelector(
  '#exportCssButton',
);

const runtimeNotice = document.querySelector(
  '#runtimeNotice',
);
const metadataControls = document.querySelector(
  '#metadataControls',
);
const backgroundColorControls = document.querySelector(
  '#backgroundColorControls',
);
const gradientControls = document.querySelector(
  '#gradientControls',
);
const backgroundImageControls = document.querySelector(
  '#backgroundImageControls',
);
const panelControls = document.querySelector(
  '#panelControls',
);
const primaryButtonControls = document.querySelector(
  '#primaryButtonControls',
);
const secondaryButtonControls = document.querySelector(
  '#secondaryButtonControls',
);

const imageData = {
  desktop: '',
  tablet: '',
  mobile: '',
};

function value(id) {
  return document.querySelector(`#${id}`).value;
}

function checkedValue(name) {
  return document.querySelector(
    `input[name="${name}"]:checked`,
  ).value;
}

function escapeHtml(input) {
  return String(input)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function clampNumber(input, minimum, maximum) {
  const parsed = Number(input);

  if (!Number.isFinite(parsed)) {
    return minimum;
  }

  return Math.min(
    maximum,
    Math.max(minimum, parsed),
  );
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => resolve(String(reader.result)),
    );

    reader.addEventListener(
      'error',
      () => reject(reader.error),
    );

    reader.readAsDataURL(file);
  });
}

function createBackgroundPosition() {
  const base = value('backgroundPosition');

  const horizontal = clampNumber(
    value('horizontalOffset'),
    -100,
    100,
  );

  const vertical = clampNumber(
    value('verticalOffset'),
    -100,
    100,
  );

  const horizontalUnit = checkedValue(
    'horizontalUnit',
  );

  const verticalUnit = checkedValue(
    'verticalUnit',
  );

  return `${base} ${horizontal >= 0 ? '+' : '-'} ${Math.abs(
    horizontal,
  )}${horizontalUnit} ${vertical >= 0 ? '+' : '-'} ${Math.abs(
    vertical,
  )}${verticalUnit}`;
}

function createBackgroundCss() {
  const state = value('backgroundState');

  if (state === 'none') {
    return 'background: #07111c;';
  }

  if (state === 'color') {
    return `background: ${value('backgroundColor')};`;
  }

  if (state === 'gradient') {
    const type = value('gradientType');
    const start = value('gradientStart');
    const end = value('gradientEnd');
    const angle = clampNumber(
      value('gradientAngle'),
      0,
      360,
    );

    if (type === 'radial') {
      return `background: radial-gradient(circle, ${start}, ${end});`;
    }

    return `background: linear-gradient(${angle}deg, ${start}, ${end});`;
  }

  const desktop = imageData.desktop;
  const overlay = clampNumber(
    value('overlay'),
    0,
    100,
  ) / 100;

  const fallback = '#07111c';

  if (!desktop) {
    return `background: ${fallback};`;
  }

  return `
    background:
      linear-gradient(
        rgb(7 17 28 / ${overlay}),
        rgb(7 17 28 / ${overlay})
      ),
      url("${desktop}")
      center / cover
      fixed
      no-repeat;
  `;
}

function createResponsiveBackgroundCss() {
  if (value('backgroundState') !== 'image') {
    return '';
  }

  const overlay = clampNumber(
    value('overlay'),
    0,
    100,
  ) / 100;

  const tablet = imageData.tablet;
  const mobile = imageData.mobile;

  return `
    ${
      tablet
        ? `
          @media (max-width: 1024px) {
            body {
              background:
                linear-gradient(
                  rgb(7 17 28 / ${overlay}),
                  rgb(7 17 28 / ${overlay})
                ),
                url("${tablet}")
                center / cover
                fixed
                no-repeat;
            }
          }
        `
        : ''
    }

    ${
      mobile
        ? `
          @media (max-width: 640px) {
            body {
              background:
                linear-gradient(
                  rgb(7 17 28 / ${overlay}),
                  rgb(7 17 28 / ${overlay})
                ),
                url("${mobile}")
                center / cover
                fixed
                no-repeat;
            }
          }
        `
        : ''
    }
  `;
}

function createPanelCss() {
  const state = value('panelState');

  if (state === 'none') {
    return `
      border: 0;
      background: transparent;
      box-shadow: none;
      backdrop-filter: none;
    `;
  }

  const opacity = clampNumber(
    value('panelOpacity'),
    0,
    100,
  ) / 100;

  const blur = clampNumber(
    value('panelBlur'),
    0,
    40,
  );

  if (state === 'solid') {
    return `
      border: 1px solid rgb(255 255 255 / 14%);
      background: rgb(7 17 28 / ${opacity});
      box-shadow: 0 24px 70px rgb(0 0 0 / 32%);
    `;
  }

  return `
    border: 1px solid rgb(255 255 255 / 16%);
    background: rgb(7 17 28 / ${opacity});
    box-shadow: 0 24px 70px rgb(0 0 0 / 32%);
    backdrop-filter: blur(${blur}px);
    -webkit-backdrop-filter: blur(${blur}px);
  `;
}

function createButtonsHtml() {
  const state = value('buttonsState');

  if (state === 'none') {
    return '';
  }

  const primary = `
    <a
      class="button button-primary"
      href="${escapeHtml(value('primaryUrl'))}"
    >
      ${escapeHtml(value('primaryLabel'))}
    </a>
  `;

  if (state === 'one') {
    return `<nav class="actions">${primary}</nav>`;
  }

  const secondary = `
    <a
      class="button"
      href="${escapeHtml(value('secondaryUrl'))}"
    >
      ${escapeHtml(value('secondaryLabel'))}
    </a>
  `;

  return `
    <nav class="actions">
      ${primary}
      ${secondary}
    </nav>
  `;
}

function createMetadataHtml() {
  const enabled = checkedValue('metadata') === 'yes';

  if (!enabled) {
    return '';
  }

  return `
    <meta
      name="description"
      content="${escapeHtml(value('siteDescription'))}"
    >

    ${
      value('siteAuthor')
        ? `
          <meta
            name="author"
            content="${escapeHtml(value('siteAuthor'))}"
          >
        `
        : ''
    }
  `;
}

function createWebsiteCss() {
  const textColor = value('textColor');
  const accentColor = value('accentColor');
  const alignment = value('textAlignment');
  const panelAlignment = value('panelAlignment');

  return `
    :root {
      color-scheme: dark;
      font-family:
        ui-sans-serif,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
      color: ${textColor};
    }

    * {
      box-sizing: border-box;
    }

    html,
    body {
      min-height: 100%;
    }

    body {
      min-height: 100vh;
      margin: 0;
      ${createBackgroundCss()}
      color: ${textColor};
    }

    .page {
      display: flex;
      width: min(1240px, calc(100% - 32px));
      min-height: 100vh;
      margin: 0 auto;
      align-items: center;
      justify-content: ${panelAlignment};
      padding: 32px 0;
    }

    main {
      width: min(680px, 100%);
      padding: clamp(28px, 5vw, 56px);
      border-radius: 22px;
      text-align: ${alignment};
      ${createPanelCss()}
    }

    .eyebrow {
      margin: 0 0 14px;
      color: ${accentColor};
      font-size: 0.76rem;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0 0 18px;
      font-size: clamp(3rem, 9vw, 7rem);
      line-height: 0.92;
      letter-spacing: -0.055em;
    }

    .lead {
      margin: 0 0 24px;
      font-size: clamp(1.25rem, 3vw, 2rem);
      line-height: 1.3;
    }

    .body-copy {
      margin: 0;
      line-height: 1.7;
      opacity: 0.84;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: ${
        alignment === 'center'
          ? 'center'
          : alignment === 'right'
            ? 'flex-end'
            : 'flex-start'
      };
      gap: 10px;
      margin-top: 28px;
    }

    .button {
      display: inline-flex;
      min-height: 42px;
      align-items: center;
      justify-content: center;
      padding: 0 17px;
      border: 1px solid rgb(255 255 255 / 22%);
      border-radius: 999px;
      color: inherit;
      font-weight: 700;
      text-decoration: none;
    }

    .button-primary {
      border-color: ${accentColor};
      background: ${accentColor};
      color: #07111c;
    }

    ${createResponsiveBackgroundCss()}

    @media (max-width: 640px) {
      .page {
        width: calc(100% - 20px);
        align-items: flex-end;
        padding: 10px 0;
      }

      main {
        padding: 28px 22px;
      }

      .actions {
        display: grid;
      }

      .button {
        width: 100%;
      }
    }
  `;
}

function createWebsiteHtml() {
  const language =
    checkedValue('metadata') === 'yes'
      ? escapeHtml(value('siteLanguage') || 'en')
      : 'en';

  const css = createWebsiteCss();

  const cssMode = checkedValue('cssMode');

  const stylesheet =
    cssMode === 'separate'
      ? '<link rel="stylesheet" href="./styles.css">'
      : `<style>${css}</style>`;

  return `<!doctype html>
<html lang="${language}">
  <head>
    <meta charset="utf-8">

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1"
    >

    <title>${escapeHtml(value('siteName'))}</title>

    ${createMetadataHtml()}

    ${stylesheet}
  </head>

  <body>
    <div class="page">
      <main>
        <p class="eyebrow">
          ${escapeHtml(value('siteName'))}
        </p>

        <h1>${escapeHtml(value('heading'))}</h1>

        <p class="lead">
          ${escapeHtml(value('subheading'))}
        </p>

        <p class="body-copy">
          ${escapeHtml(value('bodyText'))}
        </p>

        ${createButtonsHtml()}
      </main>
    </div>
  </body>
</html>`;
}

function updateDependencies() {
  const runtime = checkedValue('runtime');
  const websiteType = checkedValue('websiteType');
  const metadata = checkedValue('metadata');

  runtimeNotice.hidden = runtime !== 'tor-i2p';

  const separateCssInput = document.querySelector(
    'input[name="cssMode"][value="separate"]',
  );

  const embeddedCssInput = document.querySelector(
    'input[name="cssMode"][value="embedded"]',
  );

  if (websiteType === 'onepage') {
    embeddedCssInput.checked = true;
    separateCssInput.disabled = true;
  } else {
    separateCssInput.disabled = false;
  }

  exportCssButton.disabled =
    websiteType === 'onepage' ||
    checkedValue('cssMode') !== 'separate';

  metadataControls.hidden = metadata !== 'yes';

  const backgroundState = value('backgroundState');

  backgroundColorControls.hidden =
    backgroundState !== 'color';

  gradientControls.hidden =
    backgroundState !== 'gradient';

  backgroundImageControls.hidden =
    backgroundState !== 'image';

  const panelState = value('panelState');
  panelControls.hidden = panelState === 'none';

  const buttonsState = value('buttonsState');

  primaryButtonControls.hidden =
    buttonsState === 'none';

  secondaryButtonControls.hidden =
    buttonsState !== 'two';
}

function updatePreview() {
  updateDependencies();
  previewFrame.srcdoc = createWebsiteHtml();
}

function downloadFile(
  filename,
  content,
  mimeType,
) {
  const blob = new Blob(
    [content],
    {
      type: mimeType,
    },
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;

  document.body.append(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

async function handleImageInput(
  input,
  target,
) {
  const [file] = input.files;

  imageData[target] = file
    ? await readFileAsDataUrl(file)
    : '';

  updatePreview();
}

form.addEventListener(
  'input',
  updatePreview,
);

form.addEventListener(
  'change',
  updatePreview,
);

document
  .querySelector('#desktopImage')
  .addEventListener(
    'change',
    (event) => {
      handleImageInput(
        event.currentTarget,
        'desktop',
      );
    },
  );

document
  .querySelector('#tabletImage')
  .addEventListener(
    'change',
    (event) => {
      handleImageInput(
        event.currentTarget,
        'tablet',
      );
    },
  );

document
  .querySelector('#mobileImage')
  .addEventListener(
    'change',
    (event) => {
      handleImageInput(
        event.currentTarget,
        'mobile',
      );
    },
  );

document
  .querySelectorAll('[data-preview-width]')
  .forEach(
    (button) => {
      button.addEventListener(
        'click',
        () => {
          document
            .querySelectorAll(
              '[data-preview-width]',
            )
            .forEach(
              (candidate) => {
                candidate.classList.toggle(
                  'is-active',
                  candidate === button,
                );
              },
            );

          previewFrame.style.width =
            button.dataset.previewWidth;
        },
      );
    },
  );

resetButton.addEventListener(
  'click',
  () => {
    form.reset();

    imageData.desktop = '';
    imageData.tablet = '';
    imageData.mobile = '';

    updatePreview();
  },
);

exportHtmlButton.addEventListener(
  'click',
  () => {
    downloadFile(
      'index.html',
      createWebsiteHtml(),
      'text/html;charset=utf-8',
    );
  },
);

exportCssButton.addEventListener(
  'click',
  () => {
    if (
      checkedValue('websiteType') !== 'multipage' ||
      checkedValue('cssMode') !== 'separate'
    ) {
      return;
    }

    downloadFile(
      'styles.css',
      createWebsiteCss(),
      'text/css;charset=utf-8',
    );
  },
);

updatePreview();
