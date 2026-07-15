import {
  access,
  mkdir,
  readdir,
  readFile,
  writeFile,
} from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFile = fileURLToPath(import.meta.url);

const projectRoot = path.resolve(
  path.dirname(currentFile),
  '..',
);

const templatesRoot = path.join(
  projectRoot,
  'templates',
);

const outputDirectory = path.join(
  templatesRoot,
  'gallery',
);

const outputFile = path.join(
  outputDirectory,
  'index.html',
);

const supportedCategories = new Set([
  'official',
  'community',
  'marketplace',
  'archive',
]);

const supportedPrices = new Set([
  'free',
  'paid',
]);

async function fileExists(filePath) {
  try {
    await access(
      filePath,
      constants.F_OK,
    );

    return true;
  } catch {
    return false;
  }
}

async function findTemplateManifests(directory) {
  const entries = await readdir(
    directory,
    {
      withFileTypes: true,
    },
  );

  const manifests = [];

  for (const entry of entries) {
    const entryPath = path.join(
      directory,
      entry.name,
    );

    if (entry.isDirectory()) {
      if (
        entryPath === outputDirectory ||
        entry.name === 'implementation'
      ) {
        continue;
      }

      manifests.push(
        ...await findTemplateManifests(
          entryPath,
        ),
      );

      continue;
    }

    if (
      entry.isFile() &&
      entry.name === 'template.json'
    ) {
      manifests.push(entryPath);
    }
  }

  return manifests;
}

function requireString(
  value,
  field,
  manifestPath,
) {
  if (
    typeof value !== 'string' ||
    value.trim() === ''
  ) {
    throw new Error(
      `${manifestPath}: "${field}" must be a non-empty string.`,
    );
  }

  return value.trim();
}

function optionalString(value) {
  return typeof value === 'string'
    ? value.trim()
    : '';
}

function optionalObject(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  )
    ? value
    : {};
}

function validateTemplate(
  template,
  manifestPath,
) {
  if (
    typeof template !== 'object' ||
    template === null ||
    Array.isArray(template)
  ) {
    throw new Error(
      `${manifestPath}: manifest root must be an object.`,
    );
  }

  if (template.schemaVersion !== 1) {
    throw new Error(
      `${manifestPath}: unsupported schemaVersion.`,
    );
  }

  const category = requireString(
    template.category,
    'category',
    manifestPath,
  );

  const price = requireString(
    template.price,
    'price',
    manifestPath,
  );

  if (!supportedCategories.has(category)) {
    throw new Error(
      `${manifestPath}: unsupported category "${category}".`,
    );
  }

  if (!supportedPrices.has(price)) {
    throw new Error(
      `${manifestPath}: unsupported price "${price}".`,
    );
  }

  if (
    typeof template.author !== 'object' ||
    template.author === null ||
    Array.isArray(template.author)
  ) {
    throw new Error(
      `${manifestPath}: "author" must be an object.`,
    );
  }

  const screenshots = optionalObject(
    template.screenshots,
  );

  return {
    id: requireString(
      template.id,
      'id',
      manifestPath,
    ),
    name: requireString(
      template.name,
      'name',
      manifestPath,
    ),
    description: requireString(
      template.description,
      'description',
      manifestPath,
    ),
    version: requireString(
      template.version,
      'version',
      manifestPath,
    ),
    category,
    price,
    license: requireString(
      template.license,
      'license',
      manifestPath,
    ),
    author: {
      name: requireString(
        template.author.name,
        'author.name',
        manifestPath,
      ),
      github: optionalString(
        template.author.github,
      ),
      website: optionalString(
        template.author.website,
      ),
    },
    repository: optionalString(
      template.repository,
    ),
    liveDemo: optionalString(
      template.liveDemo,
    ),
    preview: optionalString(
      template.preview,
    ),
    thumbnail: optionalString(
      template.thumbnail,
    ),
    screenshots: {
      desktop: optionalString(
        screenshots.desktop,
      ),
      tablet: optionalString(
        screenshots.tablet,
      ),
      mobile: optionalString(
        screenshots.mobile,
      ),
    },
    responsive:
      template.responsive === true,
    editorsChoice:
      template.editorsChoice === true,
    manifestPath,
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function safeExternalUrl(value) {
  if (!value) {
    return '';
  }

  try {
    const url = new URL(value);

    if (
      url.protocol !== 'https:' &&
      url.protocol !== 'http:'
    ) {
      return '';
    }

    return url.href;
  } catch {
    return '';
  }
}

function resolveTemplateFile(
  templateDirectory,
  relativePath,
  field,
) {
  if (!relativePath) {
    return '';
  }

  const resolved = path.resolve(
    templateDirectory,
    relativePath,
  );

  const relative = path.relative(
    templateDirectory,
    resolved,
  );

  if (
    relative.startsWith('..') ||
    path.isAbsolute(relative)
  ) {
    throw new Error(
      `${field} must remain inside the template directory.`,
    );
  }

  return resolved;
}

function templatePublicDirectory(
  manifestPath,
) {
  const templateDirectory = path.dirname(
    manifestPath,
  );

  const relativeDirectory = path.relative(
    projectRoot,
    templateDirectory,
  );

  return `/${relativeDirectory
    .split(path.sep)
    .map(encodeURIComponent)
    .join('/')}`;
}

function publicTemplateFile(
  publicDirectory,
  relativePath,
) {
  return `${publicDirectory}/${relativePath
    .split(/[\\/]/)
    .map(encodeURIComponent)
    .join('/')}`;
}

function buildCategoryStats(templates) {
  const stats = {
    total: templates.length,
    official: 0,
    community: 0,
    marketplace: 0,
    archive: 0,
    editorsChoice: 0,
  };

  for (const template of templates) {
    stats[template.category] += 1;

    if (template.editorsChoice) {
      stats.editorsChoice += 1;
    }
  }

  return stats;
}

function buildStat(
  label,
  count,
) {
  return `
    <span class="stat">
      ${escapeHtml(label)}
      <strong>${count}</strong>
    </span>
  `;
}

async function buildTemplateCard(template) {
  const templateDirectory = path.dirname(
    template.manifestPath,
  );

  const publicDirectory =
    templatePublicDirectory(
      template.manifestPath,
    );

  const detailUrl = `${publicDirectory}/`;

  const thumbnailPath = resolveTemplateFile(
    templateDirectory,
    template.thumbnail,
    'thumbnail',
  );

  const hasThumbnail =
    thumbnailPath !== '' &&
    await fileExists(thumbnailPath);

  const authorUrl =
    safeExternalUrl(
      template.author.website,
    ) ||
    safeExternalUrl(
      template.author.github,
    );

  const liveDemo = safeExternalUrl(
    template.liveDemo,
  );

  const repository = safeExternalUrl(
    template.repository,
  );

  const media = hasThumbnail
    ? `
      <a
        class="media-link"
        href="${escapeHtml(detailUrl)}"
        aria-label="Open ${escapeHtml(template.name)}"
      >
        <img
          class="card-image"
          src="${escapeHtml(
            publicTemplateFile(
              publicDirectory,
              template.thumbnail,
            ),
          )}"
          alt="${escapeHtml(
            `${template.name} template preview`,
          )}"
          loading="lazy"
          decoding="async"
        >
      </a>
    `
    : `
      <a
        class="card-placeholder"
        href="${escapeHtml(detailUrl)}"
        aria-label="Open ${escapeHtml(template.name)}"
      >
        <span class="placeholder-label">
          ${escapeHtml(template.category)}
        </span>

        <strong>
          ${escapeHtml(template.name)}
        </strong>

        <small>
          by ${escapeHtml(template.author.name)}
        </small>
      </a>
    `;

  const author = authorUrl
    ? `
      <a
        class="author-link"
        href="${escapeHtml(authorUrl)}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ${escapeHtml(template.author.name)}
      </a>
    `
    : escapeHtml(
        template.author.name,
      );

  const actions = [
    `
      <a
        class="button"
        href="${escapeHtml(detailUrl)}"
      >
        Details
      </a>
    `,
    liveDemo
      ? `
        <a
          class="button button-primary"
          href="${escapeHtml(liveDemo)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Live demo
        </a>
      `
      : '',
    repository
      ? `
        <a
          class="button"
          href="${escapeHtml(repository)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source
        </a>
      `
      : '',
  ].join('');

  return `
    <article class="card">
      ${media}

      <div class="card-content">
        <div class="badges">
          <span>${escapeHtml(template.category)}</span>
          <span>${escapeHtml(template.price)}</span>
          ${
            template.editorsChoice
              ? '<span>Editor&#039;s Choice</span>'
              : ''
          }
        </div>

        <h2>
          <a href="${escapeHtml(detailUrl)}">
            ${escapeHtml(template.name)}
          </a>
        </h2>

        <p class="author">
          by ${author}
        </p>

        <p class="description">
          ${escapeHtml(template.description)}
        </p>

        <div class="metadata">
          <span>v${escapeHtml(template.version)}</span>
          <span>${escapeHtml(template.license)}</span>
        </div>

        <div class="actions">
          ${actions}
        </div>
      </div>
    </article>
  `;
}

function buildDocument(
  cards,
  stats,
) {
  const visibleStats = [
    buildStat(
      'All',
      stats.total,
    ),
    buildStat(
      'Official',
      stats.official,
    ),
    buildStat(
      'Community',
      stats.community,
    ),
    buildStat(
      'Marketplace',
      stats.marketplace,
    ),
    buildStat(
      "Editor's Choice",
      stats.editorsChoice,
    ),
  ].join('');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1"
    >

    <title>ItsOnePage Template Gallery</title>

    <meta
      name="description"
      content="Discover official, community and marketplace one-page website templates."
    >

    <meta
      name="robots"
      content="noindex, nofollow"
    >

    <meta
      name="theme-color"
      content="#07111c"
    >

    <style>
      :root {
        color-scheme: dark;
        font-family:
          Inter,
          ui-sans-serif,
          system-ui,
          -apple-system,
          BlinkMacSystemFont,
          "Segoe UI",
          sans-serif;
        background: #07111c;
        color: #f4f8fb;
      }

      * {
        box-sizing: border-box;
      }

      html {
        min-height: 100%;
        background: #07111c;
      }

      body {
        min-height: 100vh;
        margin: 0;
        background:
          radial-gradient(
            circle at top,
            #12344a,
            #07111c 46%
          );
      }

      main {
        width: min(
          1280px,
          calc(100% - 32px)
        );
        margin: 0 auto;
        padding: 26px 0 48px;
      }

      header {
        max-width: 760px;
        margin-bottom: 18px;
      }

      h1 {
        margin: 0 0 6px;
        font-size: 1.12rem;
        line-height: 1.25;
        letter-spacing: -0.01em;
      }

      header > p {
        margin: 0;
        color: #bdcad5;
        font-size: 0.9rem;
        line-height: 1.5;
      }

      .stats {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
        margin-top: 12px;
      }

      .stat {
        display: inline-flex;
        gap: 6px;
        align-items: center;
        padding: 6px 10px;
        border: 1px solid
          rgb(114 220 239 / 20%);
        border-radius: 999px;
        color: #a9bbc8;
        font-size: 0.78rem;
      }

      .stat strong {
        color: #72dcef;
      }

      .gallery {
        display: grid;
        grid-template-columns:
          repeat(
            auto-fill,
            minmax(220px, 1fr)
          );
        gap: 16px;
        align-items: start;
      }

      .card {
        overflow: hidden;
        border: 1px solid
          rgb(255 255 255 / 10%);
        border-radius: 16px;
        background:
          rgb(6 20 32 / 88%);
        box-shadow:
          0 18px 50px
          rgb(0 0 0 / 24%);
        transition:
          border-color 160ms ease,
          box-shadow 160ms ease;
      }

      .card:hover {
        border-color:
          rgb(114 220 239 / 30%);
        box-shadow:
          0 20px 55px
          rgb(0 0 0 / 30%);
      }

      .media-link,
      .card-placeholder {
        display: block;
        width: 100%;
        aspect-ratio: 16 / 10;
        overflow: hidden;
        color: inherit;
        text-decoration: none;
      }

      .card-image {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition:
          transform 220ms ease;
      }

      .card:hover .card-image {
        transform: scale(1.025);
      }

      .card-placeholder {
        display: grid;
        place-content: center;
        gap: 8px;
        padding: 22px;
        background:
          linear-gradient(
            135deg,
            #15394e,
            #091723
          );
        text-align: center;
      }

      .card-placeholder strong {
        font-size: 1.4rem;
      }

      .card-placeholder small,
      .placeholder-label {
        color: #9fb2c0;
      }

      .placeholder-label {
        font-size: 0.66rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .card-content {
        padding: 15px;
      }

      .badges {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin-bottom: 11px;
      }

      .badges span {
        padding: 4px 6px;
        border: 1px solid
          rgb(114 220 239 / 28%);
        border-radius: 999px;
        color: #72dcef;
        font-size: 0.59rem;
        font-weight: 700;
        text-transform: uppercase;
      }

      h2 {
        margin: 0;
        font-size: 1.12rem;
        line-height: 1.25;
      }

      h2 a {
        color: #f4f8fb;
        text-decoration: none;
      }

      h2 a:hover {
        color: #72dcef;
      }

      .author {
        margin: 5px 0 11px;
        color: #8295a4;
        font-size: 0.8rem;
      }

      .author-link {
        color: #72dcef;
      }

      .description {
        display: -webkit-box;
        min-height: 4.35em;
        margin: 0 0 13px;
        overflow: hidden;
        color: #bdcad5;
        font-size: 0.84rem;
        line-height: 1.45;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }

      .metadata {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 14px;
        color: #8295a4;
        font-size: 0.72rem;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }

      .button {
        display: inline-flex;
        min-height: 35px;
        align-items: center;
        justify-content: center;
        padding: 0 11px;
        border: 1px solid
          rgb(255 255 255 / 15%);
        border-radius: 999px;
        color: #f4f8fb;
        font-size: 0.76rem;
        font-weight: 700;
        text-decoration: none;
      }

      .button:hover {
        border-color: #72dcef;
      }

      .button-primary {
        border-color: #72dcef;
        background: #72dcef;
        color: #07111c;
      }

      .button:focus-visible,
      .media-link:focus-visible,
      h2 a:focus-visible {
        outline: 2px solid #72dcef;
        outline-offset: 3px;
      }

      @media (min-width: 1200px) {
        .gallery {
          grid-template-columns:
            repeat(5, minmax(0, 1fr));
        }
      }

      @media (
        min-width: 760px
      ) and (
        max-width: 1199px
      ) {
        .gallery {
          grid-template-columns:
            repeat(3, minmax(0, 1fr));
        }
      }

      @media (
        min-width: 480px
      ) and (
        max-width: 759px
      ) {
        .gallery {
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 479px) {
        main {
          width: min(
            100% - 20px,
            440px
          );
          padding: 22px 0 40px;
        }

        header {
          margin-bottom: 16px;
        }

        h1 {
          font-size: 1.12rem;
        }

        .gallery {
          grid-template-columns: 1fr;
        }

        .description {
          min-height: auto;
        }
      }

      @media (
        prefers-reduced-motion: reduce
      ) {
        .card,
        .card-image {
          transition: none;
        }

        .card:hover .card-image {
          transform: none;
        }
      }
    </style>
  </head>

  <body>
    <main>
      <header>
        <h1>Template Gallery</h1>

        <p>
          Discover one-page website templates created by
          ItsOnePage and its community.
        </p>

        <div
          class="stats"
          aria-label="Template statistics"
        >
          ${visibleStats}
        </div>
      </header>

      <section
        class="gallery"
        aria-label="Available templates"
      >
        ${cards.join('\n')}
      </section>
    </main>
  </body>
</html>
`;
}

async function main() {
  const manifestPaths =
    await findTemplateManifests(
      templatesRoot,
    );

  const templates = [];

  for (const manifestPath of manifestPaths) {
    const source = await readFile(
      manifestPath,
      'utf8',
    );

    let parsed;

    try {
      parsed = JSON.parse(source);
    } catch (error) {
      throw new Error(
        `${manifestPath}: invalid JSON: ${error.message}`,
      );
    }

    templates.push(
      validateTemplate(
        parsed,
        manifestPath,
      ),
    );
  }

  const ids = new Set();

  for (const template of templates) {
    if (ids.has(template.id)) {
      throw new Error(
        `Duplicate template id: ${template.id}`,
      );
    }

    ids.add(template.id);
  }

  templates.sort(
    (left, right) => {
      if (
        left.editorsChoice !==
        right.editorsChoice
      ) {
        return left.editorsChoice
          ? -1
          : 1;
      }

      return left.name.localeCompare(
        right.name,
      );
    },
  );

  const cards = [];

  for (const template of templates) {
    cards.push(
      await buildTemplateCard(template),
    );
  }

  const stats = buildCategoryStats(
    templates,
  );

  await mkdir(
    outputDirectory,
    {
      recursive: true,
    },
  );

  await writeFile(
    outputFile,
    buildDocument(
      cards,
      stats,
    ),
    'utf8',
  );

  console.log(
    `Generated ${path.relative(
      projectRoot,
      outputFile,
    )} from ${templates.length} template manifest(s).`,
  );
}

main().catch(
  (error) => {
    console.error(error.message);
    process.exitCode = 1;
  },
);
