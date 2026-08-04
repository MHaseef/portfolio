import React from 'react';

export interface BlogItem {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readTime?: string;
}

interface BlogsPreviewProps {
  posts: BlogItem[];
}

export const BlogsPreview: React.FC<BlogsPreviewProps> = ({ posts }) => {
  return (
    <section
      id="blogs"
      style={{
        background: '#F7F6F3',
        padding: '48px 32px',
        borderTop: '1px solid #E6E4DF',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '2px',
            color: '#1B6FA8',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          Technical Blog
        </div>
        <h2
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 36px)',
            margin: '0 0 24px',
            color: '#16181C',
          }}
        >
          Field notes
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
          }}
        >
          {posts.map(post => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E6E4DF',
                borderRadius: '8px',
                padding: '20px',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: '0 1px 2px rgba(16,24,32,0.03), 0 8px 20px rgba(16,24,32,0.04)',
                transition: 'border-color 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    color: '#1B6FA8',
                    background: '#E3F1FB',
                    padding: '3px 8px',
                    borderRadius: '12px',
                  }}
                >
                  {post.category}
                </span>
                <span style={{ fontSize: '11px', color: '#8A8F94' }}>{post.date}</span>
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: 1.35,
                  color: '#16181C',
                }}
              >
                {post.title}
              </div>
              <div style={{ color: '#5C6167', fontSize: '13px', lineHeight: 1.5, flex: 1 }}>
                {post.excerpt}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
