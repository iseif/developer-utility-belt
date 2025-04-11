import mimeDb from 'mime-db';

export interface MimeTypeEntry {
  extension: string;
  mimeType: string;
  description?: string;
}

// Process the mime-db data to create our format
const processMimeDb = (): MimeTypeEntry[] => {
  const entries: MimeTypeEntry[] = [];
  const extensionMap: Record<string, string[]> = {};

  // First, build a map of extensions to MIME types
  Object.entries(mimeDb).forEach(([mimeType, data]) => {
    if (data.extensions && data.extensions.length > 0) {
      data.extensions.forEach((ext) => {
        if (!extensionMap[ext]) {
          extensionMap[ext] = [];
        }
        extensionMap[ext].push(mimeType);
      });
    }
  });

  // Then, create entries for each extension
  Object.entries(extensionMap).forEach(([ext, mimeTypes]) => {
    // Use the first MIME type for this extension (most common)
    const primaryMimeType = mimeTypes[0];

    entries.push({
      extension: `.${ext}`,
      mimeType: primaryMimeType,
      description: getDescriptionForMimeType(primaryMimeType, ext),
    });
  });

  // Sort entries by extension
  return entries.sort((a, b) => a.extension.localeCompare(b.extension));
};

// Helper function to generate human-readable descriptions
const getDescriptionForMimeType = (mimeType: string, ext: string): string => {
  const [type, subtype] = mimeType.split('/');

  // Common descriptions for well-known types
  const descriptions: Record<string, string> = {
    // Documents
    'text/html': 'HTML document',
    'text/css': 'Cascading Style Sheet',
    'text/plain': 'Plain text document',
    'application/pdf': 'Adobe Portable Document Format',
    'application/msword': 'Microsoft Word document',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      'Microsoft Word document (OOXML)',
    'application/vnd.ms-excel': 'Microsoft Excel spreadsheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      'Microsoft Excel spreadsheet (OOXML)',
    'application/vnd.ms-powerpoint': 'Microsoft PowerPoint presentation',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      'Microsoft PowerPoint presentation (OOXML)',
    'text/csv': 'Comma-separated values file',
    'text/markdown': 'Markdown document',

    // Code formats
    'application/javascript': 'JavaScript code',
    'application/json': 'JSON data',
    'application/typescript': 'TypeScript code',
    'text/x-python': 'Python script',
    'text/x-java-source': 'Java source code',
    'application/x-httpd-php': 'PHP script',

    // Images
    'image/jpeg': 'JPEG image',
    'image/png': 'PNG image',
    'image/gif': 'GIF image',
    'image/webp': 'WebP image',
    'image/svg+xml': 'SVG image',

    // Audio
    'audio/mpeg': 'MP3 audio',
    'audio/wav': 'WAV audio',
    'audio/ogg': 'OGG audio',

    // Video
    'video/mp4': 'MP4 video',
    'video/webm': 'WebM video',
    'video/quicktime': 'QuickTime video',

    // Archives
    'application/zip': 'ZIP archive',
    'application/gzip': 'Gzip compressed file',

    // Fonts
    'font/ttf': 'TrueType font',
    'font/otf': 'OpenType font',
    'font/woff': 'Web Open Font Format',
    'font/woff2': 'Web Open Font Format 2',
  };

  // Return known description or generate one
  if (descriptions[mimeType]) {
    return descriptions[mimeType];
  }

  // Generate a description based on the type/subtype
  if (type === 'application') {
    return `${capitalizeFirstLetter(subtype.replace(/^x-/, ''))} file`;
  } else if (type === 'text') {
    return `${capitalizeFirstLetter(subtype.replace(/^x-/, ''))} text`;
  } else if (type === 'image') {
    return `${subtype.toUpperCase()} image`;
  } else if (type === 'audio') {
    return `${subtype.toUpperCase()} audio`;
  } else if (type === 'video') {
    return `${subtype.toUpperCase()} video`;
  } else if (type === 'font') {
    return `${subtype.toUpperCase()} font`;
  }

  // Fallback
  return `${capitalizeFirstLetter(ext)} file`;
};

// Helper function to capitalize first letter
const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Generate the MIME types data from mime-db
export const mimeTypesData: MimeTypeEntry[] = processMimeDb();

// Helper function to search MIME types by extension or MIME type
export const searchMimeTypes = (query: string): MimeTypeEntry[] => {
  if (!query) return [];

  const normalizedQuery = query.toLowerCase().trim();

  return mimeTypesData.filter((entry) => {
    const extensionMatch = entry.extension
      .toLowerCase()
      .includes(normalizedQuery);
    const mimeTypeMatch = entry.mimeType
      .toLowerCase()
      .includes(normalizedQuery);
    const descriptionMatch =
      entry.description?.toLowerCase().includes(normalizedQuery) || false;

    return extensionMatch || mimeTypeMatch || descriptionMatch;
  });
};
